import Twitter from 'twitter'
import {map as asyncMap} from 'async'
import GetFriends from './get-friends'
import {getSess, login} from './login'

const createClient = (cookie) => {
  const sess = getSess(cookie)
  if (!sess) return {client: null, sess: null}

  return {
    client: new Twitter({
      consumer_key: process.env.consumer_key,
      consumer_secret: process.env.consumer_secret,
      access_token_key: sess.oauth_token,
      access_token_secret: sess.oauth_token_secret,
    }),
    sess,
  }
}

export const oAuth = login()

export function addToList(cookie, {users, list}, cb) {
  const {client, sess} = createClient(cookie)
  if (!client) return cb(new Error('no token'))

  const opts = {
    slug: list,
    owner_screen_name: sess.screen_name,
    user_id: users.join(',')
  }

  client.post('lists/members/create_all', opts, cb)
}

export function createList(cookie, {list, desc}, cb) {
  const {client} = createClient(cookie)
  if (!client) return cb(new Error('no token'))

  const opts = {
    name: list,
    description: desc,
    mode: 'private',
  }

  client.post('lists/create', opts, cb)
}

export function getLists(cookie, cb) {
  const {client, sess} = createClient(cookie)
  if (!client || !sess) return cb([])

  const opts = {
    screen_name: sess.screen_name,
    count: 1000,
  }

  client.get('lists/ownerships', opts, (err, resp) => {
    if (err) return cb([])

    const {lists} = resp

    asyncMap(lists, (list, callback) => {
      getListMembers(list, {client, sess}, (members) => {
        callback(null, members)
      })
    }, (err, results) => {
      if (err) return cb([])

      const finalLists = lists.map((l, i) => {
        const newList = {...l}
        newList.members = results[i]

        return newList
      })

      cb(finalLists)
    })
  })
}

export function getListMembers(list, {client, sess}, cb) {
  const opts = {
    slug: list.slug,
    owner_screen_name: sess.screen_name,
    count: 5000,
  }

  client.get('lists/members', opts, (err, resp) => {
    if (err) {
      console.log(err)
    } else {
      cb(resp.users)
    }
  })
}

export function getUsers(cookie, options, cb) {
  const {client} = createClient(req)
  if (!client) return cb(new Error('no token'))

  if (options.type === 'friends') {
    new GetFriends(client, options.target, cb)
  }
}
