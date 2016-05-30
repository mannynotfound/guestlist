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
  twitterApi.addToList(users, list, (err, resp) => (
    res.status(err ? 500 : 200).send(err || resp).end()
  ))
})

router.get('/createList/:options', (req, res) => {
  const options = JSON.parse(req.params.options)
  twitterApi.createList(options, (err, resp) => (
    res.status(err ? 500 : 200).send(err || resp).end()
  ))
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

// experimental not working yet
router.get('/download/:type/:data', (req, res) => {
  const data = JSON.parse(req.params.data)
  const filepath = `./uploads/${new Date().getTime()}.json`
  require('fs').writeFile(filepath, data, 'utf8', (err) => {
    if (err) {
      return res.status(500),send(new Error('couldnt make file'))
    }

    return res.download(filepath)
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
