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
import { mainApi } from '../../utils/MainApi';


import styles from './App.module.css';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [headHidden, setHeadHidden] = useState(false);
  const [footHidden, setFootHidden] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [onFilter, setOnFilter] = useState(true);
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
        setStatus(res.status)
        navigate('/signin', { replace: true });
      })
      .catch(err => {
        setStatus(err)
      });
  }



  function handleApi() {
    mainApi.getProfileData()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => {
        setStatus(err)
      })
  }

  function handleLogin(data) {
    mainApi.authorize(data)
      .then((res) => {
        console.log(res)
        setStatus(res.status)
        handleApi()
        setLoggedIn(true);
        navigate("/movies", { replace: true })

      })
      .catch((err) => {
        setStatus(err)
      })
  }

  function handleIn() {
    handleApi()
    setLoggedIn(true);
  }

  React.useEffect(() => {
    handleIn()
  }, [])

  function handleLogout() {

    mainApi.signout(currentUser)
      .then((res) => {
        setLoggedIn(false);
        navigate('/', { replace: true });
      }
      )
      .catch(err => {
        console.log(`Ошибка handleLogout: ${err}`)
      });
  }

  const [status, setStatus] = useState('')
  const [profileChange, setProfileChange] = useState(false)

  function changeProfileData(data) {
    console.log(data)
    mainApi.changeProfileData(data)
      .then((res) => {
        setStatus(res.status)
        setProfileChange(false)
        setCurrentUser(data)
      })
      .catch((err) => {
        setStatus(err)
      })
  }

  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function checkSavedMovies(result) {
    mainApi.getSavedMovies()
      .then((savedMovies) => {
        const data = result.map((item) => {
          const film = savedMovies.find(({ movieId, _id }) => movieId === item.id);
          if (film) {
            item.isSaved = true;
            item.savedId = film._id;
          } else item.isSaved = false;
          return item;
        })

        setSearchResult(data)
        localStorage.setItem('SearchHistory', JSON.stringify({ data }))
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
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
            handleMovieLink={handleMovieLink}
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            checkSavedMovies={checkSavedMovies}
            isLoading={isLoading}
            setIsLoading={setIsLoading}

          />} />

          <Route path="/saved-movies" element={<SavedMovies
            setHeadHidden={setHeadHidden}
            setFootHidden={setFootHidden}
            setIsActive={setIsActive}
            onFilter={onFilter}
            setOnFilter={setOnFilter}
            handleSavedMovieLink={handleSavedMovieLink}
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            checkSavedMovies={checkSavedMovies}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />} />
          <Route path="/profile" element={<Profile
            setHeadHidden={setHeadHidden}
            setFootHidden={setFootHidden}
            setIsActive={setIsActive}
            handleLogout={handleLogout}
            changeProfileData={changeProfileData}
            status={status}
            setStatus={setStatus}
            profileChange={profileChange}
            setProfileChange={setProfileChange}
          />} />
          <Route path="/signin" element={<Login
            setHeadHidden={setHeadHidden}
            setFootHidden={setFootHidden}
            handleLogin={handleLogin}
            status={status}
          />} />
          <Route path="/signup" element={<Register
            handleRegister={handleRegister}
            setHeadHidden={setHeadHidden}
            setFootHidden={setFootHidden}
            status={status} />} />

          <Route path="*" element={<NotFoundPage
            setHeadHidden={setHeadHidden}
            setFootHidden={setFootHidden} />} />

          <Route path="/*" element={<NotFoundPage />} />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
