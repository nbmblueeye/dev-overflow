import { NextResponse } from 'next/server'

const getDataByTitle = async (url: string, search: string, options: any) => {
  url = `${url}&job_titles=${search}`
  const response = await fetch(url, options)
  const result = await response.json()
  return result
}

const getDataByCompany = async (url: string, search: string, options: any) => {
  url = `${url}&company_types=${search}`
  const response = await fetch(url, options)
  const result = await response.json()
  return result
}

const getDataByJobRequirement = async (url: string, search: string, options: any) => {
  url = `${url}&job_requirements=${search}`
  const response = await fetch(url, options)
  const result = await response.json()
  return result
}

export const POST = async (request: Request, response: NextResponse) => {
  const app = await request.json()
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'fea4b2bc62msha4764e6620b8580p17d7fdjsn79c4abaddc89',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  }
  let url = `https://jsearch.p.rapidapi.com/${app.type}?page=${app.params.page}&num_pages=${app.params.num_pages}&query=${app.params.query}`
  if (app.params.location) {
    url = `https://jsearch.p.rapidapi.com/${app.type}?query=${app.params.query}%20in%20${app.params.location}`
  }
  try {
    let result:any = {}
    if (app.params.search) {
      // Perform title search
      const byTitle = await getDataByTitle(url, app.params.search, options)
      if (byTitle.status === 'OK' && byTitle.data.length <= 0) {
        // Perform company search
        const byCompany = await getDataByCompany(url, app.params.search, options)
        if (byCompany.status === 'OK' && byCompany.data.length <= 0) {
          // Perform job requirement search
          const byJobRequirement = await getDataByJobRequirement(url, app.params.search, options)
          result = byJobRequirement
        } else {
          result = byCompany
        }
      } else {
        result = byTitle
      }
    } else {
      const response = await fetch(url, options)
      result = await response.json()
    }

    if (result.status !== 'OK') {
      throw new Error(`Fetching jobSearch error! status: ${result.status}`)
    }
    return NextResponse.json({ data: result.data })
  } catch (error) {
    console.error(error)
  }
}
