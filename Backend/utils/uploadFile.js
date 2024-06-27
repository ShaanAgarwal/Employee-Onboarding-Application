require('dotenv').config(); // Load environment variables from .env file
const { google } = require("googleapis");
const stream = require("stream");

// Load credentials from environment variables
const credentials = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key.replace(/\\n/g, '\n'),
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
  universe_domain: process.env.universe_domain
};

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const uploadFile = async (file) => {
  try {
    console.log(`Uploading file: ${file.originalname}`);
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    const drive = google.drive({ version: "v3", auth });
    const { data } = await drive.files.create({
      media: {
        mimeType: file.mimetype,
        body: bufferStream,
      },
      requestBody: {
        name: file.originalname,
        parents: ["1xWxhB5jRGKtQyCRkgV4SbcQpp1u8LArH"], // Example parent folder ID
      },
      fields: "id,webViewLink, webContentLink",
    });

    console.log(`File uploaded successfully. File ID: ${data.id}`);
    return data;
  } catch (error) {
    console.error(
      `Error uploading file ${file.originalname}: ${error.message}`
    );
    throw error;
  }
};

module.exports = { uploadFile };
