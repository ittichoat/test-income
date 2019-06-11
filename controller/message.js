async function get(ctx, next) {
    let body = ctx.request.body
    if (body.id) {
        let result = await database.users.findOne({ id: body.id })
        ctx.body = {
            code: 200,
            data: result._id
        }
    }
    else {
        ctx.body = {
            code: 500,
        }
    }
}
async function add1(ctx, next) {
    let body = ctx.request.body
    date = new Date().toISOString().slice(0, 10).toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })
    if (body.id && body.baht && body.text) {
        let userid = await database.users.findOne({ id: body.id })
        if (userid._id && mongoose.Types.ObjectId.isValid(userid._id)) {
            let result = await database.message.create({
                uid: userid._id,
                date: date,
                baht: body.baht,
                text: body.text
            })
            ctx.body = {
                code: 200,
                data: result
            }
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
    if (body.id && body.baht && body.text && body.date) {
        let userid = await database.users.findOne({ id: body.id })
        if (userid._id && mongoose.Types.ObjectId.isValid(userid._id)) {
            let result = await database.message.create({
                uid: userid._id,
                date: body.date,
                baht: body.baht,
                text: body.text
            })
            ctx.body = {
                code: 200,
                data: result
            }
        }
    }
    else {
        ctx.body = {
            code: 500,
        }
    }
}
async function delall(ctx, next) {
    let body = ctx.request.body
    if (body.id) {
        let userid = await database.users.findOne({ id: body.id })
        if (userid._id && mongoose.Types.ObjectId.isValid(userid._id)) {
            let result = await database.message.deleteMany({ uid: userid._id })
            ctx.body = {
                code: 200
            }
        }
    } else {
        ctx.body = {
            code: 500
        }
    }
}
async function deldate(ctx, next) {
    let body = ctx.request.body
    if (body.id && body.date) {
        let userid = await database.users.findOne({ id: body.id })
        if (userid._id && mongoose.Types.ObjectId.isValid(userid._id)) {
            let result = await database.message.deleteMany({ uid: userid._id, date: body.date })
            ctx.body = {
                code: 200
            }
        }
    } else {
        ctx.body = {
            code: 500
        }
    }
}
async function delsel(ctx, next) {
    let body = ctx.request.body
    if (body.id && body.date && body.baht && body.text) {
        let userid = await database.users.findOne({ id: body.id })
        if (userid._id && mongoose.Types.ObjectId.isValid(userid._id)) {
            let result = await database.message.deleteOne({ uid: userid._id, date: body.date, baht: body.baht, text: body.text })
            ctx.body = {
                code: 200
            }
        }
    } else {
        ctx.body = {
            code: 500
        }
    }
}

module.exports.get = get;
module.exports.add1 = add1;
module.exports.add2 = add2;
module.exports.delall = delall;
module.exports.deldate = deldate;
module.exports.delsel = delsel;

