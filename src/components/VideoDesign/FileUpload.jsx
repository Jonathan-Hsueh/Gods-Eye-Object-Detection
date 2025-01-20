import React, { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    onFileUpload(uploadedFile); // Pass the file to the parent component
  };

  return (
    <div className="file-upload">
      <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
      {file && <p>File Uploaded: {file.name}</p>}
    </div>
  );
};

export default FileUpload;
