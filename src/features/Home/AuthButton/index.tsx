import React from 'react'
import { getToken } from 'common/utils/authUtils'

interface IAuthButtonProps {

}

const AuthButton: React.FC<IAuthButtonProps> = (props) => {
  return (
    <button onClick={getToken}>
      Get Started
    </button>
  );
}

export default AuthButton