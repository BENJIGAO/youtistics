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

const gapiStart = (): void => {
  window.gapi.client.init({
  }).then(() => {
    window.gapi.client.load('youtube', 'v3')
  }).then(response => {
    console.log('discovery document loaded')
  }).catch(reason => {
    console.log('Error: ' + reason.result.error.message)
  })
}

export const gapiLoad = (): void => {
  window.gapi.load('client', gapiStart)
}

export const gisInit = (): void => {
  
}