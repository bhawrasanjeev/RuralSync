const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || 'public_your_imagekit_public_key',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'private_your_imagekit_private_key',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/ruralsync',
});

module.exports = imagekit;
