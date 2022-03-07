import React from 'react'
import { loadScript } from 'common/utils/authUtils'

interface IAuthButtonProps {

}

const AuthButton: React.FC<IAuthButtonProps> = (props) => {
  return (
    <button onClick={() => loadScript('https://apis.google.com/js/api.js', () => { console.log('hello') })}>
      Get Started
    </button>
  );
}

export default AuthButton