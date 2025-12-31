// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../config/cloudinary.js';

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: 'doctors',
//         allowed_formats: ['jpg', 'jpeg', 'png'],
//     },
// });

// const uploadCloud = multer({ storage });

// export default uploadCloud;
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        // image → image | còn lại → raw
        const isImage = file.mimetype.startsWith('image/');

        return {
            folder: 'remedy-files',
            resource_type: isImage ? 'image' : 'raw',
            public_id: `${Date.now()}-${file.originalname}`,
        };
    },
});

const uploadCloud = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
});

export default uploadCloud;
