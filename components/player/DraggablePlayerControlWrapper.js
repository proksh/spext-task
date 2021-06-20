import React from 'react'
import Draggable from 'react-draggable';

export default function DraggablePlayerControlWrapper({ children }) {
  return (
    <Draggable bounds={{ top: 0, left: -510, right: 0, bottom: 0 }} axis="x" handle="strong">
      <div className="no-cursor bg-white pt-32 pb-48 pr-72 pl-56 player-control-wrapper pos-relative shadow-reg3">
        {children}
        <strong className="cursor d-flex pos-absolute w-28 right-0 top-0 bottom-0 align-items-center justify-content-center cursor-ew-resize" >
          <div className="bg-gray bg-brandLight w-4 h-56 r-circle" />
        </strong>
      </div>
    </Draggable>
  )
}
