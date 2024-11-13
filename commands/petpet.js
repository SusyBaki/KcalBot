const axios = require("axios")
fs = require("fs")
const sharp = require('sharp')
path = require("path")
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'pat',
    description: 'comando experimental',
    execute(message, args) {

        // User pfp url
        const userImg = message.mentions.users.map(user => {
            return `${user.displayAvatarURL({ format: 'png', dynamic: true })}`
        });

        // User id
        const userId = message.mentions.users.map(user => {
            return user.id
        });
        console.log(userId[0]);

        // func
        async function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        // func
        async function fetchImage(url) {
            try {
                const response = await axios.get(url, {
                    responseType: 'arraybuffer'  // image to bufferrrrrr
                });

                return response.data;  // image in memory
            } catch (error) {
                console.error('Error fetching image:', error);
                throw error;
            }
        }
        // func
        async function processImage(buffer) {
            try {
                const resizedImageBuffer = await sharp(buffer)
                    .resize(112, 112, {
                        kernel: sharp.kernel.nearest,
                        //background: { r: 255, g: 255, b: 255, alpha: 0.5 }
                    })
                    .toBuffer()
                    .then(function (out) {
                        sharp('assets/img/pat.gif', { animated: true })
                            .composite([{
                                input: out,
                                tile: true,
                                //blend: 'saturate',
                                //position: 'right bottom',
                                gravity: 'southwest',

                            }])
                            .toFile(`cache/pat/${userId[0]}.gif`);
                    });
                return resizedImageBuffer;
            } catch (error) {
                console.error('Error processing image:', error);
                throw error;
            }
        }
        // func
        async function fetchAndProcessImage(url) {
            try {
                const imageBuffer = await fetchImage(url);
                const processedImageBuffer = await processImage(imageBuffer);
                return processedImageBuffer;
            } catch (error) {
                console.error('Error:', error);
                throw error;  
            }
        }
        // func
        async function exe() {
            const imageUrl = userImg;
            fetchAndProcessImage(imageUrl)
            await delay(4000)
                .then((processedBuffer) => {
                    console.log('Image processed successfully.');
                    const file = new AttachmentBuilder(`cache/pat/${userId[0]}.gif`);
                    // send la creatura
                    message.channel.send({ files: [file] });
                })

                .catch((error) => {
                    console.error('Error processing image:', error);
                });
        }
        // execute
        exe();
    },
};