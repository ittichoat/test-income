async function create(id) {
    if (id) {
        await database.users.create({
            id: id,
        })
        console.log('OK')
    }
    else {
        console.log('error')
    }
}
async function remove(id) {
    if (id) {
        let _id = await database.users.findOne(id)
        if (id && mongoose.Types.ObjectId.isValid(_id)) {
            await database.users.deleteOne({ _id: _id })
            console.log('OK')
        }
        else {
            console.log('error')
        }
    }
    else {
        console.log('error')
    }
}

module.exports.create = create
module.exports.remove = remove