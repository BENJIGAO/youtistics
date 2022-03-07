import React from "react"

interface IAuthButtonProps {

}

export type ScriptElt = HTMLScriptElement | null

const loadScript = (src: string, onload: () => void): void => {
  const isScriptLoaded = document.querySelector(`script[src="${src}"]`) ? true : false
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

const AuthButton: React.FC<IAuthButtonProps> = (props) => {
  return (
    <button onClick={() => loadScript('https://apis.google.com/js/api.js', () => { console.log('hello') })}>
      Get Started
    </button>
  );
}

export default AuthButton