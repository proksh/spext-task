import React, { useState } from 'react';
import PlayerControl from './PlayerControl';
import AudioDetails from './AudioDetails';
import audioList from '../common/audioList';
import ReactTooltip from "react-tooltip";
import DraggablePlayerControlWrapper from './DraggablePlayerControlWrapper'


export default function AudioPlayer() {
  const [audioIndex, setAudioIndex] = useState(0);
  const [userData, setUserData] = useState({
    likedAudios: [audioList[0]],
    shuffle: false,
    repeat: 'selected',
  })

  const changeAudioIndex = value => {
    if (value < 0) {
      setAudioIndex(audioList.length - 1)
    } else {
      setAudioIndex(value % audioList.length)
    }
  }


  return (
    <div className="relative flex mx-auto xl:items-center h-100 w-full xl:py-96 z-10 xl:max-w-6xl">
      <ReactTooltip place="top" type="light" effect="solid" />
      <div className="grid grid-cols-12 xl:grid-cols-22 w-full">
        <div className="col-span-12 sm:col-start-2 sm:col-end-12 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10 xl:col-span-10 audio-detial-wrapper">
          <AudioDetails
            currentAudio={audioList[audioIndex]}
            userData={userData}
            setUserData={setUserData}
          />
        </div>
        <div className="col-start-1 col-end-13 xl:col-span-12 flex flex-col xl:justify-center">
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