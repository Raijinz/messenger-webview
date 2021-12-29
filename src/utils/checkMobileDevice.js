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

  // Android: Tablet & Mobile
  if (/Android/i.test(userAgent)) {
    return /Mobi/i.test(userAgent)
  }

  // Apple
  return /iPhone|iPod/i.test(userAgent)
}
