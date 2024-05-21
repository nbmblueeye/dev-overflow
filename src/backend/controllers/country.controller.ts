'use server'
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
  }
}
