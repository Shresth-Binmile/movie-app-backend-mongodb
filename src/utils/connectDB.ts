import mongoose from "mongoose";
import { ENV } from "../configs/server-config";

async function main() {
    await mongoose.connect(ENV.MONGO_URI);
}

export default main