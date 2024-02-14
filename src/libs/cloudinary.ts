import { v2 as cloudinary } from 'cloudinary';

export default new class CloudinaryConfig {
    upload() {
        cloudinary.config({
            cloud_name: 'dxkz3gc1e',
            api_key: '591548171932735',
            api_secret: 'xm9xzP68Hvdqn8cmquzJYZgX7nI',
            secure: true
        })
    }

    async destination(image: string): Promise<any> {
        try {
            return await cloudinary.uploader.upload(`src/uploads/${image}`);
        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
            throw error;
        }
    }

}