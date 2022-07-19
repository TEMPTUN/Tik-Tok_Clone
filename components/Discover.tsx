import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { topics } from '../utils/constants'

const Discover = () => {

    const topicStyle="xl:border-2 hover:bg-purple-200 xl:border-purple-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black"
    const activeTopicStyle="xl:border-2 hover:bg-purple-700 xl:border-[#bf00ff] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black-800"
    const router=useRouter();
    const { topic }=router.query;

  return (
    <div className='xl:border-b-2 xl:border-purple-300 pb-6'>
        <p className='text-purple-800 font-semibold m-3 mt-4 hidden xl:block'>
            Popular Topics
        </p>
        <div className='flex gap-3 flex-wrap'>
            {topics?.map((item) => (
            <Link href={`/?topic=${item.name}`} key={item.name}>
                <div className={topic === item.name ? activeTopicStyle : topicStyle}>
                <span className='font-bold text-2xl xl:text-md '>
                    {item.icon}
                </span>
                <span className={`font-medium text-md hidden xl:block capitalize`}>
                    {item.name}
                </span>
                </div>
            </Link>
            ))}
        </div>
    </div>
  )
}

export default Discover