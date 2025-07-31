const moogoose = require("mongoose");
const connectDB = async () => {
try {
    const connect = await moogoose.connect(process.env.MONGO_URL);
    console.log(`mongoDB connected:${connect.connection.host}`.bgYellow);

} catch (error) {
    console.log(error)
    process.exit(1)
}
}

module.exports = connectDB