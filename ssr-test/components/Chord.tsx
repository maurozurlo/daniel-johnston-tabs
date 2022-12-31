import React from 'react'

const Chord: React.FC = ({
    children
}) => {
  return (
    <span className="font-bold text-red-600">{children}</span>
  )
}