async function add1(ctx, next) {
    let body = ctx.request.body
    date = new Date().toISOString().slice(0, 10).toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })
    if ((body.users && mongoose.Types.ObjectId.isValid(body.users)) && body.baht && body.text) {
        let result = await database.message.create({
            uid: body.users,
            date: date,
            baht: body.baht,
            text: body.text
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
async function add2(ctx, next) {
    let body = ctx.request.body
    if ((body.users && mongoose.Types.ObjectId.isValid(body.users)) && body.baht && body.text && body.date) {
        console.log(date)
        let result = await database.message.create({
            uid: body.users,
            date: body.date,
            baht: body.baht,
            text: body.text
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

module.exports.add1 = add1;
module.exports.add2 = add2;

