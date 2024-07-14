import mongoose from "mongoose";

const Connection = async() =>{
    const URL = `mongodb+srv://testingdevprojects:Amruta@papersync.zgs0jfp.mongodb.net/paperSync?retryWrites=true&w=majority&appName=paperSync`

    try {
        await mongoose.connect(URL, {
            tls: true, // Enable TLS/SSL explicitly
            tlsAllowInvalidCertificates: true // Allow invalid certificates if using self-signed certificates (for development only)
          });
        console.log('db connected')
    }catch(error){
        console.log('error while connecting the db',error)
    }
}

export default Connection;