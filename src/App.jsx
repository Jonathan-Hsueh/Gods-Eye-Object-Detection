import React, { useState, useEffect } from 'react';
import './App.css';
import BackgroundComponent from './components/BackgroundDesign/BackgroundComponent';
import FileUpload from './components/VideoDesign/FileUpload';
import WebcamDetection from './components/VideoDesign/WebcamDetection';
import ResultsDisplay from './components/VideoDesign/ResultsDisplay';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [file, setFile] = useState(null);
  const [detectedResult, setDetectedResult] = useState(null);
  const [rtmpUrl, setRtmpUrl] = useState('');

  const toggleBackground = () => {
    setIsDarkMode(!isDarkMode);
    document.body.className = isDarkMode ? 'light-mode' : 'dark-mode';
  };

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
    processFile(uploadedFile);
  };

  const processFile = (file) => {
    setDetectedResult("Processed: " + file.name); // Mock result
  };

  const handleWebcamFrame = (frame) => {
    setDetectedResult("Processed frame"); // Mock result
  };

  const handleRtmpStream = (url) => {
    setRtmpUrl(url);
    setDetectedResult("Processing RTMP stream..."); // Mock result
  };

  // Automatically stop webcam detection when switching services
  return (
    <div>
      <BackgroundComponent
        toggleBackground={toggleBackground}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default App;
