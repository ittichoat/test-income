const router = require('koa-router')()


router.get('/', async (ctx, next) => {
  ctx.body = {
    code: 200
  }
})

router.post('/webhook', async(ctx,next) => {
 let body = ctx.request.body
  reply_token = JSON.stringify(body.events[0].replyToken)
  id = JSON.stringify(body.events[0].source.userId)
  msg = JSON.stringify(body.events[0].message.text)
  type = JSON.stringify(body.events[0].type)
  if(type.search("message") == 1){
    await Module_app.reply(reply_token.slice(1, reply_token.length-1), id.slice(1, id.length-1), msg.slice(1, msg.length-1))
  }
  else if(type.search("unfollow") == 1){
    await users.remove(id.slice(1, id.length-1))
  }
  else if(type.search("follow") == 1){
    await users.create(id.slice(1, id.length-1))
  }
  ctx.body = {
    code: 200
  }
})

router.get('/welcome', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  };

  await ctx.render('index', {
    title: ctx.state
  });
})
//message
router.post('/api/message/add1', controller_message.add1)
router.post('/api/message/add2', controller_message.add2)
router.post('/api/message/delall', controller_message.delall)
router.post('/api/message/deldate', controller_message.deldate)
router.post('/api/message/delsel', controller_message.delsel)

//users
router.post('/api/users/create', controller_users.create)
router.post('/api/users/remove', controller_users.remove)

//show
router.get('/api/show/showall', controller_show.showall)
router.get('/api/show/showdate', controller_show.showdate)


module.exports = router
