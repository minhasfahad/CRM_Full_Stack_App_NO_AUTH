import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        // Use the environment variable, or fallback to local if not found
        const conn = await mongoose.connect("mongodb+srv://fahad_admin:fahad%40admin12345@cluster0.fpnw4kv.mongodb.net/CRM?appName=Cluster0", {});

        console.log("Successfully Connected with MongoDB Atlas!");
        console.log(`Database name: ${conn.connection.name}`);
        console.log(`Host: ${conn.connection.host}`);

    } catch (error) {
        console.error(`Error Connecting with DB: ${error.message}`);
        process.exit(1);
    }
};

export default ConnectDB;