import React from 'react';
import { saveAs } from 'file-saver';

const SessionLog = () => {
  const handleDownload = () => {
    const file = new Blob(['Hello, world!'], { type: 'text/plain;charset=utf-8' });
    saveAs(file, 'hello_world.txt');
  };

  return (
    <button onClick={handleDownload}>
      Download
    </button>
  );
};

export default SessionLog;