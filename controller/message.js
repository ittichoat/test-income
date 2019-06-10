async function add(id, baht, text) {
    date = new Date().toISOString().slice(0, 10).toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })
    if (id && baht && text) {
        console.log(date)
        let result = await database.message.create({
            uid: id,
            date: date,
            baht: baht,
            text: text
        })
    } else {
        
    }
}
module.exports.add = add;

