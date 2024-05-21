'use server'
export const getAllJobs = async (passData: any) => {
  const { type, query, location, page, pageSize } = passData
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
          location,
          page: 1,
          num_pages: 5
        }
      })
    })

    const { data } = await response.json()
    if (data) {
      const isNextPage = data.length > skipPage + pageSize
      const jobs = isNextPage ? data.slice(skipPage, skipPage + pageSize) : data
      return { jobs, isNextPage }
    } else {
      return { jobs: [], isNextPage: false }
    }
  } catch (error) {
    console.log('Job Search', error)
  }
}

export const getAllCountries = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}api/countriesapi`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    const countries = data.map((country:any) => ({ name: country.name, flags: country.flags, cca2: country.cca2 }))
    return countries
  } catch (error) {
    console.log('Job Search', error)
    return error
  }
}

export const getCurrentCountry = async () => {
  try {
    const response = await fetch('http://ip-api.com/json/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Job Search', error)
    return error
  }
}
