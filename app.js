const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const request = require('request')
//connect db
mongoose = require('mongoose')
const uri = "mongodb://165.22.50.217:27015/test-income"
mongoose.Promise = global.Promise
db = mongoose.createConnection(uri, {
  useNewUrlParser: true
})

database = require('./models/database')

reply = function (reply_token, id, msg) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {d3Vir0Hz1Ox7ScvwGlwS41fGjGf2PFcbvNhbK09deE5uuqW+0HVNkxg5KfcIvEU/cWW3uS5zY5wPuWzYmO8cYzQ9S4REu6N0ZnCUQ9+pW0KBh6uiNwk1XfizQFa3fJr01krMCPPPXLqe/vDTqwejuAdB04t89/1O/w1cDnyilFU=}'
  }
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [{
      type: 'text',
      text: controller_chkmessage.chk(id, msg)
    }]
  })
  console.log("reply OK!!")
  request.post({
    url: 'https://api.line.me/v2/bot/message/reply',
    headers: headers,
    body: body
  }, (err, res, body) => {
    console.log('status = ' + res.statusCode);
  });
}

controller_users = require('./controller/users')
controller_message = require('./controller/message')
controller_show = require('./controller/show')
controller_chkmessage = require('./controller/chkmessage')

const config = require('./config')
const index = require('./routes/index')
const users = require('./routes/users')

let port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Start port ${port}`)
});

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
