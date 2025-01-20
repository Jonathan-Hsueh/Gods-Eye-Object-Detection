import React from 'react';

const ServiceSelector = ({ onSelectService }) => {
  return (      
    <div className="service-selector">
      <button onClick={() => onSelectService('fileUpload')}>Upload File</button>
      <button onClick={() => onSelectService('rtmp')}>RTMP Stream</button>
    </div>
  );
};

export default ServiceSelector;
