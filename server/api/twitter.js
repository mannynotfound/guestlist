import Twitter from 'twitter'
import config from './config'
import {map as asyncMap} from 'async'

const client = new Twitter(config.creds)

export function addToList(users, list, cb) {
  const opts = {
    slug: list,
    slug: list,
    owner_screen_name: config.username,
    user_id: users.join(',')
  }
  client.post('lists/members/create_all', opts, (err, resp) => {
    if (err) {
      console.log(err)
    } else {
      cb()
    }
  })
}

export function getLists(cb) {
  const opts = {
    screen_name: config.username,
    count: 1000,
  }

  client.get('lists/ownerships', opts, (err, resp) => {
    if (err) return console.log(err)

    const {lists} = resp

    asyncMap(lists, (list, callback) => {
      getListMembers(list, (members) => {
        callback(null, members)
      })
    }, (err, results) => {
      if (err) return console.log(err)

      const finalLists = lists.map((l, i) => {
        const newList = {...l}
        newList.members = results[i]

        return newList
      })

      cb(finalLists)
    })
  })
}

export function getListMembers(list, cb) {
  const opts = {
    slug: list.slug,
    owner_screen_name: config.username,
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
