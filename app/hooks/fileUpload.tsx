import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_PUBLIC,
  api_secret: process.env.CLOUDINARY_SECERET
});

const UploadFile = async (file: File) => {
    try {
        // Convert file to base64
        const base64Data = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(base64Data as string, {
            folder: 'profile_images', // Optional: organize in folders
        });

        return result.secure_url; // Returns the HTTPS URL of the uploaded image
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export { UploadFile };