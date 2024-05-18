import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import qs from 'query-string'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToMonthYear (dateStr:Date) {
  const date = new Date(dateStr)
  const formattedDate = date.toLocaleString('en-US', { year: 'numeric', month: 'long' })
  return formattedDate
}

type addSearchProps = {
  params: string,
  key: string,
  value: string
}

export function addQueryUrl ({ params, key, value }:addSearchProps) {
  const objectQuery = qs.parse(params)
  objectQuery[key] = value
  return qs.stringifyUrl({
    url: window.location.pathname,
    query: objectQuery
  }, {
    skipNull: true
  })
}

type removeSearchProps = {
  params: string,
  keyToRemove: string[]
}
export function removeQueryUrl ({ params, keyToRemove }:removeSearchProps) {
  const objectQuery = qs.parse(params)
  keyToRemove.forEach(key => delete objectQuery[key])
  return qs.stringifyUrl({
    url: window.location.pathname,
    query: objectQuery
  }, {
    skipNull: true
  })
}

export function formatNumber (num:number):string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  } else {
    return num.toString()
  }
}
