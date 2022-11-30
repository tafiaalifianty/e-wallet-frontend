import styled from 'styled-components'
import colors from '../../../styles/Colors.style'

export const Navbar = styled.nav`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const NavLists = styled.ul`
  text-decoration: none;
  list-style: none;
  display: flex;
  justify-content: space-between;
  gap: 40px;

  li {
    a {
      text-decoration: none;
      color: ${colors.textMuted};
      transition: 250ms ease-out;
      font-weight: 600;

      &:hover,
      &.active {
        text-decoration: underline;
      }
    }
  }
`

export const HamburgerButton = styled.button`
  border: 0;
  height: 40px;
  width: 40px;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: #283b8b;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  display: none;

  &:hover {
    background-color: #2642af;
  }

  @media (max-width: 768px) {
    display: block;
  }
`
