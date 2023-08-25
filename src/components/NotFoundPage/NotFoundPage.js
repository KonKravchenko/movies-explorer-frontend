import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './NotFoundPage.module.css'

function NotFoundPage({ setHeadFootHidden }) {

  React.useEffect(() => {
    setHeadFootHidden(true)
  })


  return (
    <section className={style.section}>
      <h2 className={style.title}>404</h2>
      <p className={style.text}>Страница не найдена</p>
      <NavLink to={-1} className={style.link}>Назад</NavLink>
    </section>
  )
}

export default NotFoundPage;