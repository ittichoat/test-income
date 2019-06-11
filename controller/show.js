async function showall(ctx, next) {
    let body = ctx.request.body
    if (body.id) {
        let result = await database.users.findOne({ id: body.id })
        let resultmess = await database.message.find({ uid: result._id }, { _id: 0 }).select('date').sort({ date: 1 })
        let array = []
        let show = "วันที่มีการบันทึก \n"
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
            show += unique[x] + " = " + sumdate + ".-\n"
            sumdate = 0
        }
        show += "เงินรวมทั้งหมด = " + sum + ".-"
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
async function showdate(ctx, next){
    let body = ctx.request.body
    if(body.id && body.date){
        let result = await database.users.findOne({ id: body.id })
        let resultmess = await database.message.find({ uid: result._id ,date : body.date}, { _id: 0 }).select('date').sort({ date: 1 })
        console.log(resultmess)
    }
}

module.exports.showall = showall
module.exports.showdate = showdate