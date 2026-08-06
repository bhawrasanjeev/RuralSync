const imagekit = require('../config/imagekit');
const ApiError = require('./apiError');

/**
 * Upload a file buffer or base64 string to ImageKit
 * @param {Buffer|String} fileBuffer - File buffer or base64 data string
 * @param {String} fileName - Desired file name
 * @param {String} folder - ImageKit target folder path (e.g. '/complaints', '/avatars')
 */
const uploadToImageKit = async (fileBuffer, fileName, folder = '/ruralsync') => {
  try {
    const uploadResponse = await imagekit.upload({
      file: fileBuffer, // Buffer or base64 string or file URL
      fileName: fileName || `file_${Date.now()}`,
      folder,
      useUniqueFileName: true,
    });

    return {
      fileId: uploadResponse.fileId,
      url: uploadResponse.url,
      thumbnailUrl: uploadResponse.thumbnailUrl,
      name: uploadResponse.name,
      size: uploadResponse.size,
      filePath: uploadResponse.filePath,
    };
  } catch (error) {
    console.error('[ImageKit Upload Error]:', error);
    throw new ApiError(500, `Failed to upload file to ImageKit: ${error.message}`);
  }
};

/**
 * Delete a file from ImageKit by fileId
 * @param {String} fileId - ImageKit file ID
 */
const deleteFromImageKit = async (fileId) => {
  try {
    await imagekit.deleteFile(fileId);
    return true;
  } catch (error) {
    console.error('[ImageKit Delete Error]:', error);
    return false;
  }
};

/**
 * Generate client authentication parameters for direct frontend upload to ImageKit
 */
const getImageKitAuthParams = () => {
  return imagekit.getAuthenticationParameters();
};

module.exports = {
  uploadToImageKit,
  deleteFromImageKit,
  getImageKitAuthParams,
};
