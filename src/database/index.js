/* eslint-disable no-console */
import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config({ silent: true });
const connectToDatabase = async () => {
    const con = await connect(process.env.URL_MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
        .then(() => console.log("Database is connected"))
        .catch(err => {
            console.error(err);
        });
    return con;
};

export default connectToDatabase;
