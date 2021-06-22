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
    <div className="player-control flex flex-col">
      {/* Audio player */}
      <audio ref={audioRef} onTimeUpdate={updateTime} onLoadedMetadata={updateTime} onEnded={onNextClick}>
        <source src={source || undefined} type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>

      {/* Button controls */}
      <div className="flex items-center justify-center mb-40 order-2 sm:order-1">
        {/* Left side */}
        <div className="flex">
          <button
            data-tip="Shuffle"
            onClick={() => setUserData({ ...userData, shuffle: !userData.shuffle })}
            className="h-32 w-32 flex items-center justify-center rounded-full bg-white hover:bg-grayLight transition-shadow hover:shadow-neo1 sm:mr-16"
          >
            {userData.shuffle ?
              <Image width="24px" height="24px" unoptimized={true} src="/icons/shuffle-selected.svg" className="w-24" alt="Shuffle Selected" /> :
              <Image width="24px" height="24px" unoptimized={true} src="/icons/shuffle.svg" className="w-24" alt="Shuffle" />
            }
          </button>
          <button
            data-tip="Repeat"
            onClick={onRepeatClick}
            className="h-32 w-32 hidden sm:flex items-center justify-center rounded-full bg-white hover:bg-grayLight transition-shadow hover:shadow-neo1"
          >
            <Image width="24px" height="24px" unoptimized={true} src={userData.repeat ? `/icons/repeat-${userData.repeat}.svg` : undefined} className="w-24" alt="Repeat one song" />
          </button>
        </div>
        {/* Main Buttons */}
        <div className="flex items-center mx-48 sm:mx-56">
          <button
            onClick={onNextBack}
            className="primary-btn flex bg-grayLight items-center justify-center rounded-full p-6"
            disabled={userData.repeat === 'notselected' && (audioIndex === 0)}
          >
            <div className="h-28 w-28 rounded-full inner">
              <Image width="20px" height="20px" unoptimized={true} src="/icons/left.svg" className="w-20" alt="Previous Audio" />
            </div>
          </button>
          <button
            onClick={() => toggleAudioPlay(!isPlaying)}
            className="primary-btn flex bg-grayLight items-center justify-center rounded-full p-10 mx-16 xl:mx-24"
          >
            <div className="h-48 w-48 rounded-full inner">
              {isPlaying ?
                <Image width="20px" height="20px" unoptimized={true} src="/icons/pause.svg" className="w-20" alt="Pause Audio" /> :
                <Image width="20px" height="20px" unoptimized={true} src="/icons/play.svg" className="w-20" alt="Play Audio" />
              }
            </div>
          </button>
          <button
            onClick={onNextClick}
            className="primary-btn flex bg-grayLight items-center justify-center rounded-full p-6"
            disabled={userData.repeat === 'notselected' && (audioIndex === audioList.length - 1)}
          >
            <div className="h-28 w-28 rounded-full inner">
              <Image width="20px" height="20px" unoptimized={true} src="/icons/right.svg" className="w-20" alt="Next Audio" />
            </div>
          </button>
        </div>
        {/* Right side */}
        <div className="flex">
          <button
            data-tip="Repeat"
            onClick={onRepeatClick}
            className="h-32 w-32 flex items-center justify-center rounded-full bg-white hover:bg-grayLight transition-shadow hover:shadow-neo1 sm:mr-16"
          >
            <Image width="24px" height="24px" unoptimized={true} src={userData.repeat ? `/icons/repeat-${userData.repeat}.svg` : undefined} className="w-24" alt="Repeat one song" />
          </button>
          <button
            data-tip="Customize"
            className="h-32 w-32 hidden sm:flex items-center justify-center rounded-full bg-white hover:bg-grayLight transition-shadow hover:shadow-neo1"
          >
            <Image width="24px" height="24px" unoptimized={true} src="/icons/customize.svg" className="w-24" alt="Customize voice" />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="order-1">
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
        <div className="flex justify-between pt-12">
          <p className="text-caption text-medium">
            {moment.utc(timeData.currentTime * 1000).format('mm:ss')}
          </p>
          <p className="text-caption text-medium text-right">
            {timeData.totalTime > 0 ? moment.utc(timeData.totalTime * 1000).format('mm:ss') : "00:00"}
          </p>
        </div>
      </div>
    </div>
  )
}