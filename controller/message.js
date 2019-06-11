async function get(ctx, next) {
    let body = ctx.request.body
    if (body.id) {
        let result = await database.users.findOne({ id: body.id })
        let resultmess = await database.message.find({ uid: result._id }, { _id: 0 }).select('date').sort({ date: 1 })
        let array = []
        let show = ''
        for (x in resultmess) {
            array[x] = resultmess[x].date.toISOString().slice(0, 10)
        }
        let unique = [...new Set(array)]
        let sum = 0, sumdate = 0
        for (let x in unique) {
            let bahtmess = await database.message.find({ date: unique[x] })
            for (let y in bahtmess) {
                sumdate += bahtmess[y].baht
                sum += bahtmess[y].baht
            }
            show += unique[x] + " = " + sumdate + "\n"
            sumdate = 0
        }
        show += "เงินรวมทั้งหมด = " + sum
        console.log(show)
        ctx.body = {
            code: 200
        }
    }
    else {
        ctx.body = {
            code: 500
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

