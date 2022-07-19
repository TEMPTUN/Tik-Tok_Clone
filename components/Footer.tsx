import React from 'react'
import { footerList1, footerList2, footerList3 } from '../utils/constants'
//below is the typescript syntax to declare the type of items and mt
const List=({items,mt}: {items:string[],mt:boolean})=>(
  <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
    {items.map((item:string)=>(
      <p key={item} className='text-gray-400 text-sm hover:text-purple-800 underline cursor-pointer'>
        {item}
      </p>
    ))}
  </div>
)

const Footer = () => {
  return (
    <div className='mt-6 hidden xl:block'>
      <List items={footerList1} mt={false}/>
      <List items={footerList2} mt/>
      <List items={footerList3} mt/>
    </div>
  )
}

export default Footer