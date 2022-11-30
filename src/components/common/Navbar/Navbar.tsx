import React from 'react'
import * as S from './Navbar.style'
import { ReactComponent as Logo } from '../../../assets/logo.svg'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <S.Navbar>
      <div>
        <Logo />
      </div>
      <S.NavLists>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to='/'
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to='/transfer'
          >
            Transfer
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to='/topup'
          >
            Topup
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to='/games'
          >
            Games
          </NavLink>
        </li>
      </S.NavLists>
    </S.Navbar>
  )
}

export default Navbar
