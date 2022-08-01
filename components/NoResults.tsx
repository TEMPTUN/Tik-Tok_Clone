import React from 'react'
import { MdOutlineVideocamOff } from 'react-icons/md'
import { BiCommentX } from 'react-icons/bi'

interface IProps{
    text:string
}

const NoResults= ({ text }:IProps) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-8xl text-center'>
        {text === "No comments yet!" ? <><BiCommentX/> <p className='text-sm'>No comments yet!</p></>: <><MdOutlineVideocamOff /> <p className='text-xl'>Nothin! Got</p></>}
      </p>
    </div>
  )
}

export default NoResults