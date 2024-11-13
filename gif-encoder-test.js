const axios = require('axios');
const sharp = require('sharp')

async function fetchImage(url) {
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer'  // Important: This tells Axios to return an ArrayBuffer
        });

        return response.data;  // This is the image buffer
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;  // Handle error as needed
    }
}

async function processImage(buffer) {
    try {
        const resizedImageBuffer = await sharp(buffer)
            .resize(112, 112, {
                kernel: sharp.kernel.nearest,
                fit: 'fill',
                //gravity: 'center',
                //position: 'right top',
                //background: { r: 255, g: 255, b: 255, alpha: 0.5 }
            })
            .toBuffer()
            .then(function (out) {
                sharp('template.gif', { animated: true })
                    .composite([{
                        input: out,
                        tile: true,
                        blend: 'saturate',
                        gravity: 'northwest',

                    }])
                    .toFile('pinto.gif');
            });
        // Use resizedImageBuffer as needed (save to disk, send over network, etc.)
        return resizedImageBuffer;
    } catch (error) {
        console.error('Error processing image:', error);
        throw error;  // Handle error as needed
    }
}

async function fetchAndProcessImage(url) {
    try {
        // Fetch image buffer
        const imageBuffer = await fetchImage(url);

        // Process image buffer
        const processedImageBuffer = await processImage(imageBuffer);

        // Return processed image buffer
        return processedImageBuffer;
    } catch (error) {
        console.error('Error:', error);
        throw error;  // Handle error as needed
    }
}

// Example usage:
const imageUrl = 'https://cdn.discordapp.com/avatars/1259304903566692372/c9ceaf4b7b8b0776a4610db639d6c824.webp';
fetchAndProcessImage(imageUrl)
    .then((processedBuffer) => {
        // Use processedBuffer as needed (e.g., save to disk, send in response)
        console.log('Image processed successfully.');
    })
    .catch((error) => {
        console.error('Error processing image:', error);
    });