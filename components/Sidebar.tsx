import React,{useState} from 'react'
import Link from 'next/link'
import { AiFillHome,AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
//now we wnat a button to show and hide sidebar for that we use state
import Discover from './Discover'
import SuggestedAccounts from './SuggestedAccounts'
import Footer from './Footer'


const Sidebar = () => {
  const [showSidebar,setshowSidebar] =useState(true)
  const normalLink ='flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded'
  const userProfile=false; 

  return (
    <div>
      <div className='block xl:hidden m-2 ml-4 mt-3 text-xl'
      onClick={()=> setshowSidebar((prev) => !prev)}> {/*it use to hide sidebar for desktop show only in mobile devices*/}
        { showSidebar ? <ImCancelCircle/>:<AiOutlineMenu/> }
      </div>
      {showSidebar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-purple-200 xl:border-0'>
          <div className='xl:border-b-2 border-purple-300 xl:pb-4'> 
            <Link href="/">
              <div className={normalLink}>
                <p className='text-2xl text-purple-900'><AiFillHome/></p>
                  <span className='text-xl hidden xl:block text-purple-700'>
                    For You
                  </span>
              </div>
            </Link>
          </div>
          <Discover/>
          <SuggestedAccounts/>
          <Footer/>
        </div>
      )}
    </div>
  )
}

export default Sidebar