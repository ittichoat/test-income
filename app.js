const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')
//connect db
mongoose = require('mongoose')
const uri = "mongodb://209.126.98.143:27017/test_income"
mongoose.Promise = global.Promise
db = mongoose.createConnection(uri, {
  useNewUrlParser: true
})

database = require('./models/database')

controller_users = require('./controller/users')
controller_message = require('./controller/message')
controller_show = require('./controller/show')
controller_chkmessage = require('./controller/chkmessage')

const config = require('./config')
const routes = require('./routes')

const port = process.env.PORT || config.port

// error handler
onerror(app)

// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: { settings: { views: path.join(__dirname, 'views') } },
    map: { 'ejs': 'ejs' },
    extension: 'ejs'
  }))
  .use(router.routes())
  .use(router.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})

router.get('/', async (ctx, next) => {
  // ctx.body = 'Hello World'
  ctx.state = {
    title: 'Koa2'
  }
  await ctx.render('index', ctx.state)
})

routes(router)
app.on('error', function (err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://209.126.98.143:${config.port}`)
})

// Reply with two static messages

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
//const app = express()
//const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
  let reply_token = req.body.events[0].replyToken
  let reply_id = req.body.events[0].source.userId
  let msg = req.body.events[0].message.text
  reply(reply_token, reply_id, msg)
  res.sendStatus(200)
})
app.listen(port)
function reply(reply_token, reply_id, msg) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {N6EXUggiLoQOVtrsE86Xl30F3NBmxmmOC//NsuzdKZKrqmwjVHBEJkIcoArZKpTKcWW3uS5zY5wPuWzYmO8cYzQ9S4REu6N0ZnCUQ9+pW0LDd0cY6GVuLljk4Sb7Ohc9pEyM6KI3aAjvc38ZWMP/ZgdB04t89/1O/w1cDnyilFU=}'
  }
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [{
      type: 'text',
      text: controller_chkmessage.chk(reply_id, msg)
    }]
  })
  request.post({
    url: 'https://api.line.me/v2/bot/message/reply',
    headers: headers,
    body: body
  }, (err, res, body) => {
    console.log('status = ' + res.statusCode);
  });
}
