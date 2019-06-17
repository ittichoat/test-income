async function showall(id) {
    if (id) {
        console.log(id)
        let result = await database.users.findOne({ id: id })
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
    }
    else {
        console.log('error')
    }
}
async function showdate(id, date) {
    if (id && date) {
        console.log(id+" "+ date)
        let result = await database.users.findOne({ id: id })
        let resultmess = await database.message.find({ uid: result._id, date: date }, { _id: 0 }).select('date baht text').sort({ date: 1 })
        if (resultmess.length > 0) {
            let show = 'วันที่' + date.slice(0, 10) + '\n'
            let textincome = 'รายรับ\n'
            let textcost = 'รายจ่าย\n'
            let income = 0, cost = 0, sum = 0
            for (let x in resultmess) {
                if (resultmess[x].baht < 0) {
                    cost += resultmess[x].baht
                    textcost += resultmess[x].text + ' : ' + resultmess[x].baht + '.-\n'
                }
                else {
                    income += resultmess[x].baht
                    textincome += resultmess[x].text + ' : ' + resultmess[x].baht + '.-\n'
                }
                sum += resultmess[x].baht
            }
            show += textincome + 'เงินรวมรายรับทั้งหมด = ' + income + ' .- \n\n' + textcost + 'เงินรวมรายจ่ายทั้งหมด = ' + cost + ' .- \n\n' + 'เงินรวมทั้งหมดของวัน = ' + sum + '.-'
            console.log(show)
        }
        else {
            console.log('error')
        }
    }
    else {

    }
}
async function showhelp() {
    show = 'คำสั่งต่างๆที่ใช้ในการทำบัญชีรายรับรายจ่าย \n-------------------------------- \n' +
        'เงิน#หมายเหตุ = บันทึกประจำวัน เช่น -500#อาหาร \n\n' +
        'วันที่#เงิน#หมายเหตุ = บันทึกย้อนหลัง เช่น 2018-03-05#+500#งานอดิเรก \n\n' +
        'delete วันที่ = ลบข้อมูลทั้งหมดของวันที่กำหนด เช่น D0 2018-03-05 \n\n' +
        'delete วันที่#เงิน#หมายเหตุ = ลบข้อมูลตามที่กำหนด เช่น D1 2018-03-05#500#งานอดิเรก \n\n' +
        'delete all = ลบข้อมูลทั้งหมด \n\n' +
        'show all = แสดงวันที่มีบันทึกและเงินรวมทั้งหมด \n\n' +
        'show วันที่ = แสดงข้อมูลวันที่กำหนดไว้ S1 วันที่ เช่น S1 2018-03-05 \n\n' +
        'help = ช่วยเหลือ \n'
    console.log(show)
}

module.exports.showall = showall
module.exports.showdate = showdate
module.exports.showhelp = showhelp
