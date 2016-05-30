import express from 'express'
import multer from 'multer'
import {readFile} from 'fs'
import * as twitterApi from './twitter'

const upload = multer({dest: './uploads/'})
const type = upload.single('jsonfile')
const router = new express.Router()
let lists = []

function parseBody(req, cb) {
  let body = ''

  req.on('data', (data) => {
    body += data

    if (body.length > 1e6) {
      console.log('TOO MUCH POST DATA')
      req.connection.destroy()
    }
  })

  req.on('end', () => {
    cb(body)
  })
}

router.post('/addToList/:options', (req, res) => {
  const {users, list} = JSON.parse(req.params.options)
  parseBody(req, (cookie) => {
    twitterApi.addToList(cookie, {users, list}, (err, resp) => (
      res.status(err ? 500 : 200).send(err || resp).end()
    ))
  })
})

router.post('/createList/:options', (req, res) => {
  const options = JSON.parse(req.params.options)
  parseBody(req, (cookie) => {
    twitterApi.createList(cookie, options, (err, resp) => (
      res.status(err ? 500 : 200).send(err || resp).end()
    ))
  })
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

router.get('/login-twitter', (req, res) => {
  twitterApi.oAuth.getAccessToken(req, res, (error, newToken) => {
    if (newToken) {
      res.redirect('/')
    } else {
      res.send(JSON.stringify(error)).end()
    }
  })
})

router.post('/getUsers/:options', (req, res) => {
  const options = JSON.parse(req.params.options)
  parseBody(req, (cookie) => {
    twitterApi.getUsers(cookie, options, (err, resp) => {
      if (err) {
        return res.status(500).send({err, users: resp}).end()
      }

      return res.status(200).send({users: resp}).end()
    })
  })
})

router.post('/getDB', (req, res) => {
  parseBody(req, (cookie) => {
    if (!lists.length) {
      twitterApi.getLists(cookie, (allLists) => {
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
})

export default router
