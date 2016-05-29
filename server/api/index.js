import express from 'express'
import reduceUsers from '../../client/utils/reduceUsers'
import testUsers from '../../models/mannynotfound-friends'
import * as twitterApi from './twitter'

const router = new express.Router()
let lists = []

router.get('/addToList/:options', (req, res) => {
  const {users, list} = JSON.parse(req.params.options)
  twitterApi.addToList(users, list, (resp) => res.send(resp).end())
})

router.get('/getDB', (req, res) => {
  const newUsers = reduceUsers(testUsers)

  if (!lists.length) {
    twitterApi.getLists((allLists) => {
      lists = allLists

      res.send({
        lists,
        newUsers,
      }).end()
    })
  } else {
    res.send({
      lists,
      newUsers,
    }).end()
  }
})

export default router
