import React from 'react'

import '@r3vl/widget/dist/style.css'

import { R3vlWidget } from '@r3vl/widget'

const Widget = () => {
  return (
    <div className="mx-auto my-24 w-[900px]">
      <R3vlWidget reactLibrary={React} />
    </div>
  )
}

export default Widget
