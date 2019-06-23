const router = require('koa-router')()

router.get('/', async (ctx, next) => {
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
