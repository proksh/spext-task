import React from 'react'
import Draggable from 'react-draggable';

export default function DraggablePlayerControlWrapper({ children }) {
  return (
    <Draggable bounds={{ top: 0, left: -510, right: 0, bottom: 0 }} axis="x" handle="strong">
      <div className="relative sm:fixed xl:relative player-control-wrapper no-cursor sm:bg-white p-24 xl:pt-32 xl:pb-48 xl:pr-72 xl:pl-56 xl:rounded-r-40 sm:shadow-reg3 bottom-0 left-0 right-0 z-20 xl:z-0">
        {children}
        <strong className="cursor hidden xl:flex absolute w-28 right-0 top-0 bottom-0 items-center justify-center cursor-ew-resize" >
          <div className="bg-brandLight w-4 h-56 rounded-full" />
        </strong>
      </div>
    </Draggable>
  )
}
