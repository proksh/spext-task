import _ from 'lodash'
import React, { useState } from 'react'
import Image from "next/image";

export default function AudioDetails({ currentAudio, userData, setUserData }) {

  // Check if already in like, remove it. Else add to liked songs
  const onLikeClick = () => {
    let newUserData = { ...userData };

    if (_.findIndex(userData.likedAudios, ['title', currentAudio.title]) > -1) {
      newUserData.likedAudios = _.remove(userData.likedAudios, (n) => { return n != currentAudio });
    } else {
      newUserData.likedAudios = _.concat(userData.likedAudios, currentAudio);
    }

    setUserData(newUserData);
  }

  return (
    <div className="audio-detail grid grid-cols-22 relative bg-white rounded-40 p-48 shadow-reg5 z-10">
      <div className="col-span-12">
        <div className="pr-8">
          <div className="bg-black p-10 rounded-26 bg-grayLight shadow-neo2 image-wrapper">
            <div className="relative pb-full bg-purple rounded-20 overflow-hidden shadow-brand4 image">
              <Image
                layout="fill"
                src={currentAudio.image || undefined}
                alt="Album Cover"
                placeholder="blur"
                blurDataURL={currentAudio.smallImage}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-10">
        <div className="pl-16 flex flex-col justify-between h-full">
          <p className="text-gray text-caption text-shadow pt-10">Now playing</p>
          <div>
            <p className="text-dark text-subtitle font-black mb-4 truncate">{currentAudio.title}</p>
            <p className="text-medium text-body font-medium mb-4">{currentAudio.artist}</p>
            <p className="text-light text-caption">{currentAudio.album}</p>
          </div>
          <div className="flex pb-10">
            <button
              data-tip="Like"
              onClick={onLikeClick}
              className="h-32 w-32 bg-grayLight rounded-full mr-16 flex items-center justify-center shadow-neo2 transition-all hover:shadow-neo1 focus:shadow-neo1"
            >
              {userData?.likedAudios?.includes(currentAudio) ?
                <Image width="20px" height="20px" src="/icons/heart-fill.svg" alt="Liked this audio" className="w-20" /> :
                <Image width="20px" height="20px" src="/icons/heart-line.svg" alt="Like" className="w-20" />
              }
            </button>
            <button
              data-tip="Add to playlist"
              className="h-32 w-32 bg-grayLight rounded-full mr-16 flex items-center justify-center shadow-neo2 transition-all hover:shadow-neo1 focus:shadow-neo1"
            >
              <Image width="20px" height="20px" src="/icons/add-to-playlist.svg" alt="Add to playlist" className="w-20" />
            </button>
            <button
              data-tip="Share"
              className="h-32 w-32 bg-grayLight rounded-full flex items-center justify-center shadow-neo2 transition-all hover:shadow-neo1 focus:shadow-neo1"
            >
              <Image width="20px" height="20px" src="/icons/share.svg" alt="Share" className="w-20" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
