import { v2 as cloudinary } from "cloudinary";

export default new class CloudinaryConfig {
    upload() {
        cloudinary.config({
            cloud_name: 'db3rcszdl',
            api_key: '453459635394917',
            api_secret: 'OxNUzplsjYSKMvSrZ0VpcZWWXkk',
            secure: true,
          });
    }
    async destination(picture: string) : Promise<any> {
        try {
            return await cloudinary.uploader.upload(`src/uploads/${picture}`)
        } catch(error) {
            throw error
        }
    }
}