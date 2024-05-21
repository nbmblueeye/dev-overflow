import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import qs from 'query-string'
import { badgeKeyTypes } from '@/backend/type'
import { BADGE_CRITERIA } from '@/constants'

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

type Criteria = {
  type: badgeKeyTypes,
  count: number,
}

type Badge = {
  BRONZE: number,
  SILVER: number,
  GOLD: number,
}

export function assignBadges (criterias:Criteria[]) {
  const badge:Badge = {
    BRONZE: 0,
    SILVER: 0,
    GOLD: 0
  }
  criterias.forEach(criteria => {
    const { type, count } = criteria
    const currentBadges: Badge = BADGE_CRITERIA[type]
    const keyCurrentBadges = Object.keys(currentBadges) as (keyof Badge)[]

    keyCurrentBadges.forEach(key => {
      if (count >= currentBadges[key]) {
        badge[key] += 1
      }
    })
  })
  return badge
}

export function getSegmentedString (text: string, segmentLength: number = 200): string {
  const segments = text.substring(0, segmentLength)
  return segments
}
