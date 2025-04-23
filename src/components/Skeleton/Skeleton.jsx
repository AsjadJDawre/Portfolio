import React from 'react';
import './Skeleton.css';

const Skeleton = ({ width = '100%', height = '100%', borderRadius = '4px' }) => {
  return (
    <div 
      className="skeleton" 
      style={{ 
        width, 
        height, 
        borderRadius 
      }}
    />
  );
};

export default Skeleton; 