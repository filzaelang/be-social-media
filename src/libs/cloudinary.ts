import { v2 as cloudinary } from 'cloudinary';
import "dotenv/config"

export default new class CloudinaryConfig {
    upload() {
        cloudinary.config({
            cloud_name: process.env.CD_CLOUD_NAME,
            api_key: process.env.CD_API_KEY,
            api_secret: process.env.CD_API_SECRET,
            secure: true
        })
    }

    async destination(image: string): Promise<any> {
        try {
            return await cloudinary.uploader.upload(`src/uploads/${image}`, {
                folder: process.env.CD_FOLDER
            });
        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
            throw error;
        }
    }

}