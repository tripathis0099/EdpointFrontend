import React from 'react'
import { useLocation } from 'react-router-dom';

function WatchVideo() {
  const location = useLocation();
  const currentVideo = location.state.currentVideo;
    console.log("this is",  currentVideo);
  return (
    <>
     {currentVideo && <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}>
        
        <svg style={{position:'absolute',right:'20px',top:'80px'}} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg>
  
          <iframe
            src={currentVideo}
            style={{ width: '100%', height: '100%' }}
            allowFullScreen
          ></iframe>
        </div>}
    
    </>
  )
}

export default WatchVideo