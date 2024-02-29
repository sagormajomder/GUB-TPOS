import multer from 'multer';
import * as path from 'path';

// Configure the storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination folder for uploaded files
        cb(null, path.join(__dirname, '../uploads/'))
    },
    filename: (req, file, cb) => {
        // Set the filename for the uploaded file
        cb(null, Date.now() + '-' + file.originalname);
    },
});

export const upload = multer({ storage });
