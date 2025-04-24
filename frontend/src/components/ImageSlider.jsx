

import React from 'react'

const ImageSlider = ({data}) => {
  return (
    <div className='flex overflow-x-scroll gap-2 my-2 relative'>
        {data?.articles?.length>0 && data?.articles?.map((eachItem,index)=>{
            return <img key={index} src={eachItem?.urlToImage} alt={eachItem.author} className='w-[240px] h-[160px] object-cover rounded-md cursor-pointer'/>
        })}
    </div>
  )
}

export default ImageSlider