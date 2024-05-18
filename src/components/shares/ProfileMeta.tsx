'user client'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    imgUrl: string,
    title: string,
    link: string
}
const ProfileMeta = ({ imgUrl, title, link }:Props) => {
  return (
    <Link href={link} className='flex flex-row gap-1'>
        <Image
            src={imgUrl}
            width={18}
            height={18}
            alt={title}
            className='object-contain'
        />
         <p className={`font-inter text-base font-medium ${link !== '' ? 'text-blue-500' : 'text-light500_dark400'}`}>{title}</p>
    </Link>
  )
}

export default ProfileMeta
