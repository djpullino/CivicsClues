import React from "react";

const ElectoralMap = () => {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="/electoralmap.html" // Path to the HTML file in the public folder
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Electoral Map"
      />
    </div>
  );
};

export default ElectoralMap;
