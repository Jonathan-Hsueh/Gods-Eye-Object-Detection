import React, { useEffect, useRef } from 'react';
import './WebcamDetection.css';

const WebcamDetection = ({ isDetecting }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null); // Ref to hold the webcam stream

  useEffect(() => {
    const startWebcam = async () => {
      if (isDetecting && !streamRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          streamRef.current = stream; // Store the stream in the ref
          videoRef.current.srcObject = stream;
        } catch (err) {
          console.error("Error accessing webcam:", err);
        }
      }
    };

    const stopWebcam = () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop()); // Stop all tracks of the webcam stream
        streamRef.current = null;
      }
    };

    // Start webcam if detecting
    if (isDetecting) {
      startWebcam();
    } else {
      stopWebcam();
    }

    // Cleanup function to stop webcam stream when isDetecting changes
    return () => {
      stopWebcam();
    };
  }, [isDetecting]); // Trigger webcam start/stop when isDetecting changes

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Ensure the video fits inside the container
    />
  );
};

export default WebcamDetection;
