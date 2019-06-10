module.exports =  (router) => {
  router.get('/welcome', async function (ctx, next) {
    ctx.state = {
      title: 'koa2 title'
    };

    await ctx.render('welcome', {title: ctx.state});
  }),
  router.post('/api/message/add1', controller_message.add1)
  router.post('/api/message/add2', controller_message.add2)
}
