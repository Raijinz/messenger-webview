export function checkMobileDevice () {
  /*
    This property is not on Safari, Firefox, or some Android browsers yet,
    but it is more reliable than User Agent
  */
  // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData
  if (navigator.userAgentData) {
    return navigator.userAgentData.mobile
  }

  // Fallback
  const userAgent = navigator.userAgent
  const maxTouchPoints = navigator.maxTouchPoints

  // Android: Tablet & Mobile
  if (/Android/i.test(userAgent)) {
    return /Mobi/i.test(userAgent)
  }

  // Apple & WebOS
  let isMobile = /webOS|iPhone|iPod|iPad/i.test(userAgent)

  // Confusingly, iPad with iPadOS will use 'Macintosh' as a user-agent
  if (!isMobile) {
    const isMac = /Macintosh/i.test(userAgent)

    if (isMac && maxTouchPoints && maxTouchPoints > 2) {
      isMobile = true
    }
  }

  return isMobile
}
