import React from 'react'
import { LOGO } from '../utils/Constant'

const Header = () => {
  return (
    <div className="absolute px-8 py-2 bg-black z-10 w-full">
      <img src={LOGO} className="w-44"/>
    
    
    </div>
  )
}

export default Header
