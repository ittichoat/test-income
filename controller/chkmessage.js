var myModule = require('./message');

function chkdate(pastdate) {
    date = new Date().toISOString().slice(0, 10).toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })
    year = pastdate.slice(0, 4);
    month = pastdate.slice(5, 7);
    day = pastdate.slice(8, 10);
    if (date < pastdate) {
        return false;
    }
    else if (parseInt(year) < 1900 || parseInt(month) > 12 || day == '00' || month == '00') {
        return false;
    }
    else if ((parseInt(month) == 4 || parseInt(month) == 6 || parseInt(month) == 9 || parseInt(month) == 11) && parseInt(day) > 30) {
        return false;
    }
    else if ((parseInt(month) == 1 || parseInt(month) == 3 || parseInt(month) == 5 || parseInt(month) == 6 || parseInt(month) == 7 || parseInt(month) == 8 || parseInt(month) == 10 || parseInt(month) == 12)
        && parseInt(day) > 31) {
        return false;
    }
    else if (parseInt(day) == 29 && parseInt(month) == 2) {
        if (parseInt(year) % 4 == 0 && parseInt(year) % 100 == 0) {
            if (parseInt(year) % 400 == 0) {
                return false;
            }
            return false;
        }
    }
    return true;
}
function chk(message) {
    if (message[0] == '-' || message[0] == '+' && message.match(/#/g) != null) {//เงิน#หมายเหตุ
        if ((message.match(/#/g)).length == 1) {//จำนวน #
            var n = message.search(/#/i);//ตำแหน่ง #
            var slicemes = message.slice(1, parseInt(n))//ตัดข้อมความ
            var numbers = /^[0-9]+$/
            if (numbers.test(slicemes)) {//ตรวจสอบว่าใช่ตัวเลขหรือไม่
                console.log(message.slice(n + 1))
                console.log(slicemes)
                myModule.add("U2601a823f94494a66edaba4a08aa08d9",slicemes,message.slice(n + 1))
            }
            else {
                console.log('error')
            }
        }
        else {
            console.log('error')
        }
    }
    else if (message[10] == '#') {//วันที่#เงิน#หมายเหตุ
        if ((message.match(/#/g)).length == 2) {
            if (chkdate(message.slice(0, 10))) {
                messagenotdate = message.slice(11, message.length)
                if (messagenotdate[0] == '-' || messagenotdate[0] == '+') {//เงิน#หมายเหตุ
                    var n = messagenotdate.search(/#/i);//ตำแหน่ง #
                    var slicemes = messagenotdate.slice(1, parseInt(n))//ตัดข้อมความ
                    var numbers = /^[0-9]+$/
                    if (numbers.test(slicemes)) {//ตรวจสอบว่าใช่ตัวเลขหรือไม่
                        console.log(message.slice(0, 10))
                        console.log(messagenotdate.slice(n + 1))
                        console.log(slicemes)
                    }
                    else {
                        console.log('error')
                    }
                }
            }
        }
        else {
            console.log('error')
        }
    }
    else if (message.search("delete") == 0) {
        if (message == "delete all") {
            console.log(message)
        }
        else if (chkdate(message.slice(7, 17)) && message.match(/#/g) != null) {
            if ((message.match(/#/g)).length == 2) {
                messagenotdate = message.slice(18, message.length)
                if (messagenotdate[0] == '-' || messagenotdate[0] == '+') {//เงิน#หมายเหตุ
                    var n = messagenotdate.search(/#/i);//ตำแหน่ง #
                    var slicemes = messagenotdate.slice(1, parseInt(n))//ตัดข้อมความ
                    var numbers = /^[0-9]+$/
                    if (numbers.test(slicemes)) {//ตรวจสอบว่าใช่ตัวเลขหรือไม่
                        console.log(message.slice(7, 17))
                        console.log(messagenotdate.slice(n + 1))
                        console.log(slicemes)
                    }
                    else {
                        console.log('error')
                    }
                }
            }
            else {
                console.log('error')
            }

        }
        else if (chkdate(message.slice(7, 17))) {
            console.log(message.slice(7, 17))
        }
        else {
            console.log('error')
        }
    }
    else if(message.search("show") == 0){
        if(message == "show all"){
            console.log('OK')
        }
        else if(chkdate(message.slice(5, 15))){
            console.log(message.slice(5, 15))
        }
    }
}

chk("+500#sad")