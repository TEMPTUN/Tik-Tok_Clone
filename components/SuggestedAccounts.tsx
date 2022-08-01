import React from 'react'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../store/authStore'
import { IUser } from '../types'



const SuggestedAccounts = () => {
  const { fetchAllUsers,allUsers } =useAuthStore();

  useEffect(()=>{
    fetchAllUsers();
  },[fetchAllUsers])
  const users=allUsers
  .sort(()=>0.5 - Math.random())
  .slice(0,allUsers.length);

  return (
    <div className='xl:border-b-2 border-purple-400 pb-4'>
      <p className='text-purple-800 font-semibold m-3 mt-4 hidden xl:block'>Suggested Accounts</p>

      <div>
        {users.slice(0,6).map((user:IUser)=>(
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className='flex gap-3 hover:bg-purple-100 p-2 cursor-pointer font-semibold rounded'>
                <div className='w-8 h-8'>
                    <Image
                      src={user.image}
                      width={34}
                      height={34}
                      className="rounded-full"
                      alt="user profile"
                      layout="responsive"
                    />
                </div>

                <div className='hidden xl:block'>
                  <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                    {user.userName.replaceAll(' ','')}
                    <GoVerified className='text-purple-400'/>
                  </p>
                  <p className='capitalize'>
                    {user.userName}
                  </p>
                </div>
            </div>
          </Link>
        ))}
    </div>
  </div>

  )
}

export default SuggestedAccounts