const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadSingleFile(media) {
    function isValidDataURI(str) {
        return typeof str === 'string' && str.startsWith('data:');
    }

    try {
        if (!media || typeof media !== 'string' || !isValidDataURI(media)) {
            console.log("Invalid file format or path");
            return null;
        }

        const uploadedResponse = await cloudinary.uploader.upload(media, {
            public_id: `ricis_${Date.now()}`, // Removed extension
            resource_type: 'auto',
            timeout: 600000,
            chunk_size: 6000000
        });

        console.log(uploadedResponse.secure_url);
        return uploadedResponse.secure_url;

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error;
    }
}

const allowedExtensions = [
    '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp'
];

async function uploadMultiple(files, folder = 'uploads') {
    if (!files || files.length === 0) {
        return [];
    }

    const uploadPromises = files.map(file => {
        const ext = path.extname(file.originalname || file.path || file).toLowerCase();
        if (!allowedExtensions.includes(ext)) {
            return Promise.reject(new Error(`Unsupported file type: ${ext}`));
        }

        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(file.path || file, {
                resource_type: 'auto',
                folder: folder,
            }, (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    reject(error);
                } else {
                    resolve({
                        url: result.secure_url,
                        public_id: result.public_id,
                        resource_type: result.resource_type,
                        format: result.format
                    });
                }
            });
        });
    });

    return Promise.all(uploadPromises);
}

module.exports = { uploadMultiple,uploadSingleFile };