/* eslint-disable camelcase */
import changeTimeToHumenRead from '@/lib/TimeFormat'
import { getSegmentedString } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    job_id: string,
    employer_name: string,
    employer_logo?: string,
    employer_website?: string,
    job_employment_type: string,
    job_title: string,
    job_description: string,
    job_apply_link?: string,
    job_posted_at_datetime_utc:string,
    job_city:string,
    job_state:string,
    job_country:string,
    job_max_salary: number,
    job_salary_currency:string,
    job_salary_period:string,
    flag: string,
}
const JobCard = (
  {
    job_id,
    employer_name,
    employer_logo,
    employer_website,
    job_employment_type,
    job_title,
    job_description,
    job_apply_link,
    job_posted_at_datetime_utc,
    job_city,
    job_state,
    job_country,
    job_max_salary,
    job_salary_currency,
    job_salary_period,
    flag
  }: Props
) => {
  return (
    <div className="border-light700_dark400 relative flex flex-row gap-4 rounded-md border px-6 py-3 shadow-light-100 dark:shadow-dark-100">
      <div className='min-h-full w-1/6 pt-8'>
        <Image
          src={employer_logo || '/assets/images/site-logo.svg'}
          width={100}
          height={100}
          alt={employer_name}
          className='object-cover'
        />
      </div>
      <div className="flex w-5/6 flex-col">
        <div className="mb-6 flex flex-row flex-wrap items-center justify-between">
          <h3 className="text-light900_dark300 w-fit py-2 font-inter text-xl font-bold">
            { job_title }
          </h3>
          <div className="background-light800_dark300 flex flex-row gap-2 px-4 py-2">
            <Image
              src={flag}
              width={30}
              height={30}
              alt='flag'
              className='object-contain'
            />
            <p className=" text-light500_dark400 font-inter text-base font-medium">
              {job_city ? job_city + ', ' : ''} {job_state ? job_state + ', ' : ''} {job_country}
            </p>
          </div>
          <div className="mt-2 flex w-full justify-start">
            <Link href={employer_website || 'https://www.roberthalf.com/'} target="_blank">
              <p className="background-light800_dark300 text-light500_dark400 w-fit font-inter text-sm font-normal">
                By <span className='font-medium'>{employer_name}</span>&nbsp;on {changeTimeToHumenRead(job_posted_at_datetime_utc)}
              </p>
            </Link>
          </div>
        </div>
        <p className="text-light900_dark300 font-inter text-base font-normal">
            { getSegmentedString(job_description)}...
        </p>
        <div className="mt-6 flex flex-row flex-wrap gap-4">
          <div className="flex flex-row gap-2">
            <Image
              src='/assets/icons/clock.svg'
              width={20}
              height={20}
              alt={employer_name}
            />
            <p className="font-inter text-base font-normal uppercase text-[#7B8EC8]">
              {job_employment_type}
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <Image
              src='/assets/icons/currency-dollar-circle.svg'
              width={20}
              height={20}
              alt={employer_name}
            />
            <p className="font-inter text-base font-normal uppercase text-[#7B8EC8]">
              {`${job_max_salary ? `${job_max_salary} ${job_salary_currency} / ${job_salary_period}` : 'Not disclosed'} ` }
            </p>
          </div>
          <Link href={job_apply_link || 'https://www.roberthalf.com/'} target="_blank" className="ms-auto flex flex-row gap-2">
            <p className="font-inter text-base font-medium text-primary-500">
              View Job
            </p>
            <Image
              src='/assets/icons/arrow-up-right.svg'
              width={24}
              height={24}
              alt={employer_name}
              className='stroke-primary-500'
            />
          </Link>
        </div>

      </div>

    </div>
  )
}

export default JobCard
