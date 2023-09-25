const mongoose = require('mongoose')

const connectDB = async () => {
    const conn = await mongoose.connect('mongodb+srv://SJ:Sree123@cluster0.2pxi8fh.mongodb.net/Ecom?retryWrites=true&w=majority');
    console.log('MongoDB connected :' + conn.connection.host);
}

mongoose.set('strictQuery',true)

module.exports = connectDB