import { getAllCountries } from '@/backend/controllers/country.controller'
import { getAllJobs } from '@/backend/controllers/jobs.controller'
import EmptyResult from '@/components/EmptyResult'
import JobCard from '@/components/cards/JobCard'
import CountryFilter from '@/components/shares/CountryFilter'
import Pagination from '@/components/shares/Pagination'
import LocalSearch from '@/components/shares/searchs/LocalSearch'
import React from 'react'

const Page = async ({ searchParams }:{searchParams:{[key:string]:string} }) => {
  const results = await getAllJobs({
    type: 'search',
    query: searchParams.q ? searchParams.q : 'web developer',
    search: searchParams.q,
    location: searchParams.location,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 10
  })

  const countries = await getAllCountries()

  const jobs = results?.jobs.map((result:any) => {
    countries.forEach((item:any) => {
      if (item.cca2 === result.job_country) {
        result = { ...result, ...{ job_country: item.name.common, flag: item.flags.png } }
      }
    })
    return result
  })

  return (
    <>
      <div className="flex w-full flex-col gap-10">
          <h2 className="text-light900_dark100 font-inter text-3xl font-bold">Jobs</h2>
          <div className="flex flex-row flex-wrap gap-10">
            <LocalSearch
            route='/jobs'
            />
            <CountryFilter
              filters={countries}
              addClass='Capitalize'
              route='/collection'
            />
          </div>
          <div className="flex flex-col gap-8">
            {
             jobs?.length > 0
               ? jobs.map((job:any) => {
                 return (
                   <JobCard key={job.job_id}
                   job_id={job.job_id}
                   employer_name = { job.employer_name }
                   employer_logo = { job.employer_logo }
                   employer_website = { job.employer_website }
                   job_employment_type = { job.job_employment_type }
                   job_title = { job.job_title }
                   job_description = { job.job_description }
                   job_apply_link = { job.job_apply_link }
                   job_posted_at_datetime_utc = { job.job_posted_at_datetime_utc }
                   job_city = { job.job_city }
                   job_state = { job.job_state }
                   job_country = { job.job_country }
                   job_max_salary = { job.job_max_salary }
                   job_salary_currency = { job.job_salary_currency }
                   job_salary_period = { job.job_salary_period }
                   flag = { job.flag }
                   />
                 )
               })
               : <EmptyResult
                  title="No Job available"
                  description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡'
                  buttonText='Go to Question'
                  link='/question'
                />
            }
          </div>
      </div>
      <div className="mt-10 flex w-full justify-center">
        <Pagination
          pageNumber={ searchParams.page ? +searchParams.page : 1 }
          hasNextPage={ results ? results.isNextPage : false }
        />
      </div>
    </>
  )
}

export default Page
