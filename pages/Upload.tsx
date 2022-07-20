import React,{ useState,useEffect } from 'react'
import { useRouter } from 'next/router'//It will be use to route back to home page
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import useAuthStore from '../store/authStore'
import { client } from '../utils/client'
import { SanityAssetDocument } from '@sanity/client'
import { topics } from '../utils/constants'
import { userLikedPostsQuery } from '../utils/queries'
import { BASE_URL } from '../utils'


//<> to define type

const Upload = () => {
    const [isLoading, setisLoading] = useState(false)
    const [videoasset, setvideoasset] = useState<SanityAssetDocument | undefined>()
    const [WrongFileType, setWrongFileType] = useState(false)
    const [Caption, setCaption] = useState(' ')
    const [Category, setCategory] = useState(topics[0].name)
    const [savingPost, setsavingPost] = useState(false)
    const { userProfile }:{userProfile:any} =useAuthStore()
    const router=useRouter()

    const handlePost = async () => {
        if (Caption && videoasset?._id && Category) {
          setsavingPost(true);
    
          const doc = {
            _type: 'post',
            Caption,
            video: {
              _type: 'file',
              asset: {
                _type: 'reference',
                _ref: videoasset?._id,
              },
            },
            userId: userProfile?._id,
            postedBy: {
              _type: 'postedBy',
              _ref: userProfile?._id,
            },
            Category,
          };
    
          await axios.post(`${BASE_URL}/api/post`, doc);
            
          router.push('/');
        }
      };



    const uploadVideo = async(e:any)=>{
        const selectedFile =e.target.files[0]
        console.log(selectedFile)
        const fileTypes = ['video/mp4','video/webm','video/ogg']
        if(fileTypes.includes(selectedFile.type)){
            //using sanity
            client.assets.upload('file',selectedFile,{
                contentType:selectedFile.type,
                filename:selectedFile.name
            })
            .then((data)=>{
                setvideoasset(data)
                setisLoading(false)
            })
        }else{
            setisLoading(false)
            setWrongFileType(true)
        }
    }


  return (
    <div className=' flex w-full h-full absolute left-0 top-[50px] lg:top-[70px] pt-10 lg:pt-20 bg-white justify-center'>
      <div className=' bg-white rounded-lg xl:h-[90vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6'>
        <div>
          <div>
          <p className='text-2xl font-bold'>Upload Video</p>
            <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
          </div>
          <div className=' border-dashed rounded-xl border-4 border-lime-200 flex flex-col justify-center items-center  outline-none mt-10 w-[260px] h-[458px] p-10 cursor-pointer hover:border-lime-300 hover:bg-yellow-100'>
            {isLoading ? (
              <p className='text-center text-3xl text-red-400 font-semibold'>
                Uploading...
              </p>
            ) :(
                        <div>
                            {videoasset ? (
                                <div className=' rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center'>
                                    <video
                                        src={videoasset?.url}//so that if exist otherwise not in begining
                                        loop
                                        controls
                                        className='rounded-xl h-[450px] mt-16 bg-black'
                                    />
                                
                                    
                                </div>
                            ):(
                                <label className='cursor-pointer'>
                                    <div className='flex flex-col items-center justify-center h-full'>
                                        <div className='flex flex-col items-center justify-center'>
                                            <p className='font-bold text-xl'><FaCloudUploadAlt
                                            className='text-lime-200 text-6xl'/></p>
                                            <p className='text-xl font-semibold'>
                                                Upload Video
                                            </p>
                                        </div>
                                        <p className='text-lime-700 text-center mt-10 text-sm loading-10'>
                                            Mp4 or WebM or ogg <br/>
                                            720x1280 or higher <br/>
                                            Up to 10 minutes <br/>
                                            Less than 2GB
                                        </p>
                                        <p className='text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none bg-lime-600'>
                                            Select File
                                        </p>
                                    </div>
                                    <input
                                        type="file"//with this we provide filesystem so to upload content
                                        name="upload-video"
                                        onChange={uploadVideo}
                                        className="w-0 h-0"
                                    />
                                </label>
                            )}
                        </div>
                    )}
                    {WrongFileType && (
                        <p className='text-center text-xl text-lime-700 font-semibold mt-4 w-[250px]'>
                            Invalid Format
                        </p>
                    )}
                </div>
            </div>
                <div className='flex flex-col gap-3 pb-10'>
                        <label className='text-md font-medium'>
                             Caption
                        </label>
                        <input
                            type="text"
                            value={Caption}
                            onChange={(e)=> setCaption(e.target.value)}
                            className="rounded outline-none text-md border-2 border-gra-200 p-2"
                        />
                        <label className='text-md font-medium'>Choose a Category</label>
                        <select
                            onChange={(e)=>setCategory(e.target.value)}
                            className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                        >
                            <>
                            {topics.map((topic)=>(
                                <option
                                    key={topic.name}
                                    className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                                    value={topic.name}
                                >
                                    {topic.name}
                                </option>
                            ))}
                            </>
                        </select>
                        <div className='flex gap-6 mt-10 '>
                            <button 
                                type="button"
                                className=' hover:bg-[#a9a9a9] border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                                onClick={()=>{}}
                            >
                                Discard
                            </button>
                            <button 
                                type="button"
                                className='hover:bg-[#ffdab9] bg-[#ffa07a] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                                onClick={handlePost}
                            >
                                Post
                            </button>
                        </div>
                </div>
        </div>
    </div>
  )
}

export default Upload