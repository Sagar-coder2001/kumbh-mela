import React, { useState } from 'react';
import { Button, Card } from '@mui/material';
import bg from '../assets/demo1BG.jpg'
import overlay from '../assets/final.png'

const ClickPhoto = () => {
  const [background, setBackground] = useState(null); // State for selected model (background)
  const [photo, setPhoto] = useState(null); // State for captured photo


  const models = [
    'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwbWFufGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1679673988162-018d0400240e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVhdXRpZnVsJTIwbWFufGVufDB8fDB8fHww', 
    'https://media.istockphoto.com/id/1798500555/photo/happy-handsome-entrepreneur-aiming-thumb-at-copy-space-for-advertising-against-yellow.webp?a=1&b=1&s=612x612&w=0&k=20&c=0NZUkPmQk3l-Bu5cynmcENV_X3S5snd7B6MEOOlhY1Q=', 
    'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwbWFufGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1679673988162-018d0400240e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVhdXRpZnVsJTIwbWFufGVufDB8fDB8fHww', 
    'https://media.istockphoto.com/id/1798500555/photo/happy-handsome-entrepreneur-aiming-thumb-at-copy-space-for-advertising-against-yellow.webp?a=1&b=1&s=612x612&w=0&k=20&c=0NZUkPmQk3l-Bu5cynmcENV_X3S5snd7B6MEOOlhY1Q=', 
  ];

  const handleModelSelection = (index) => {
    setBackground(models[index]);
  };

  const handleCapturePhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Save the captured photo
      };
      reader.readAsDataURL(file);
    }
  };

//   const handleUploadPhoto = async () => {
//     if (photo && background) {
//       const formData = new FormData();
//       formData.append('model', background); // Attach model as background
//       formData.append('photo', photo); // Attach captured photo

//       try {
//         const response = await fetch('https://example.com/api/upload', {
//           method: 'POST',
//           body: formData,
//         });
//         const data = await response.json();
//         console.log('Successfully uploaded:', data);
//       } catch (error) {
//         console.error('Error uploading photo:', error);
//       }
//     }
//   };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* Model selection buttons */}
      <div style={{ marginBottom: '20px' }}>
        {models.map((model, index) => (
          <Button
            key={index}
            onClick={() => handleModelSelection(index)}
            variant="contained"
            color="primary"
            style={{ margin: '10px' }}>
            <img src={model} style={{ width: '80px', height: '80px', }} alt={`Model ${index + 1}`} />
          </Button>
        ))}
      </div>

      {/* Display selected background (model) */}
      {background && !photo && (
        <div>
          <p>Model Selected</p>
          <p>{background}</p>
          {/* Capture photo button */}
          <div style={{ marginTop: '20px' }}>
            <input
              type="file"
              accept="image/*"
              capture="camera"
            //   style={{ display: 'none' }}
              id="capture"
              onChange={handleCapturePhoto}
            />
            <label htmlFor="capture">
              <Button variant="contained" color="primary">Open Camera</Button>
            </label>
          </div>
        </div>
      )}

      {/* Show captured photo */}
      {photo && (
  <Card sx={{ width: '600px', minHeight:'100vh', maxWidth: '100%', margin: '0px auto' }}>
    {/* Container with background image */}
    <div
      style={{
        width: '100%',
        minHeight: '100vh', // Adjust height to your requirements
        position: 'relative',
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        objectFit: 'cover',
      }}
    >
      {/* User's captured photo */}
      <img
        src={photo}
        alt="Captured"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%', 
          height: 'auto',
          zIndex: 1,
        }}
      />
      {/* Overlay image */}
      <img
        src={overlay} 
        alt="Overlay"
        style={{
          position: 'absolute', 
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',  
          height: 'auto',
          zIndex: 2, 
        }}
      />

      {/* Upload Button */}
    
    </div>
    <div style={{margin:'20px 0px'}}>
        <Button variant="contained" color="secondary">
          Upload Photo
        </Button>
      </div>
  </Card>
  
)}

      {/* Instruction */}
      <div style={{ marginTop: '20px' }}>
        <p>Select a model (background), then click "Open Camera" to capture your photo!</p>
      </div>
    </div>
  );
};

export default ClickPhoto;
