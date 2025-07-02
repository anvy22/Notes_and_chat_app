import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CloudinaryUpload = async (uploadFile)=>{
try {
    if(!uploadFile) return null;

    // logic for multer file Upload
    const respose = await cloudinary.uploader.upload(uploadFile,{resource_type:"auto"});
    console.log("File Uploded Success !! :",respose.url);

    return respose;
    
} catch (error) {
    //logic for unlinc the file
    fs.unlinkSync(uploadFile);
    console.log(error.message);
}
}

export {CloudinaryUpload}