import { getUserInfoByClerkId } from '@/backend/controllers/user.controller'
import StatsCard from '@/components/cards/StatsCard'
import ProfileMeta from '@/components/shares/ProfileMeta'
import { Button } from '@/components/ui/button'
import { convertToMonthYear } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import QuestionTab from '@/components/shares/QuestionTab'
import AnswerTab from '@/components/shares/AnswerTab'

type Props = {
  params: {id: string},
  searchParams:{ [key:string]:string }
}

const Page = async ({ params, searchParams }:Props) => {
  const { user, totalUserQuestion, totalUserAnswer } = await getUserInfoByClerkId({ clerkId: params.id })
  return (
    <div>
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-1 flex-row flex-wrap gap-4">
          <div className='size-[140px] overflow-hidden rounded-full border border-primary-500'>
            <Image
              src={user.picture}
              width={140}
              height={140}
              alt="user"
              className='object-cover'
            />
          </div>
          <div className="flex flex-1 flex-col justify-start">
            <h1 className="text-light900_dark100 mb-4 font-inter text-3xl font-bold">{user.name}</h1>
            <p className="text-light500_dark400 mb-4 font-inter text-base font-medium">@{user.username}</p>
            <div className="mb-6 flex flex-row flex-wrap gap-4">
              { user.portfolioWebsite &&
                <ProfileMeta
                  imgUrl='/assets/icons/link.svg'
                  title={user.username}
                  link={user.portfolioWebsite}
                />
              }
              { user.location &&
                <ProfileMeta
                  imgUrl='/assets/icons/location.svg'
                  title={user.location}
                  link=''
                />
              }
              <ProfileMeta
                imgUrl='/assets/icons/calendar.svg'
                title={convertToMonthYear(user.joinedAt)}
                link=''
              />
            </div>
            {
              user.bio && (<p className="text-light500_dark400 mb-4 w-full font-inter text-base font-medium">
                {user.bio}
              </p>)
            }
          </div>
        </div>
        <Link href='/profile/edit' className='ms-auto'>
          <Button className="background-light800_dark300 text-light500_dark400 hover-light700_dark400 max-w-[200px] px-8 py-6 font-inter text-base font-medium shadow">
              Edit Profile
          </Button>
        </Link>
      </div>
      <div className="mt-10 flex flex-col">
        <h4 className="text-light900_dark100 mb-4 font-inter text-xl font-semibold">Stats</h4>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <div className='border-light700_dark400 flex flex-row justify-between gap-4 rounded-md border p-4 shadow-light-100 dark:shadow-dark-100'>
              <div className="flex flex-col">
                <p className={'text-light800_dark200 font-inter text-base font-semibold'}>{totalUserQuestion}</p>
                <p className={'text-light800_dark200 font-inter text-sm font-medium'}>Questions</p>
              </div>

              <div className="flex flex-col">
                <p className={'text-light800_dark200 font-inter text-base font-semibold'}>{totalUserAnswer}</p>
                <p className={'text-light800_dark200 font-inter text-sm font-medium'}>Answer</p>
              </div>
            </div>
            <StatsCard
            imgUrl='/assets/icons/gold-medal.svg'
            value={0}
            title='Gold Badges'
            />
            <StatsCard
            imgUrl='/assets/icons/silver-medal.svg'
            value={0}
            title='Silver Badges'
            />
            <StatsCard
            imgUrl='/assets/icons/bronze-medal.svg'
            value={0}
            title='Bronze Badges'
            />
          </div>

      </div>
      <div className="mt-10">
        <Tabs defaultValue="question" className="w-full">
          <TabsList className='mb-4'>
            <TabsTrigger value="question">Question</TabsTrigger>
            <TabsTrigger value="answer">Answer</TabsTrigger>
          </TabsList>
          <TabsContent value="question">
            <QuestionTab
              userId={ JSON.stringify(user._id) }
              searchParams={ searchParams }
              clerkId={ JSON.stringify(user.clerkId) }
            />
          </TabsContent>
          <TabsContent value="answer">
             <AnswerTab
                userId={ JSON.stringify(user._id) }
                searchParams={ searchParams }
                clerkId={ JSON.stringify(user.clerkId) }
             />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Page
