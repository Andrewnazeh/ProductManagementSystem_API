const fs = require('fs');

const { v2: cloudinary } = require('cloudinary');

require('dotenv').config();

async function uploadImage(imageName) {
try {
    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            imageName,
            {
                public_id: `${Date.now()} product`,
                folder: 'uploads/products',
            }
    )  
    fs.unlinkSync(imageName);


    return uploadResult;
} catch (error) {
    throw new Error(error.message);
}
    
};

module.exports = uploadImage;

