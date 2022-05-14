import React from 'react'
import "./style/footer.css"
import Github from './img/github_logo.png'

const Footer = () => {
  return (
    <div className='footer'>
      <p>®Randy Wang</p>
      <a className="footer-link" href="https://github.com/randywang1234?tab=repositories" target="_blank" rel='noreferrer'>
        <img src={Github} alt="github"/>
        <p>Github</p>
      </a>
    </div>
  )
}

export default Footer