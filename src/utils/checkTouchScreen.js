export default function checkTouchScreen () {
  let touchable = false

  if ('maxTouchPoints' in navigator) {
    touchable = navigator.maxTouchPoints > 0
  } else if ('msMaxTouchPoints' in navigator) {
    touchable = navigator.msMaxTouchPoints > 0
  } else {
    const mQ = window.matchMedia && matchMedia('(pointer:coarse)')

    if (mQ && mQ.media === '(pointer:coarse)') {
      touchable = !!mQ.matches
    } else if ('orientation' in window) {
      touchable = true
    } else {
      const UA = navigator.userAgent
      touchable = (
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
              /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
      )
    }
  }

  return touchable
}
