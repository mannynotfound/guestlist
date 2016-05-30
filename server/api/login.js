import url from 'url'
import {OAuth} from 'oauth'
import querystring from 'querystring'
import Serializer from 'serializer'

const PORT = process.env.PORT || 3000
const PATH = process.env.callback_url || JSON.stringify('http://localhost')
const callback_url = `${JSON.parse(PATH)}:${PORT}/api/login-twitter`
const consumer_key = process.env.consumer_key
const consumer_secret = process.env.consumer_secret
const serializer = Serializer.createSecureSerializer(consumer_key, consumer_secret)
const baseURI = "https://api.twitter.com/1.1"
const cookieName = 'guestlist-twit'

export function getSess(cookie) {
  let sess = {}

  try {
    sess = serializer.parse(cookie)
  } catch(e) {
    console.log('ERROR SERIALIZING', e)
    return null
  }

  if (!sess.oauth_token_secret) {
    console.log('NO TOKEN SECRET')
    return null
  }

  return sess
}

export function parseSess(req) {
  let sess = {}

  try {
    sess = serializer.parse(req.cookies[cookieName])
  } catch(e) {
    console.error(e)
  } finally {
    return sess
  }
}

export function login() {
  let client = {
    version: '0.3.1'
  }

  const headers = {
    Accept: '*/*',
    Connection: 'close',
    'User-Agent': `${cookieName} ${client.version}`
  }

  const oAuth = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    consumer_key, consumer_secret, '1.0', callback_url,
    'HMAC-SHA1', null, headers
  )

  function requestCallback(cb) {
    return (err, data, response) => {
      if (err) return cb(err, data)
      let exception = null
      try {
        data = JSON.parse(data)
      } catch (e) {
        exception = e
      }
      cb(exception, response, data)
    }
  }

  function get(path, params, token, cb) {
    oAuth.get(
      baseURI + path + '?' + querystring.stringify(params),
      token.oauth_token,
      token.oauth_token_secret,
      requestCallback(cb)
    )
  }

  client.getAccessToken = (req, res, cb) => {
    const sess = parseSess(req)
    const qs = url.parse(req.url, true).query || {}
    const {oauth_token, oauth_verifier} = qs
    const {request_secret} = sess

    // check if we have session tokens (already went through log in flow once)
    if (sess.oauth_token && sess.oauth_token_secret) {
      return cb(null, {...sess})
    }

    // agreed to oauth but not saved to session
    else if (oauth_verifier && oauth_token && request_secret) {
      oAuth.getOAuthAccessToken(
        oauth_token,
        request_secret,
        oauth_verifier,
        (error, token, token_secret) => {
          if (error) return cb(error, null)
          get('/account/verify_credentials.json', {}, {oauth_token: token, oauth_token_secret: token_secret}, (err, resp, json) => {
            const finalCookie = {
              oauth_token: token,
              oauth_token_secret: token_secret,
              ...json
            }

            res.cookie(cookieName, serializer.stringify(finalCookie), {
              path: '/',
              httpOnly: false
            })

            cb(null, finalCookie)
          })
        }
      )
    }

    // hasnt logged in at all
    else {
      oAuth.getOAuthRequestToken(
        { oauth_callback: callback_url },
        (error, token, token_secret) => {
          if (error) return cb(error, null)

          res.cookie(cookieName,
            serializer.stringify({
              request_secret: token_secret
            }), {
              path: '/',
              httpOnly: false
            }
          )

          res.redirect('https://api.twitter.com/oauth/authorize?oauth_token=' + token)
      })
    }
  }

  return client
}
