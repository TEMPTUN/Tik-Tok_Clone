import React from 'react'
import axios from 'axios'
import { useState } from "react";
import Image from 'next/image'
import { GoVerified } from "react-icons/go";
import Link from 'next/link';
import { useRouter } from 'next/router';
import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser,Video } from '../../types';
import useAuthStore from '../../store/authStore';

const Search = ({ video }:{ video:Video[] }) => {
    const [isAccounts, setisAccounts] = useState(false)
    const router = useRouter();
    //It will give use typed in search by router
    const { searchTerm }:any =router.query;
    const { allUsers }:{ allUsers:IUser[] }=useAuthStore();

    const accounts = isAccounts ? 'border-b-2 border-purple-400':'text-grey-800'
    const isVideos = !isAccounts ? 'border-b-2 border-purple-400':'text-grey-800'

    const searchedAccounts = allUsers?.filter((user: IUser) => user.userName.includes(searchTerm))
    
  return (
    <div className='w-full'>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-purple-100 bg-white w-full">
                    <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
                    onClick={()=> setisAccounts(true)}
                    >Accounts</p>
                    <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
                    onClick={()=>setisAccounts(false)}
                    >Videos</p>
        </div>
        {isAccounts ? (
            <div>
                {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link key={idx} href={`/profile/${user._id}`}>
                <div className=' flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                  <div>
                    <Image width={50} height={50} className='rounded-full' alt='user-profile' src={user.image}/>
                  </div>
                  <div>
                    <div>
                      <p className='flex gap-1 items-center text-lg font-bold text-primary'>
                        {user.userName} <GoVerified className='text-blue-400' />
                      </p>
                      <p className='capitalize text-gray-400 text-sm'>
                        {user.userName}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No Account Results for ${searchTerm}`} />
          )}
            </div>
        ): (
            <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start '>
                {video.length ? (
                    video.map((post: Video, idx: number) => (
                    <VideoCard post={post} key={idx} />
                    ))
                ) : (
                    <NoResults text={`No Video Results for ${searchTerm}`} />
                )}
        </div>
        )}
    </div>
  )
}

export const getServerSideProps = async ({
    params:{ searchTerm },
}:{
    params: { searchTerm: string }
}) =>{
    const { data } = await axios.get(`http://localhost:3000/api/search/${searchTerm}`)

    return {
        props:{ video:data },
    }
}


export default Search