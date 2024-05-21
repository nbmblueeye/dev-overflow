import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    // Construct the URL using the query parameter from the request
    const url = 'http://ip-api.com/json/'
    // Fetch data from the API
    const response = await fetch(url)
    // Check if the response is ok (status is in the range 200-299)
    if (!response.ok) {
      throw new Error(`Location query error! status: ${response.status}`)
    }
    // Parse the JSON response
    const data = await response.json()
    // Return the JSON data with a 200 status
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(error)
  }
}
