import React, { useCallback } from 'react';
import style from './index.module.scss';
import { NavLink } from 'react-router-dom';

const Logo: React.FunctionComponent = () => {
  return (
    <div className={style['logo-container']}>
      <img className={style['logo']} src="/logo.png" alt=""></img>
      <img src="/logo-text.png" alt=""></img>
    </div>
  )
}

const Header: React.FunctionComponent = () => {
  return (
    <header className={style['header']}>
      <Logo />
      <nav className={style['navbar']}>
        <NavLink to="/new" className={style['navbar-item']} activeClassName={style['navbar-item--active']}>new</NavLink>
        <NavLink to="/all" className={style['navbar-item']} activeClassName={style['navbar-item--active']}>all</NavLink>
      </nav>
    </header>
  )
}

export default Header;