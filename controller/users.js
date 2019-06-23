async function create(id) {
  //let body = ctx.request.body
  if (id) {
    let userid = await database.users.findOne({
      id: id
    })
    if (!userid) {
      await database.users.create({
        id: id,
      })
      console.log('OK')
    } else {
      console.log('error')
    }
  } else {
    console.log('error')
  }
}
async function remove(id) {
  if (id) {
    let _id = await database.users.findOne({
      id: id
    })
    if (_id && mongoose.Types.ObjectId.isValid(_id)) {
      await database.users.deleteOne({
        _id: _id
      })
      console.log('OK')
    } else {
      console.log('error')
    }
  } else {
    console.log('error')
  }
}

module.exports = {
  create,
  remove
}
