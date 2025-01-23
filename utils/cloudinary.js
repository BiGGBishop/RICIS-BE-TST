const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadSingleFile(file) {
    console.log(file)
    try {
                const uploadedResponse = await cloudinary.uploader.upload(file, {
                    public_id: "ricis",
                    resource_type: 'auto',
                    timeout: 600000,
                    chunk_size: 6000000
                }),
                file = uploadedResponse.secure_url;
                console.log(file)

                return file;
    
 } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      return new Error("Failed to upload file");      
    }
  };
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