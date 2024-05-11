import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    metaLink:string,
    iconUrl : string,
    textSize : string,
    data : string,
    title : string,
    imageClass : string
}

const MetaTag = ({ metaLink, iconUrl, textSize, data, title, imageClass }:Props) => {
  if (metaLink !== '') {
    return (
        <Link href={ metaLink } className="flex flex-row flex-wrap items-center">
            <Image
                src={iconUrl || '/assets/icons/avatar.svg'}
                width={20}
                height={20}
                alt="user profile"
                className={imageClass}
            />
            &nbsp;
            <p className={`text-light900_dark300 font-inter ${textSize}`}>
            {data}
            <span className="text-light900_dark300 font-inter text-xs font-normal">
               {title}
            </span>
            </p>
        </Link>
    )
  }

  return (
    <div className="flex flex-row flex-wrap items-center">
        <Image
            src={iconUrl || '/assets/icons/avatar.svg'}
            width={20}
            height={20}
            alt="user profile"
            className={imageClass}
        />
        &nbsp;
        <p className={`text-light900_dark300 font-inter ${textSize}`}>
        {data}
        <span className="text-light900_dark300 font-inter text-xs font-normal">
           {title}
        </span>
        </p>
    </div>
  )
}

export default MetaTag
