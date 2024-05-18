const changeTimeToHumenRead = (timestamp:string):string => {
  // Convert timestamp string to Date object
  const givenTime: Date = new Date(timestamp)

  // Get current time
  const currentTime: Date = new Date()

  // Calculate the time difference in milliseconds
  const timeDifferenceMs: number = currentTime.getTime() - givenTime.getTime()

  // Convert milliseconds to seconds
  const timeDifferenceSec: number = Math.floor(timeDifferenceMs / 1000)

  if (timeDifferenceSec < 60) {
    return timeDifferenceSec + ' seconds ago'
  } else if (timeDifferenceSec < 3600) {
    return Math.floor(timeDifferenceSec / 60) + ' minutes ago'
  } else if (timeDifferenceSec < 86400) {
    return Math.floor(timeDifferenceSec / 3600) + ' hours ago'
  } else if (timeDifferenceSec < 2592000) { // 30 days
    return Math.floor(timeDifferenceSec / 86400) + ' days ago'
  } else if (timeDifferenceSec < 31536000) { // 365 days
    return Math.floor(timeDifferenceSec / 2592000) + ' months ago'
  } else {
    return Math.floor(timeDifferenceSec / 31536000) + ' years ago'
  }
}

export default changeTimeToHumenRead
