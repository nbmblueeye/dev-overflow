'use server'
export const getAllJobs = async (passData: any) => {
  const { type, query, search, location, page, pageSize } = passData
  const skipPage = (page - 1) * pageSize

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}api/jobsapi`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type,
        params: {
          query,
          search,
          location,
          page: 1,
          num_pages: 5
        }
      })
    })

    const { data } = await response.json()
    const isNextPage = data.length > skipPage + pageSize
    const jobs = isNextPage ? data.slice(skipPage, skipPage + pageSize) : data
    return { jobs, isNextPage }
  } catch (error) {
    console.log('Job Search', error)
  }
}
