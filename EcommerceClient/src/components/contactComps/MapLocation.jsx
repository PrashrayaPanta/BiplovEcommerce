import React from 'react';

function MapLocation() {
  return (
    <div className="w-full h-96">
      <iframe
        loading="lazy"
        src="https://maps.google.com/maps?q=Chadani%20Chowk%2C%20Tyanglaphat%2C%20kritipur&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near"
        title="Chadani Chowk, Tyanglaphat, kritipur"
        aria-label="Chadani Chowk, Tyanglaphat, kritipur"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default MapLocation;
