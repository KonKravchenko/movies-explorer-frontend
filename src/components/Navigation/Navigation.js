import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../../images/profile_icon.svg';

function Navigation({ loggedIn }) {

  return (
    <nav className="Navigation">
      <div>
        {!loggedIn && <NavLink to='/signup'>Регистрация</NavLink>}
        {!loggedIn && <NavLink to='/signin'>
          <button>Войти</button>
        </NavLink>}
        {loggedIn && <NavLink to="/movies">Фильмы</NavLink>}
        {loggedIn && <NavLink to="/saved-movies">Сохранённые фильмы</NavLink>}
        {loggedIn && <NavLink to="/profile">
          <p>Аккаунт</p>
          <ProfileIcon />
        </NavLink>}
      </div>
    </nav>
  );
}

export default Navigation;