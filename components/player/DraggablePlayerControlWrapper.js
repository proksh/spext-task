import React from 'react'
import Draggable from 'react-draggable';

export default function DraggablePlayerControlWrapper({ children }) {
  return (
    <Draggable bounds={{ top: 0, left: -510, right: 0, bottom: 0 }} axis="x" handle="strong">
      <div className="player-control-wrapper no-cursor bg-white pt-32 pb-48 pr-72 pl-56 relative rounded-r-40 shadow-reg3">
        {children}
        <strong className="cursor flex absolute w-28 right-0 top-0 bottom-0 items-center justify-center cursor-ew-resize" >
          <div className="bg-brandLight w-4 h-56 rounded-full" />
        </strong>
      </div>
    </Draggable>
  )
}
