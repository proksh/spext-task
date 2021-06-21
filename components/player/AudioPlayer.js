import React, { useState, useEffect } from 'react';
import PlayerControl from './PlayerControl';
import AudioDetails from './AudioDetails';
import audioList from '../common/audioList';
import ReactTooltip from "react-tooltip";
import DraggablePlayerControlWrapper from './DraggablePlayerControlWrapper'


export default function AudioPlayer() {
  const [audioIndex, setAudioIndex] = useState(0);
  const [userData, setUserData] = useState({
    likedAudios: [],
    shuffle: false,
    repeat: 'notselected',
  })

  const changeAudioIndex = value => {
    if (value < 0) {
      setAudioIndex(audioList.length - 1)
    } else {
      setAudioIndex(value % audioList.length)
    }
  }


  return (
    <div className="relative flex mx-auto xl:items-center w-full py-96 z-10 max-w-6xl">
      <ReactTooltip place="top" type="light" effect="solid" />
      <div className="grid grid-cols-22 w-full">
        <div className="col-span-10 audio-detial-wrapper">
          <AudioDetails
            currentAudio={audioList[audioIndex]}
            userData={userData}
            setUserData={setUserData}
          />
        </div>
        <div className="col-span-12 flex flex-col justify-center">
          <DraggablePlayerControlWrapper>
            <PlayerControl
              audioIndex={audioIndex}
              audioList={audioList}
              userData={userData}
              changeAudioIndex={changeAudioIndex}
              setUserData={setUserData}
            />
          </DraggablePlayerControlWrapper>
        </div>
      </div>
    </div>
  )
}