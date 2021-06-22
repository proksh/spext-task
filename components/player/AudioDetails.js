import _ from 'lodash'
import React from 'react'
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
    <div className="audio-detail grid grid-cols-12 sm:grid-cols-22 relative sm:bg-white rounded-40 px-24 pt-24 pb-12 sm:p-32 lg:p-40 xl:p-48 sm:shadow-reg5 z-10 w-full">
      {/* Mobile topbar */}
      <div className="col-span-12 flex sm:hidden justify-between items-center mb-24 relative z-10">
        <p className="text-medium text-body text-bold text-shadow pt-10">Now playing</p>
        <div className="flex items-center justify-between">
          <button
            data-tip="Add to playlist"
            className="h-32 w-32 rounded-full mr-16 flex items-center justify-center"
          >
            <Image width="24px" height="24px" unoptimized={true} src="/icons/add-to-playlist.svg" alt="Add to playlist" className="w-24" />
          </button>
          <button
            data-tip="Share"
            className="h-32 w-32 rounded-full flex items-center justify-center"
          >
            <Image width="24px" height="24px" unoptimized={true} src="/icons/share.svg" alt="Share" className="w-24" />
          </button>
        </div>
      </div>
      {/* Cover */}
      <div className="col-span-12">
        <div className="sm:pr-8">
          <div className="bg-black p-10 rounded-26 bg-grayLight shadow-neo2 image-wrapper">
            <div className="relative pb-full bg-purple rounded-20 overflow-hidden shadow-brand4 image">
              <Image
                className="rounded-20"
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
      <div className="col-span-12 sm:col-span-10">
        <div className="pt-32 sm:pt-0 sm:pl-16 flex flex-row sm:flex-col justify-between h-full">
          <p className="hidden sm:block text-gray text-caption text-shadow pt-10">Now playing</p>
          <div>
            <p className="text-dark text-subtitle font-black mb-4 truncate">{currentAudio.title}</p>
            <p className="text-medium text-body font-medium mb-4">{currentAudio.artist}</p>
            <p className="text-light text-caption">{currentAudio.album}</p>
          </div>
          <div className="flex pb-10">
            <button
              data-tip="Like"
              onClick={onLikeClick}
              className="h-32 w-32 bg-grayLight rounded-full sm:mr-16 flex items-center justify-center shadow-neo2 transition-shadow hover:shadow-neo1"
            >
              {userData?.likedAudios?.includes(currentAudio) ?
                <Image width="20px" height="20px" unoptimized={true} src="/icons/heart-fill.svg" alt="Liked this audio" className="w-20" /> :
                <Image width="20px" height="20px" unoptimized={true} src="/icons/heart-line.svg" alt="Like" className="w-20" />
              }
            </button>
            <button
              data-tip="Add to playlist"
              className="h-32 w-32 bg-grayLight rounded-full mr-16 hidden sm:flex items-center justify-center shadow-neo2 transition-shadow hover:shadow-neo1"
            >
              <Image width="20px" height="20px" unoptimized={true} src="/icons/add-to-playlist.svg" alt="Add to playlist" className="w-20" />
            </button>
            <button
              data-tip="Share"
              className="h-32 w-32 bg-grayLight rounded-full hidden sm:flex items-center justify-center shadow-neo2 transition-shadow hover:shadow-neo1"
            >
              <Image width="20px" height="20px" unoptimized={true} src="/icons/share.svg" alt="Share" className="w-20" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
