import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import BurgerPopup from '../BurgerPopup/BurgerPopup';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';

import { MovieContext } from '../../contexts/MovieContext';

import styles from './App.module.css';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [headHidden, setHeadHidden] = useState(false);
  const [footHidden, setFootHidden] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [onFilter, setOnFilter] = useState(false);
  const [addMovies, setAddMovies] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [mainLink, setMainLink] = useState(false);
  const [movieLink, setMovieLink] = useState(false);
  const [savedMovieLink, setSavedMovieLink] = useState(false);


  function handleMainLink() {
    setMainLink(true)
    setMovieLink(false)
    setSavedMovieLink(false)
  }
  function handleMovieLink() {
    setMainLink(false)
    setMovieLink(true)
    setSavedMovieLink(false)
  }
  function handleSavedMovieLink() {
    setMainLink(false)
    setMovieLink(false)
    setSavedMovieLink(true)
  }

  const [currentUser, setCurrentUser] = useState([]);



  // function handleLogin() {
  //   setLoggedIn(true)
  //   navigate('/', { replace: true })
  // }

  function handleLogout() {
    setLoggedIn(false)
    navigate(-1, { replace: true })
  }

  function openPopup() {
    setIsOpen(true)
    console.log('clack')
  }

  function closePopup() {
    setIsOpen(false)
  }


  function handleRegister(data) {
    mainApi.register(data)
      .then((res) => {
        // setInfoTooltipData(res)
        // setInfoTooltip(true)
        navigate('/signin', { replace: true });
        console.log(data)
      })
      .catch(err => {

      });
  }

function handleApi(){
  mainApi.getProfileData()
  .then((data)=>{
    setCurrentUser(data)
    console.log(currentUser)
  })
}
  // Новый логин
  function handleLogin(data) {
    mainApi.authorize(data)
      .then((res) => {
        console.log(res)
        // setIsLoading(true)
        handleApi()
        // setFormValue({ password: '', email: '' });
        setLoggedIn(true);
        navigate("/", { replace: true })

      })
      .catch((err) => {
        // setInfoTooltipData(err)
        // setInfoTooltip(true)
        console.log(`Ошибка handleLogin: ${err}`, err)
      })
  }

  function handleIn() {
    // setIsLoading(true)
    handleApi()
    // navigate("/main", { replace: true })
    setLoggedIn(true);
  }

  // React.useEffect(() => {
  //   handleIn()
  // }, [])

  function handleLogout() {

    mainApi.logOut(currentUser)
      .then((res) => {
        setLoggedIn(false);
        navigate('/', { replace: true });
      }
      )
      .catch(err => {
        console.log(`Ошибка handleLogout: ${err}`)
      });

  }



  return (

    <div className={styles.app}>
      {!headHidden && <Header
        loggedIn={loggedIn}
        isActive={isActive}
        openPopup={openPopup}
        movieLink={movieLink}
        savedMovieLink={savedMovieLink}
      />}

      <Routes>

        {/* <Route path="/*" element={loggedIn ? <Navigate to="/movies" replace /> : <Navigate to="/" replace />} /> */}
        {/* <Route path="/" element={loggedIn ? <Navigate to="/movies" replace /> : <Navigate to="/" replace />} /> */}

        <Route path="/" element={<Main
          setHeadHidden={setHeadHidden}
          setFootHidden={setFootHidden}
          setIsActive={setIsActive}
          handleMainLink={handleMainLink}
        />} />
        {/* {loggedIn && <Route path="/movies" element={<Movies />} />}
        {loggedIn && <Route path="/saved-movies" element={<SavedMovies />} />}
        {loggedIn &&  <Route path="/profile" element={<Profile />} />} */}
        <Route path="/movies" element={<Movies
          setHeadHidden={setHeadHidden}
          setFootHidden={setFootHidden}
          setIsActive={setIsActive}
          onFilter={onFilter}
          setOnFilter={setOnFilter}
          addMovies={addMovies}
          setAddMovies={setAddMovies}
          handleMovieLink={handleMovieLink}
        />} />

        <Route path="/saved-movies" element={<SavedMovies
          setHeadHidden={setHeadHidden}
          setFootHidden={setFootHidden}
          setIsActive={setIsActive}
          onFilter={onFilter}
          setOnFilter={setOnFilter}
          handleSavedMovieLink={handleSavedMovieLink}
        />} />
        <Route path="/profile" element={<Profile
          setHeadHidden={setHeadHidden}
          setFootHidden={setFootHidden}
          setIsActive={setIsActive}
          handleLogout={handleLogout}
        />} />
        <Route path="/signin" element={<Login
          setHeadHidden={setHeadHidden}
          setFootHidden={setFootHidden}
          handleLogin={handleLogin}
        />} />
        <Route path="/signup" element={<Register
          handleRegister={handleRegister}
          setHeadHidden={setHeadHidden}
          setFootHidden={setFootHidden} />} />

        <Route path="*" element={<NotFoundPage
          setHeadHidden={setHeadHidden}
          setFootHidden={setFootHidden} />} />

        {/* <Route path="/*" element={<NotFoundPage />}  /> */}
      </Routes>

      {loggedIn && <BurgerPopup
        isOpen={isOpen}
        closePopup={closePopup}
        mainLink={mainLink}
        movieLink={movieLink}
        savedMovieLink={savedMovieLink}
      />}

      {!footHidden && <Footer />}
    </div>

  );
}

export default App;
