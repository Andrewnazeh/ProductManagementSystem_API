const fs = require('fs');

const { v2: cloudinary } = require('cloudinary');

require('dotenv').config();

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadImage(imageName) {
    try {

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


const deleteImage = async (imageName) => {
    try {
        imageName = imageName.split('/');
        imageName = imageName[imageName.length - 3] + '/' + imageName[imageName.length - 2] + '/' + imageName[imageName.length - 1];
        console.log(imageName);
        const result = await cloudinary.uploader.destroy(imageName);
        console.log('Deletion result:', result);
        return result;
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};

module.exports = { uploadImage, deleteImage };

