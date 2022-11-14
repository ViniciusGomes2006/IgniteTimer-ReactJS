import { HeaderContainer } from './style'
import { NavLink } from 'react-router-dom'
import { Scroll, Timer } from 'phosphor-react'
import LogoIgnite from '../../assets/Logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={LogoIgnite} alt="" />

      <nav>
        <NavLink to="/">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
