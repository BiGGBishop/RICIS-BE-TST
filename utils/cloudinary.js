const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadSingleFile(file) {
    console.log(file)
    try {
      const result = await cloudinary.uploader.upload(file,{ resource_type: 'auto'});
      return result.secure_url;
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      throw new Error("Failed to upload file");
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