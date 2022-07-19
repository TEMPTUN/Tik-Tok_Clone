import React, { useEffect, useState } from 'react'
import { MdFavorite } from 'react-icons/md'
import useAuthStore from '../store/authStore'


interface IProps{
    handlelike:()=> void,
    handleDislike:()=> void,
    likes:any[]
}

const LikeButton = ({ likes,handlelike,handleDislike }:IProps) => {
    const [alreadyLiked, setalreadyLiked] = useState(false)
    const { userProfile }:any = useAuthStore()
    const filterLikes=likes?.filter((item)=> item._ref === userProfile?._id)

    useEffect(()=>{
        if(filterLikes?.length > 0){
            setalreadyLiked(true);
        }else{
            setalreadyLiked(false);
        }
    },[likes])
     const likeface="👍"


  return (
    <div className='flex gap-6'>
        <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'> 
        {alreadyLiked ? (
            <div className='bg-primary rounded-full p-2 md:p-4 text-purple-700' onClick={handleDislike}>
                <MdFavorite className='text-lg md:text-2xl'/>
            </div>
        ):(
            <div className='bg-primary rounded-full p-2 md:p-4' onClick={handlelike}>
                <MdFavorite className='text-lg md:text-2xl'/>
            </div>
        )}
        <p className='text-md font-semibold'>{likes?.length? likeface:" "}</p>
        </div>
    </div>
  )
}

export default LikeButton