import express from 'express'
import multer from 'multer'
import {readFile} from 'fs'
import * as twitterApi from './twitter'

const upload = multer({dest: './uploads/'})
const type = upload.single('jsonfile')
const router = new express.Router()
let lists = []

router.get('/addToList/:options', (req, res) => {
  const {users, list} = JSON.parse(req.params.options)
  twitterApi.addToList(users, list, (resp) => res.send(resp).end())
})

router.post('/uploadJSON/', type, (req, res) => {
  readFile(req.file.path, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send(err).end()
    } else {
      res.status(200).send({users: JSON.parse(data)}).end()
    }
  })
})

router.get('/getUsers/:options', (req, res) => {
  const options = JSON.parse(req.params.options)
  twitterApi.getUsers(options, (err, resp) => {
    if (err) {
      return res.status(500).send({err, users: resp}).end()
    }

    return res.status(200).send({users: resp}).end()
  })
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
