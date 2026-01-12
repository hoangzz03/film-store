import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  private IMGUR_CLIENT_ID = '41511733661c6dc';

  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      await this.sleep(1000);
      const base64Image = file.buffer.toString('base64');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').split('Z')[0];

      const response = await axios.post(
        'https://api.imgur.com/3/image',
        { image: base64Image, type: 'base64', title: `Uploaded_${timestamp} ` },
        { headers: { Authorization: `Client-ID ${this.IMGUR_CLIENT_ID}` } }
      );
      return response.data.data.link;
    } catch (error) {
      console.error('Imgur API Error:', error.response?.data || error.message);
      throw new Error('Upload to Imgur failed');
    }
  }
}