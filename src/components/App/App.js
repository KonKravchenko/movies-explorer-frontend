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
import { ProtectedRouteElement, ProtectedRouteAuth } from '../../utils/ProtectedRouter';


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
  }

  function closePopup() {
    setIsOpen(false)
  }


  function handleRegister({ email, name, password }) {
    mainApi.register({ email, name, password })
      .then((res) => {
        setStatus(res.status)
        handleLogin({ email, password })
      })
      .catch(err => {
        setStatus(err)
        setButtonLoading(false)
      });
  }



  function handleApi() {
    mainApi.getProfileData()
      .then((data) => {
        setCurrentUser(data);
        setLoggedIn(true)
        setButtonLoading(false)
      })
      .catch((err) => {
        setStatus(err)
        setLoggedIn(false)
        setButtonLoading(false)
      })
  }

  function handleLogin(data) {
    mainApi.authorize(data)
      .then((res) => {
        setButtonLoading(true)
        setStatus(res.status)
        handleApi()
        setLoggedIn(true);
        navigate("/movies", { replace: true })
      })
      .catch((err) => {
        setStatus(err)
        setButtonLoading(false)
      })
  }

  function handleIn() {
    handleApi()
  }

  React.useEffect(() => {
    handleIn()
  }, [])

  function handleLogout() {
    mainApi.signout(currentUser)
      .then((res) => {
        setButtonLoading(true)
        setLoggedIn(false);
        navigate('/', { replace: true });
        localStorage.removeItem('SearchHistoryMovies')
        localStorage.removeItem('SearchHistorySavedMovies')
        localStorage.removeItem('UserMovies')
        localStorage.removeItem('Movies')
        localStorage.removeItem('SavedMoviesSearchValue')
        localStorage.removeItem('MoviesSearchValue')
        localStorage.removeItem('FilterMovies')
        localStorage.removeItem('FilterSavedMovies')
        setSearchResult(null)
        setButtonLoading(false)
      }
      )
      .catch(err => {
        console.log(`Ошибка handleLogout: ${err}`)
        setButtonLoading(false)
      });
  }

  const [status, setStatus] = useState('')
  const [profileChange, setProfileChange] = useState(false)

  function changeProfileData(data) {
    mainApi.changeProfileData(data)
      .then((res) => {
        setStatus(200)
        setProfileChange(false)
        setCurrentUser(data)
        setButtonLoading(false)
      })
      .catch((err) => {
        setStatus(err)
        setButtonLoading(false)
      })
  }

  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function checkSavedMovies(result) {
    mainApi.getSavedMovies()
      .then((userMovies) => {
        const data = result.map((item) => {
          const film = userMovies.find(({ movieId, _id }) => movieId === item.id);
          if (film) {
            item.isSaved = true;
            item.savedId = film._id;
          } else item.isSaved = false;
          return item;
        })
        setSearchResult(data)
        const local = localStorage.getItem('SearchHistoryMovies');
        local && localStorage.setItem('SearchHistoryMovies', JSON.stringify({ data }));
        localStorage.setItem('UserMovies', JSON.stringify({ userMovies }));

        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }


  const [savedMovies, setSavedMovies] = useState([]);
  const [searchSavedMovies, setSearchSavedMovies] = useState([]);

  function handleDeleteMovies(film) {
    mainApi.deleteMovie(film._id || film.savedId)
      .then((res) => {
        const userMovies = savedMovies.filter(function item(c) { if (c._id !== film._id) { return c } })
        const searchUserMovies = searchSavedMovies.filter(function item(c) { if (c._id !== film._id) { return c } })
        setSavedMovies(userMovies)
        setSearchSavedMovies(searchUserMovies)
        localStorage.setItem('UserMovies', JSON.stringify({ userMovies }))
        if (searchResult) {
          checkSavedMovies(searchResult)
        }

      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)

      });
  }

  const [buttonLoading, setButtonLoading] = useState(false);

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


          <Route path="/" element={<Main
            setHeadHidden={setHeadHidden}
            setFootHidden={setFootHidden}
            setIsActive={setIsActive}
            handleMainLink={handleMainLink}
          />} />


          <Route path="/movies" element={<ProtectedRouteElement loggedIn={loggedIn} element={Movies}
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
            handleDeleteMovies={handleDeleteMovies}
          />} />

          <Route path="/saved-movies" element={<ProtectedRouteElement loggedIn={loggedIn} element={SavedMovies}
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
            handleDeleteMovies={handleDeleteMovies}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
            searchSavedMovies={searchSavedMovies}
            setSearchSavedMovies={setSearchSavedMovies}
          />} />

          <Route path="/profile" element={<ProtectedRouteElement loggedIn={loggedIn} element={Profile}
            setHeadHidden={setHeadHidden}
            setFootHidden={setFootHidden}
            setIsActive={setIsActive}
            handleLogout={handleLogout}
            changeProfileData={changeProfileData}
            status={status}
            setStatus={setStatus}
            profileChange={profileChange}
            setProfileChange={setProfileChange}
            isLoading={buttonLoading}
            setIsLoading={setButtonLoading}
          />} />

          <Route path="/signin" element={<ProtectedRouteAuth loggedIn={loggedIn} element={Login}
            setHeadHidden={setHeadHidden}
            setFootHidden={setFootHidden}
            handleLogin={handleLogin}
            status={status}
            setStatus={setStatus}
            isLoading={buttonLoading}
            setIsLoading={setButtonLoading}
          />} />

          <Route path="/signup" element={<ProtectedRouteAuth loggedIn={loggedIn} element={Register}
            handleRegister={handleRegister}
            setHeadHidden={setHeadHidden}
            setFootHidden={setFootHidden}
            status={status}
            setStatus={setStatus}
            isLoading={buttonLoading}
            setIsLoading={setButtonLoading} />} />

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
