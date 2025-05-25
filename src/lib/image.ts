import sharp from 'sharp';

export async function optimizeImage(
  imageUrl: string,
  width: number,
  height: number,
  quality = 80
): Promise<Buffer> {
  try {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return await sharp(buffer)
      .resize(width, height, {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({ quality })
      .toBuffer();
  } catch (error) {
    console.error('Error optimizing image:', error);
    throw error;
  }
}

export async function getImageMetadata(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return await sharp(buffer).metadata();
  } catch (error) {
    console.error('Error getting image metadata:', error);
    throw error;
  }
} 