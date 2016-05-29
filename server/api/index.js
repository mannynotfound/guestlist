import express from 'express'
import reduceUsers from '../../client/utils/reduceUsers'
import * as twitterApi from './twitter'

const router = new express.Router()
let lists = []

router.get('/addToList/:options', (req, res) => {
  const {users, list} = JSON.parse(req.params.options)
  twitterApi.addToList(users, list, (resp) => res.send(resp).end())
})

router.get('/getUsers/:options', (req, res) => {
  const options = JSON.parse(req.params.options)
  twitterApi.getUsers(options, (resp) => res.send(resp).end())
})

router.get('/getDB', (req, res) => {

  if (!lists.length) {
    twitterApi.getLists((allLists) => {
      lists = allLists

      res.send({
        lists,
      }).end()
    })
  } else {
    res.send({
      lists,
    }).end()
  }
})

export default router
