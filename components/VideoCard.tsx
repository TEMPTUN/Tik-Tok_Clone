import React, { useState,useRef, useEffect } from 'react'
import { Video } from '../types';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/Link';
import { HiVolumeUp,HiVolumeOff } from 'react-icons/hi';
import { BsPlay,BsFillPlayFill,BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../store/authStore'
import axios from 'axios'

//a different way

interface IProps{
    post:Video;
}

const VideoCard:NextPage<IProps> = ({ post: { caption, postedBy, video, _id, likes },post }) => {
    const [isHover, setisHover] = useState(false)
    const [playing,setPlaying] =useState(false)
    const [isVideoMuted, setisVideoMuted] = useState(false)
    const userProfile:any =useAuthStore();
    const videoRef=useRef<HTMLVideoElement>(null)//it is just like dom
    const playpress=()=>{
        if(playing){
            videoRef?.current?.pause() //here it gives error since we passed null to remove that use ? like i did then it will give error for not having property of pause and play but we do have and we jut define it by <HTMLVideoElement> with useRef
            setPlaying(false)
            // console.log("pause")
        }else{
            videoRef?.current?.play()
            setPlaying(true)
            // console.log("play")
        }
    }


    useEffect(()=>{
        if(videoRef?.current){
            videoRef.current.muted =isVideoMuted;
        }
    },[isVideoMuted])

   


  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
        <div>
            <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
                <div className='md:w-16 md:h-15 w-10 h-10'>
                    <Link href={`/profile/${post.postedBy._id}`}>
                    <>
                        <Image 
                            width={62}
                            height={62}
                            className="rounded-full"
                            src={post.postedBy.image}
                            alt="profile Photo"
                            layout='responsive'
                        />
                    </>
                    </Link>
                </div>
                <div>
                    <Link href={`/profile/${post.postedBy._id}`}>
                        <div className='flex items-center gap-2'>
                            <p className='flex gap-2 items-center md:text-md font-bold text-purple-500'> 
                                {post.postedBy.userName}
                                <GoVerified className='text-blue-800 text-md'/>
                            </p>
                            <p className=' capitalize font-medium text-xs text-purple-900'>{post.postedBy.userName}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>

         <div className='lg:ml-20 flex gap-4 relative'>
            <div 
                onMouseEnter={()=>{setisHover(true)}}
                onMouseLeave={()=>{setisHover(false)}}
                className="rounded-3xl">
                <Link href={`/detail/${_id}`}>
                    <video
                        loop
                        ref={videoRef}
                        className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-slate-600' 
                        src={post.video.asset.url}
                    >
                        
                    </video>
                </Link>
                {isHover && (
                    <div className='flex absolute bottom-6 cursor-progress left-8 md:left-14 lg:left-0 gap-10 lg:justify-between w-[100px] md:w-[50px] p-3'>
                        {playing ? (
                            <button
                                onClick={playpress}>
                                <BsFillPauseFill
                                className='text-gray-900 text-2xl lg:text-4xl'
                            />
                            </button>
                        ):(
                            <button onClick={playpress}>
                                <BsFillPlayFill
                                className='text-gray-900 text-2xl lg:text-4xl'
                            />
                            </button>
                        )}
                        {isVideoMuted ? (
                            <button onClick={()=> setisVideoMuted(false)}>
                                <HiVolumeOff
                                className='text-gray-900 text-2xl lg:text-4xl'
                            />
                            </button>
                        ):(
                            <button onClick={()=> setisVideoMuted(true)}>
                                <HiVolumeUp
                                className='text-gray-900 text-2xl lg:text-4xl'
                            />
                            </button>
                        )}
                    </div>
                )}
            </div>
         </div>
    </div>
  )
}

export default VideoCard