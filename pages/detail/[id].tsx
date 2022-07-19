import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';
import { Video } from '../../types';
import useAuthStore from '../../store/authStore';
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';
//with the help of zustand we know about use r currently logged in or not

interface IProps{
  postDetails:Video,
}



const Detail = ({ postDetails }:IProps) => {
  const [Post, setPost] = useState(postDetails)
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef=useRef<HTMLVideoElement>(null)
  const [isVideoMuted, setisVideoMuted] = useState(false)
  const router=useRouter()
  const { userProfile }:any=useAuthStore()
  const [comment, setComment] = useState('')
  const [isPostingComment, setisPostingComment] = useState(false)
  
  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };


  //added post so that if we change the video it will render it again
  useEffect(()=>{
    if(Post && videoRef?.current){
        videoRef.current.muted =isVideoMuted;
    }
},[isVideoMuted])


//to change data we use axios.put
const handlelike = async(like:boolean)=>{
  if(userProfile){
      const { data }=await axios.put(`http://localhost:3000/api/like`,{
          userId:userProfile._id,
          postId:Post._id,
          like
      })

      setPost({ ...Post,likes:data.likes })
  }
}

const addComment =async (e:{preventDefault: () => void})=>{
  e.preventDefault();

  if(userProfile && comment){
    setisPostingComment(true)

  const { data } = await axios.put(`http://localhost:3000/api/post/${Post._id}`,{
    userId:userProfile._id,
    comment,
  })

  
  setPost({ ...Post,comments:data.comments })
  setComment('')
  setisPostingComment(false)

  }
}

  if(!Post) return null;

  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap overflow-y-hidden overflow-x-hidden white-space-nowrap'>
      <div className='relative flex-2 w-[988px] lg:w-[750px] flex justify-center items-center bg-black bg-no-repeat bg-cover bg-center h-[100vh] '>
        <div className='absolute top-6 left-2 lg:left-6   flex gap-6 z-50'>
            <p className='cursor-pointer' onClick={()=>{router.back()}}>
              <MdOutlineCancel className='text-white text-[35px]'/>
            </p>
        </div>
        <div className='relative'>
          <div className='lg:h-[80vh] h-[60vh]'>
            <video
              ref={videoRef}
              onClick={onVideoClick}
              loop
              src={postDetails.video.asset.url}
              className="h-full cursor-pointer mt-9"
            >

            </video>
          </div>
          <div className='absolute left-[45%] top-[45%] cursor-pointer'>
            {!isPlaying && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className='text-white mt-0 text-6xl lg:text-8xl'/>
              </button>
            )}
        </div>
      </div>
      <div className='absolute bottom-2 lg:bottom-25 right-5 lg:right-10 cursor-pointer'>
      {isVideoMuted ? (
           <button onClick={()=> setisVideoMuted(false)}>
              <HiVolumeOff
                className='text-white text-2xl lg:text-4xl'
              />
          </button>
            ):(
          <button onClick={()=> setisVideoMuted(true)}>
            <HiVolumeUp
              className='text-white text-2xl lg:text-4xl'
            />
         </button>
            )} 
      </div>
    </div>
    <div className='relative overflow-scroll w-[1000px] md:w-[900px] lg:w-[700px]'>
      <div className='lg:mt-20 mt-10'>
        <Link href={`/profile/${Post.postedBy._id}`}>
          <div className='flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer'>
          <Image 
                            width={62}
                            height={62}
                            className="rounded-full"
                            src={Post.postedBy.image}
                            alt="profile Photo"
            />
            <div>
              <div className='text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center'>
                {Post.postedBy.userName.replace(/\s+/g, '')}{' '}
                  <GoVerified className='text-purple-800 text-xl' />
              </div>
                <p className='text-md'> {Post.postedBy.userName}</p>
              </div>                    
            </div>
        </Link>
        <div className='px-10'>
          <p className='px-10 text-lg text-gray-600'>{Post.caption}</p>
        </div>
        <div className='mt-10 px-10'>
            {userProfile && (
                <LikeButton
                likes={Post.likes}
                handlelike={()=> handlelike(true)}
                handleDislike={()=> handlelike(false)}
              />          
           )}
          </div>          
            <Comments
              comment={comment}
              setComment={setComment}
              addComment={addComment}
              comments={Post.comments}
              isPostingComment={isPostingComment}
            />
      </div>
    </div>
  </div>           
  )
}

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } =await axios.get((`http://localhost:3000/api/post/${id}`));

  return {
    props:{ postDetails:data }
  }

}


export default Detail