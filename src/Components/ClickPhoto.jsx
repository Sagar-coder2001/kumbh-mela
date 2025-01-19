import React, { useState } from 'react';
import { Button, Card, CircularProgress, TextField } from '@mui/material';
import bg from '../assets/kumbghbg.jpg'
import overlay from '../assets/final.png'

const ClickPhoto = () => {
  const [background, setBackground] = useState(null); // State for selected model (background)
  const [photo, setPhoto] = useState(null); // State for captured photo
  const [finalphoto, setFinalphoto] = useState(false);
  const [modelInput, setModelInput] = useState(''); // State for user input
  const [camera, setshowcamera] = useState(false)
  const [loading, setLoading] = useState(false)

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
      setPhoto(file); // Save the file directly
    }
  };

  const handleUploadPhoto = async () => {
    setLoading(true)
    if (photo && background) {
      const formData = new FormData();
      formData.append('file', photo);

      try {
        const response = await fetch('https://www.cutout.pro/api/v1/matting?mattingType=6', {
          method: 'POST',
          headers: {
            'APIKEY': 'ef719139e8e94de78af04f4f80b41fb1',
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Error uploading image');
        }

        const resultBlob = await response.blob();
        const imageUrl = URL.createObjectURL(resultBlob);
        // Set the processed image URL to the state
        setFinalphoto(imageUrl);

        console.log(imageUrl); // Log the image URL to the console for debugging
      } catch (error) {
        console.error('Error:', error);
      }
      finally{
        setLoading(false);
      }
    } 
    else {
      alert('Please capture an image first.');
    }
  };


  const handleInputChange = (event) => {
    setModelInput(event.target.value);
  };

  const handleModelInputSubmit = () => {
    const modelIndex = parseInt(modelInput) - 1; // Convert to zero-based index
    if (modelIndex >= 0 && modelIndex < models.length) {
      setBackground(models[modelIndex]);
      setshowcamera(true);
    } else {
      alert('Invalid input. Please enter a number between 1 and 6.');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* User Input for Model Selection */}


      {/* Model selection buttons */}
      <div style={{ marginBottom: '20px' }}>
        {models.map((model, index) => (
          <Button
            key={index}
            onClick={() => handleModelSelection(index)}
            variant="contained"
            color="primary"
            style={{ margin: '10px' }}
          >
            <img
              src={model}
              style={{ width: '80px', height: '80px' }}
              alt={`Model ${index + 1}`}
            />
          </Button>
        ))}
      </div>

      {/* Display selected background (model) */}
      {background && !photo && (
        <div>
          <p>Model Selected</p>
          <div>
            <div>
              <TextField
                label="Enter model number (1-6)"
                value={modelInput}
                onChange={handleInputChange}
                variant="outlined"
                style={{ marginBottom: '20px' }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleModelInputSubmit}
                sx={{ margin: '10px' }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}

      {
        camera && background && (
          <>
            <input
              type="file"
              accept="image/*"
              capture="camera"
              id="capture"
              onChange={handleCapturePhoto}
            />
            <label htmlFor="capture">
              <Button variant="contained" color="primary">
                Open Camera
              </Button>
            </label>
          </>
        )
      }

{photo && !finalphoto && (
        <>
         <Card sx={{ width: '100%', maxWidth: '100%', minHeight:'100vh', margin: '10px auto', textAlign:'center' }}>
          <div style={{ border: '1px solid', width: '100%', minHeight: '100vh', position: 'relative' }}>
            <img
              src={URL.createObjectURL(photo)}
              alt="Captured"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                objectFit: 'cover',
                zIndex: 1,
              }}
            />
              {
            loading && (
              <>
              <CircularProgress />
              </>
            )
          }
          </div>
        
          
          </Card>
          <div style={{ margin: '20px 0px' }}>
        
        <Button variant="contained" color="secondary" onClick={handleUploadPhoto}>
          Upload Photo
        </Button>
      </div>
        </>
      )}



      {finalphoto && (
        <>
          <Card sx={{ width: '100%', maxWidth: '100%', margin: '10px auto' }}>
            {/* Container with background image */}
            <div
              style={{
                width: '100%',
                position: 'relative',
                backgroundImage: `url(${bg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                objectFit: 'cover',
              }}
            >
              {/* User's captured photo */}
              <div style={{ width: '100%', minHeight:'50vh', border:'1px solid', display:'flex', justifyContent:'center', alignItems:'center' }}>
                <div style={{width:'300px', minHeight:'200px'}}>
                <img
                  src={finalphoto} // Display captured photo
                  alt="Captured"
                  style={{
                    position: 'absolute',
                    top: '20%',
                    // left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '300px',
                    height:'300px',
                    objectFit:'cover',
                    backgroundPosition:'center',
                    backgroundSize:'cover',
                    zIndex: 1,
                  }}
                />
                </div>
              </div>

              {/* Overlay image */}
              <div style={{ width: '100%', minHeight:'50vh' }}>
              <img
                src={finalphoto} // Using the same captured photo for reflection
                alt="Reflection"
                style={{
                  position: 'absolute',
                  top: 'calc(50%)', // Position the reflection below the original image (you can adjust this offset)
                  left: '50%',
                  transform: 'translateX(-50%) scaleY(-1)', // Mirroring the image vertically
                  maxWidth: '300px',
                  height:'250px',
                  zIndex: 1,
                  opacity: 0.4, // Make the reflection semi-transparent
                  filter: 'blur(2px)', // Adding blur to make the reflection look like it's in water
                }}
              />
              </div>
             
            </div>
          </Card>

          {/* Reflection Section */}
          {/* <Card sx={{ width: '600px', minHeight: '100vh', maxWidth: '100%', margin: '10px auto' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '100vh',
              overflow: 'hidden',
              zIndex: 5,
              backgroundImage: `url(${bg})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              objectFit: 'cover',
            }}
          >
          
            <img
              src={photo} 
              alt="Reflection"
              style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translateX(-50%) scaleY(-1)', 
                width: '100%',
                height: 'auto',
                zIndex: 1,
                opacity: 0.4, 
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                height: '50%',
                background: 'linear-gradient(to top, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))', // Water effect
                zIndex: 2,
              }}
            ></div>
          </div>
          </Card> */}
         
        </>
      )}

      {/* Instruction */}
      <div style={{ marginTop: '20px' }}>
        <p>Select a model (background), then click "Open Camera" to capture your photo!</p>
      </div>
    </div>
  );
};

export default ClickPhoto;
