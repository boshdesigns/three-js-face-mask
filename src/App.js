import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import MindARViewer from './mindar-viewer';
import MindARThreeViewer from './mindar-three-viewer';
import QrScanner from 'qr-scanner';

function App() {
  const [started, setStarted] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [scanner, setScanner] = useState(null);

  const videoRef = useRef();

  const setupScanner = () => {
    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => {
        console.log('decoded qr code:', result);
        setQrCodeValue(result.data);
        setStarted('three');
      },
      {
        highlightScanRegion: true,
      }
    );
    qrScanner.start();
    setScanner(qrScanner);
  };

  useEffect(() => {
    setupScanner();
  }, []);

  useEffect(() => {
    if (scanner !== null) {
      started !== null ? scanner.stop() : setupScanner();
    }
  }, [started]);

  return (
    <div className="App">
      <h1>
        Example React component with{' '}
        <a href="https://github.com/hiukim/mind-ar-js" target="_blank">
          MindAR
        </a>
        <p>{`QR value: ${qrCodeValue}`}</p>
      </h1>

      <div className="control-buttons">
        {started !== null && (
          <button
            onClick={() => {
              setStarted(null);
              setQrCodeValue('');
            }}
          >
            Scan a Different QR code
          </button>
        )}
      </div>

      {started === null && (
        <div className="">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>QR Scanner</h2>
            <video ref={videoRef} style={{ width: '600px' }} />
          </div>

          <div className="control-buttons" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h4>Face Mask 1</h4>
              <img src="./assets/face_model_1.png" width="200" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h4>Face Mask 2</h4>
              <img src="./assets/face_model_2.png" width="200" />
            </div>
          </div>
        </div>
      )}

      {started === 'three' && (
        <div className="container">
          <MindARThreeViewer modelID={qrCodeValue} />
        </div>
      )}
    </div>
  );
}

export default App;
