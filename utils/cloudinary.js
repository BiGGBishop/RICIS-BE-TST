const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadSingleFile(media) {
    try{
        if (media){
            const uploadedResponse = await cloudinary.uploader.upload(media, {
                public_id: "ricis",
                resource_type: 'auto',
                timeout: 600000,
                chunk_size: 6000000
            },);
            media = uploadedResponse.secure_url;
            return media
        }else{
            throw new Error('No media provided');
        }
    }catch(error){
       
        console.error("Cloudinary upload error:", error);
        throw error;
    }
        
    
}

async function uploadMultiple(files) {
    if (!files || files.length === 0) {
        return [];
    }
    const uploadPromises = files.map(file => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(file, { resource_type: 'auto' }, (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            });
        });
    });
    return Promise.all(uploadPromises);
}

module.exports = { uploadMultiple,uploadSingleFile };