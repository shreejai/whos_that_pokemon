import React, { useEffect, useRef } from 'react'

const AudioPlayer = ({ url }) => {
  const audioRef = useRef(null);

  useEffect(()=>{
    if (audioRef.current) {
      audioRef.current.src = url;
    }
  },[url])
  return (
    <div>
      <audio ref={audioRef} autoPlay onEnded={() => audioRef.current.pause()}/>
    </div>
  )
}

export default AudioPlayer;