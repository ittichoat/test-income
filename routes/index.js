module.exports =  (router) => {
  router.get('/welcome', async function (ctx, next) {
    ctx.state = {
      title: 'koa2 title'
    };

    await ctx.render('welcome', {title: ctx.state});
  }),
  //message
  router.post('/api/message/add1', controller_message.add1),
  router.post('/api/message/add2', controller_message.add2),

  //users
  router.post('/api/users/create', controller_users.create)
}
