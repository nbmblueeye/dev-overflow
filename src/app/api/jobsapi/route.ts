import { NextResponse } from 'next/server'

export const POST = async (request: Request, response: NextResponse) => {
  const app = await request.json()
  const options:any = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': `${process.env.NEXT_RAPID_API_KEY}`,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  }
  const url = `https://jsearch.p.rapidapi.com/${app.type}?query=${app.params.query}%20in%20${app.params.location}&page=${app.params.page}&num_pages=${app.params.num_pages}`

  try {
    const response = await fetch(url, options)
    const result = await response.json()
    if (result.status !== 'OK') {
      throw new Error(`Fetching jobSearch error! : ${result.message}`)
    }
    return NextResponse.json({ data: result.data })
  } catch (error) {
    console.error(error)
    return NextResponse.json(error)
  }
}
