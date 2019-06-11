var Module_show = require('./show');
async function add1(id, baht, text) {
    if (id && baht && text) {
        console.log(id + '\n' + baht + '\n' + text)
        date = new Date().toISOString().slice(0, 10).toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })
        let userid = await database.users.findOne({ id: id })
        if (userid._id && mongoose.Types.ObjectId.isValid(userid._id)) {
            await database.message.create({
                uid: userid._id,
                date: date,
                baht: baht,
                text: text
            })
        }
        Module_show.showdate(id, date)
        console.log('OK')
    }
    else {
        console.log('error')
    }
}
async function add2(id, baht, text, date) {
    if (id && baht && text && date) {
        console.log(id + '\n' + baht + '\n' + text + '\n' + date)
        let userid = await database.users.findOne({ id: id })
        if (userid._id && mongoose.Types.ObjectId.isValid(userid._id)) {
            await database.message.create({
                uid: userid._id,
                date: date,
                baht: baht,
                text: text
            })
            Module_show.showdate(id, date)
            console.log('OK')
        }
    }
    else {
        console.log('error')
    }
}
async function delall(id) {
    if (id) {
        console.log(id)
        let userid = await database.users.findOne({ id: id })
        if (userid._id && mongoose.Types.ObjectId.isValid(userid._id)) {
            await database.message.deleteMany({ uid: userid._id })
            console.log('OK')
        }
    } else {
        console.log('error')
    }
}
async function deldate(id, date) {
    if (id && date) {
        console.log(id + '\n' + date)
        let userid = await database.users.findOne({ id: id })
        if (userid._id && mongoose.Types.ObjectId.isValid(userid._id)) {
            await database.message.deleteMany({ uid: userid._id, date: date })
            console.log('OK')
        }
    } else {
        console.log('error')
    }
}
async function delsel(id, baht, text, date) {
    if (id && date && baht && text) {
        console.log(id + '\n' + baht + '\n' + text)
        let userid = await database.users.findOne({ id: id })
        if (userid._id && mongoose.Types.ObjectId.isValid(userid._id)) {
            await database.message.deleteOne({ uid: userid._id, date: date, baht: baht, text: text })
            console.log('OK')
        }
    } else {
        console.log('error')
    }
}

module.exports.add1 = add1
module.exports.add2 = add2
module.exports.delall = delall
module.exports.deldate = deldate
module.exports.delsel = delsel

