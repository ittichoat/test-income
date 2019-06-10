async function create(ctx, next) {
    let body = ctx.request.body
    if (body.id) {
        let result = await database.users.create({
            id: body.id,
        })
        ctx.body = {
            code: 200,
            data: result
        }
    }
    else {
        ctx.body = {
            code: 500,
        }
    }
}
async function remove(ctx, next) {
    let body = ctx.request.body
    if (body._id && mongoose.Types.ObjectId.isValid(body._id)) {
        let result = await database.score.deleteOne({ _id: body._id })
        ctx.body = {
            code: 200
        }
    } else {
        ctx.body = {
            code: 500
        }
    }
}

module.exports.create = create;
module.exports.remove = remove;