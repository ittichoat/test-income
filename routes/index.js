module.exports =  (router) => {
  router.get('/welcome', async function (ctx, next) {
    ctx.state = {
      title: 'koa2 title'
    };

    await ctx.render('welcome', {title: ctx.state});
  }),
  //message
  router.get('/api/message/get', controller_message.get),
  router.post('/api/message/add1', controller_message.add1),
  router.post('/api/message/add2', controller_message.add2),
  router.post('/api/message/delall', controller_message.delall),
  router.post('/api/message/deldate', controller_message.deldate),
  router.post('/api/message/delsel', controller_message.delsel),

  //users
  router.post('/api/users/create', controller_users.create),
  router.post('/api/users/remove', controller_users.remove)
}
