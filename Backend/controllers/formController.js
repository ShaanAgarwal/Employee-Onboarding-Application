const path = require('path');
const fs = require('fs');

// Handle file upload
const uploadFile = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { name } = req.body;
    const candidateName = name.replace(/\s+/g, '_'); // Replace spaces with underscores
    const candidatePath = path.join(__dirname, '../uploads', 'resume', candidateName);
    
    fs.mkdirSync(candidatePath, { recursive: true });

    const filePath = path.join(candidatePath, req.file.originalname);

    fs.writeFileSync(filePath, req.file.buffer);

    req.filePath = filePath; // Save the file path for further processing

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
};

// Handle form submission
const submitForm = async (req, res) => {
  try {
    const { name, email } = req.body;
    const resumeFilePath = req.filePath; // Access the uploaded file path here

    // Process the form data here and perform database operations if needed

    res.json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { uploadFile, submitForm };
