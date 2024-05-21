import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,flags')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
  }
}
