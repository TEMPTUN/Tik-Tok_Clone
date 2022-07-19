import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import Logo from '../utils/tiktik-logo.png'
import { GoogleLogin,googleLogout } from '@react-oauth/google'
import { createOrGetUser } from '../utils'
import useAuthStore from '../store/authStore'



const Navbar = () => {
  const router=useRouter();
  const { userProfile,addUser,removeUser }:any =useAuthStore()
  const [searchValue, setsearchValue] = useState('')
  const handleSearch =(e:{ preventDefault:()=>void })=>{
    //stops to render whole page
    e.preventDefault()
    if(searchValue){
      router.push(`/search/${searchValue}`)
    }
  }


  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
        <Link href='/'>
            <div className='w-[100px] md:w-[130px]'>
                <Image
                    className='cursor-pointer'
                    src={Logo}
                    alt="Tiki"
                    layout="responsive"
                />
            </div>
        </Link>

        <div className='relative hidden md:block'>
          <form 
            className='absolute md:static top-10 left-10 bg-white'
            onSubmit={handleSearch}
          >
            <input
              className='bg-grey-300 p-3 md:text-md font-medium border-2 border-purple-200 focus:outline-none focus:border-2 focus:border-purple-400 w-[300px] md:w-[350px] rounded-full md:top-0' 
              type="text"
              value={searchValue}
              onChange={(e)=>setsearchValue(e.target.value)}
              placeholder="Search accounts and videos"
            />
            <button
              onClick={handleSearch}
              className="absolute md:right-5 right-6 top-4 border-l-2 border-purple-400 pl-4 text-2xl text-purple-500"
            >
              <BiSearch/>
            </button>
          </form>
        </div>

        <div>
          {
            userProfile ?(
              <>
            <div className='flex gap-5 md:gap-10'>
              <>
                  <Link href="/Upload">
                    <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                      <IoMdAdd className='text-xl'/>{' '}
                      <span className='hidden md:block'>Upload</span>
                    </button>
                  </Link>
                  {userProfile.image && (
                  <Link href="/">
                      <Image 
                          width={40}
                          height={40}
                          className="rounded-full cursor-pointer"
                          src={userProfile.image}
                          alt="profile Photo"
                      />
                  </Link>
                )}
                <button type='button' className='px-2' 
                onClick={()=>{
                  googleLogout()
                  removeUser()
                }}>
                  <AiOutlineLogout color='purple' fontSize={21}/>
                </button>
              </>
            </div>
            {/*here added unhandled into next config.js*/}
            
            </>
            ):(
              <GoogleLogin
                onSuccess={(response)=> createOrGetUser(response,addUser)}
                onError={()=> console.log('Error')}
              />
            )        
          }
        </div>
    </div>
  )
}

export default Navbar