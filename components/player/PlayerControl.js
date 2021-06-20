import React, { createRef, useState, useEffect } from 'react';
import ReactSlider from "react-slider";
import Image from "next/image";
import moment from 'moment';

const repeatOptions = [
  'notselected',
  'selected',
  'one',
]

export default function PlayerControl({ audioIndex, audioList, changeAudioIndex, userData, setUserData }) {
  const audioRef = createRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [source, setSource] = useState(false);
  const [timeData, setTimeData] = useState({
    currentTime: 0,
    totalTime: 0,
    ratio: 0,
  });

  // Update the src in audio tag whenever index changes
  useEffect(() => {
    updateSong(audioList[audioIndex].url);
  }, [audioIndex]);

  // Set the url and Reload the player
  const updateSong = (source) => {
    setSource(source);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      isPlaying && audioRef.current.play();
    }
  }

  // Update time for the audio
  // Give percent value in case you are force changing it
  const updateTime = value => {
    let newTimeData = {};
    if (typeof (value) === "number") {
      newTimeData.ratio = value / 100;
      newTimeData.totalTime = audioRef?.current?.duration;
      newTimeData.currentTime = newTimeData.ratio * newTimeData.totalTime;
      audioRef.current.currentTime = newTimeData.currentTime;
    } else {
      newTimeData.currentTime = audioRef?.current?.currentTime;
      newTimeData.totalTime = audioRef?.current?.duration;
      newTimeData.ratio = newTimeData.currentTime / newTimeData.totalTime;
    }
    setTimeData(newTimeData);
  }

  const onRepeatClick = () => {
    let nextIndex = _.findIndex(repeatOptions, (e) => e == userData.repeat, 0) + 1;
    setUserData({ ...userData, repeat: repeatOptions[nextIndex % repeatOptions.length] })
  }

  // Toggle play and pause
  const toggleAudioPlay = value => {
    if (value) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(value);
  }

  const onNextBack = () => {
    if (userData.repeat === 'one') {
      updateTime(0);
    } else {
      changeAudioIndex(audioIndex - 1);
    }
  }

  const onNextClick = () => {
    if (userData.repeat === 'notselected' && (audioIndex === audioList.length - 1)) {
      updateTime(0);
      return null;
    } else if (userData.repeat === 'one') {
      updateTime(0);
    } else {
      changeAudioIndex(audioIndex + 1);
    }
  }

  return (
    <div className="player-control">
      {/* Audio player */}
      <audio ref={audioRef} onTimeUpdate={updateTime} onLoadedMetadata={updateTime} onEnded={onNextClick}>
        <source src={source || undefined} type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>

      {/* Button controls */}
      <div className="d-flex align-items-center justify-content-center mb-40">
        {/* Left side */}
        <div className="d-flex">
          <button
            data-tip="Shuffle"
            onClick={() => setUserData({ ...userData, shuffle: !userData.shuffle })}
            className="h-32 w-32 d-flex align-items-center justify-content-center r-circle bg-white hover-bg-grayLight hover-shadow-neo2 mr-16"
          >
            {userData.shuffle ?
              <Image width="24px" height="24px" src="/icons/shuffle-selected.svg" className="w-24" alt="Shuffle Selected" /> :
              <Image width="24px" height="24px" src="/icons/shuffle.svg" className="w-24" alt="Shuffle" />
            }
          </button>
          <button
            data-tip="Repeat"
            onClick={onRepeatClick}
            className="h-32 w-32 d-flex align-items-center justify-content-center r-circle bg-white hover-bg-grayLight hover-shadow-neo2"
          >
            <Image width="24px" height="24px" src={userData.repeat ? `/icons/repeat-${userData.repeat}.svg` : undefined} className="w-24" alt="Repeat one song" />
          </button>
        </div>
        {/* Main Buttons */}
        <div className="d-flex align-items-center mx-56">
          <button
            onClick={onNextBack}
            className="primary-btn d-flex bg-grayLight align-items-center justify-content-center r-circle p-6 shadow-neo2"
            disabled={userData.repeat === 'notselected' && (audioIndex === 0)}
          >
            <div className="h-28 w-28 r-circle inner">
              <Image width="20px" height="20px" src="/icons/left.svg" className="w-20" alt="Previous Audio" />
            </div>
          </button>
          <button
            onClick={() => toggleAudioPlay(!isPlaying)} className="primary-btn d-flex bg-grayLight align-items-center justify-content-center r-circle p-10 shadow-neo2 mx-24">
            <div className="h-48 w-48 r-circle inner">
              {isPlaying ?
                <Image width="20px" height="20px" src="/icons/pause.svg" className="w-20" alt="Pause Audio" /> :
                <Image width="20px" height="20px" src="/icons/play.svg" className="w-20" alt="Play Audio" />
              }
            </div>
          </button>
          <button
            onClick={onNextClick}
            className="primary-btn d-flex bg-grayLight align-items-center justify-content-center r-circle p-6 shadow-neo2"
            disabled={userData.repeat === 'notselected' && (audioIndex === audioList.length - 1)}
          >
            <div className="h-28 w-28 r-circle inner">
              <Image width="20px" height="20px" src="/icons/right.svg" className="w-20" alt="Next Audio" />
            </div>
          </button>
        </div>
        {/* Right side */}
        <div className="d-flex">
          <button
            data-tip="Repeat"
            className="h-32 w-32 d-flex align-items-center justify-content-center r-circle bg-white hover-bg-grayLight mr-16 hover-shadow-neo2"
          >
            <Image width="24px" height="24px" src="/icons/repeat.svg" className="w-24" alt="Repeat playlist" />
          </button>
          <button
            data-tip="Customize"
            className="h-32 w-32 d-flex align-items-center justify-content-center r-circle bg-white hover-bg-grayLight hover-shadow-neo2"
          >
            <Image width="24px" height="24px" src="/icons/customize.svg" className="w-24" alt="Customize voice" />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="player-control-slider-wrapper">
        <ReactSlider
          className="player-control-slider"
          thumbClassName="player-control-slider-thumb"
          trackClassName="player-control-slider-track"
          value={timeData.ratio * 100}
          onAfterChange={updateTime}
          onSliderClick={updateTime}
        />
      </div>
      {/* Time count */}
      <div className="d-flex justify-content-between pt-12">
        <p className="fs-caption color-medium">
          {moment.utc(timeData.currentTime * 1000).format('mm:ss')}
        </p>
        <p className="fs-caption color-medium text-right">
          {timeData.totalTime > 0 ? moment.utc(timeData.totalTime * 1000).format('mm:ss') : "00:00"}
        </p>
      </div>
    </div>
  )
}