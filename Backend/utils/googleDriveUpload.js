const { google } = require('googleapis');
const path = require('path');
const stream = require('stream');
const KEYFILEPATH = path.join(__dirname, 'cred.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const uploadFile = async (file) => {
  try {
    console.log(`Uploading file: ${file.originalname}`);
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    const drive = google.drive({ version: 'v3', auth });
    const { data } = await drive.files.create({
      media: {
        mimeType: file.mimetype,
        body: bufferStream,
      },
      requestBody: {
        name: file.originalname,
        parents: ['1xWxhB5jRGKtQyCRkgV4SbcQpp1u8LArH'],
      },
      fields: 'id,webViewLink',
    });

    console.log(`File uploaded successfully. File ID: ${data.id}`);
    return data.id;
  } catch (error) {
    console.error(`Error uploading file ${file.originalname}: ${error.message}`);
    throw error;
  }
};

module.exports = { uploadFile };
