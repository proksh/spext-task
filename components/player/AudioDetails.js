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
    <div className="audio-detail pos-relative d-flex bg-white r-40 p-48 shadow-reg5 zindex-1">
      <div className="col-12">
        <div className="pr-8">
          <div className="bg-black p-10 r-26 bg-grayLight shadow-neo2 image-wrapper">
            <div className="pos-relative pb-100 bg-purple r-20 overflow-hidden shadow-brand4 image">
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
      <div className="col-10">
        <div className="pl-16  d-flex flex-column justify-content-between h-100">
          <p className="color-grayText fs-caption text-shadow pt-10">Now playing</p>
          <div>
            <p className="color-dark fs-subtitle fw-900 mb-6 truncate">{currentAudio.title}</p>
            <p className="color-medium fs-body fw-500 mb-6">{currentAudio.artist}</p>
            <p className="color-light fs-caption">{currentAudio.album}</p>
          </div>
          <div className="d-flex pb-10">
            <button
              data-tip="Like"
              onClick={onLikeClick}
              className="h-32 w-32 bg-grayLight shadow-neo2 hover-shadow-neo2 r-circle mr-16 d-flex align-items-center justify-content-center"
            >
              {userData?.likedAudios?.includes(currentAudio) ?
                <Image width="20px" height="20px" src="/icons/heart-fill.svg" alt="Liked this audio" className="w-20" /> :
                <Image width="20px" height="20px" src="/icons/heart-line.svg" alt="Like" className="w-20" />
              }
            </button>
            <button
              data-tip="Add to playlist"
              className="h-32 w-32 bg-grayLight shadow-neo2 hover-shadow-neo2 r-circle mr-16 d-flex align-items-center justify-content-center"
            >
              <Image width="20px" height="20px" src="/icons/add-to-playlist.svg" alt="Add to playlist" className="w-20" />
            </button>
            <button
              data-tip="Share"
              className="h-32 w-32 bg-grayLight shadow-neo2 hover-shadow-neo2 r-circle d-flex align-items-center justify-content-center"
            >
              <Image width="20px" height="20px" src="/icons/share.svg" alt="Share" className="w-20" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
