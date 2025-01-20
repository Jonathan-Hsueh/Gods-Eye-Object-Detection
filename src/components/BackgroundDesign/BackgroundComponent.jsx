import React, { useRef, useState, useEffect } from 'react';
import './BackgroundComponent.css';
import lightModeIcon from "../../../images/mode-light-icon.png"; // Import the light mode icon
import darkModeIcon from "../../../images/mode-dark-icon.png"; // Import Dark Mode Icon

import lightFile from "../../../images/file-light-icon.png"
import darkFile from "../../../images/file-dark-icon.png"
import lightRTMP from "../../../images/rtmp-light-icon.png"
import darkRTMP from "../../../images/rtmp-dark-icon.png"

import FileUpload from '../VideoDesign/FileUpload';

const BackgroundComponent = ({ isDarkMode, toggleBackground, isWebcam }) => {
  const [videoStream, setVideoStream] = useState(null); // Store video stream
  const videoRef = useRef(null); // Reference to video element
  const isRTMP = false;
  const isFile = false;
  function toggleRTMP() {
    if (isRTMP) {
      isRTMP = false;
    }
    else {
      isRTMP = true;
    }
  }
  function toggleFile() {
    if (isFile) {
      isFile = false;
    }
    else {
      isFile = true;
    }
  }

  // Start the webcam stream
  useEffect(() => {
    if (isWebcam) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setVideoStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream; // Set the webcam stream to the video element
          }
        })
        .catch((error) => {
          console.error('Error accessing webcam:', error);
        });
    } else {
      if (videoRef.current) {
        videoRef.current.srcObject = null; // Stop webcam when service is not 'webcam'
      }
    }

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop()); // Clean up when component unmounts
      }
    };
  }, [isWebcam]);

  let content = '';

  // Define the content based on selected service
  if (isWebcam) {
    content = <video ref={videoRef} autoPlay muted className="webcam-video" />;
  } 
  else {
    content = <div className="icon-box">
      <button className="file-btn" onClick={() => toggleFile()}>
        <img
        src={isDarkMode ? lightFile : darkFile}
        alt="File Upload Icon"
        className = "file-icon"
        ></img>
      </button>

      <button className="rtmp-btn" onClick={() => toggleRTMP()}>
        <img
        src={isDarkMode ? lightRTMP : darkRTMP}
        alt="RTMP Stream Icon"
        className = "rtmp-icon"
        ></img>
      </button>
    </div>
  }

  return (
    <div className={`background-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className={`layered-header ${isDarkMode ? 'dark-header' : 'light-header'}`}>
        <p className="header-text">godseye.</p> {/* Always display this */}
      </div>
      <div className={`layered-box ${isDarkMode ? 'dark-box' : 'light-box'}`}>
        <div className="inside-box">{content}</div>
        
      </div>
      <div className="button-container">
        <button className="toggle-circle" onClick={toggleBackground}>
          <img
            src={isDarkMode ? lightModeIcon : darkModeIcon}
            alt="Mode Toggle Icon"
            className="toggle-icon"
          />
        </button>
      </div>
      <div className="selection-container">
        <button className={`webcam-button ${isDarkMode ? 'dark-webcam' : 'light-webcam'}`}> {isWebcam ? (<p>Turn on Webcam</p> ) : (<p>Turn off Webcam</p>)} </button>
        <button className={`file-button ${isDarkMode ? 'dark-flbtn' : 'light-flbtn'}`}>Upload File</button>
      </div>
    </div>
  );
};

export default BackgroundComponent;
