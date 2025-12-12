import { useState } from 'react'
import './index.css'

const MoreCloseIcon = () => {
    const [isOpen, setIsOpen] = useState(false)
  return (
      <div className='w-full h-full flex items-center justify-center' onMouseEnter={() => setIsOpen(!isOpen)} onMouseLeave={() => setIsOpen(false)}>
          <button className={`header__menu-button ${isOpen ? 'is-open' : ''}`} aria-label="menu close">
          <span className="header__menu-line top"></span>
          <span className="header__menu-line bottom"></span>
      </button>
      </div>
  )
}

export default MoreCloseIcon