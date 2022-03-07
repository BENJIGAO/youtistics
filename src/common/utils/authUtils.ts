let tokenClient
let accessToken

export const loadScript = (src: string, onload: () => void): void => {
  const isScriptLoaded = document.querySelector(`script[src='${src}']`) ? true : false
  if (isScriptLoaded) {
    return
  }

  const script = document.createElement('script')
  script.src = src
  script.async = true
  script.defer = true
  script.onload = onload

  document.head.appendChild(script)
}

export const gapiStart = (): void => {

}

export const gisInit = (): void => {
  
}