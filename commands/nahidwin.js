const axios = require("axios")
fs = require("fs")
const sharp = require('sharp')
path = require("path")
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'nahidwin',
    description: 'comando experimental',
    execute(message, args) {

        // User pfp url
        const userImg = message.mentions.users.map(user => {
            return `${user.displayAvatarURL({ format: 'png', dynamic: true })}?size=2048`
        });

        // User id
        const userId = message.mentions.users.map(user => {
            return user.id
        });
        console.log(userId[0]);

        async function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

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
                    .resize(512, 512, {
                        kernel: sharp.kernel.nearest,
                        //background: { r: 255, g: 255, b: 255, alpha: 0.5 }
                    })
                    .toBuffer()
                    .then(function (out) {
                        sharp('assets/img/nahidwin.png', { animated: false })
                            .composite([{
                                input: out,
                                tile: true,
                                blend: 'saturate',
                                //position: 'right bottom',
                                gravity: 'southwest',

                            }])
                            .toFile(`cache/nahidwin/${userId[0]}.png`);
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
        async function exe() {
            const imageUrl = userImg;
            fetchAndProcessImage(imageUrl)
            await delay(4000)
                .then((processedBuffer) => {
                    // Use processedBuffer as needed (e.g., save to disk, send in response)
                    console.log('Image processed successfully.');
                    const file = new AttachmentBuilder(`cache/nahidwin/${userId[0]}.png`);
                    message.channel.send({ files: [file] });
                })

                .catch((error) => {
                    console.error('Error processing image:', error);
                });
        }
        exe();
    },
};