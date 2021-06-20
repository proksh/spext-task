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
    <div className="pos-relative d-flex flex-column xl:flex-row mx-auto xl:align-items-center w-100 py-96 zindex-2 maxw-1140">
      <ReactTooltip place="top" type="light" effect="solid" />
      <div className="col-10 audio-detial-wrapper">
        <AudioDetails
          currentAudio={audioList[audioIndex]}
          userData={userData}
          setUserData={setUserData}
        />
      </div>
      <div className="col-12">
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
  )
}