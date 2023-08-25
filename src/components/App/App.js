import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

// import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

import styles from './App.css';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [headHidden, setHeadHidden] = useState(false);
  const [footHidden, setFootHidden] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  // const [currentUser, setCurrentUser] = useState([]);

  function handleLogin() {
    setLoggedIn(true)
    navigate('/', { replace: true })
  }

  return (
    // <CurrentUserContext.Provider value={currentUser}>
      <div className={styles.app}>
      {!headHidden && <Header loggedIn={loggedIn} isActive={isActive} />}

      <Routes>

        {/* <Route path="/*" element={loggedIn ? <Navigate to="/movies" replace /> : <Navigate to="/" replace />} /> */}
        {/* <Route path="/" element={loggedIn ? <Navigate to="/movies" replace /> : <Navigate to="/" replace />} /> */}

        <Route path="/" element={<Main
          setHeadHidden={setHeadHidden}
          setFootHidden={setFootHidden}
          setIsActive={setIsActive}
        />} />
        {/* {loggedIn && <Route path="/movies" element={<Movies />} />}
        {loggedIn && <Route path="/saved-movies" element={<SavedMovies />} />}
        {loggedIn &&  <Route path="/profile" element={<Profile />} />} */}
        <Route path="/movies" element={<Movies
          setHeadHidden={setHeadHidden}
          setFootHidden={setFootHidden}
          setIsActive={setIsActive}
        />} />
        <Route path="/saved-movies" element={<SavedMovies
          setHeadHidden={setHeadHidden}
          setFootHidden={setFootHidden}
          setIsActive={setIsActive}
        />} />
        <Route path="/profile" element={<Profile
          setHeadHidden={setHeadHidden}
          setFootHidden={setFootHidden}
          setIsActive={setIsActive}
        />} />
        <Route path="/signin" element={<Login
          setHeadHidden={setHeadHidden}
          setFootHidden={setFootHidden}
          handleLogin={handleLogin}
        />} />
        <Route path="/signup" element={<Register
          setHeadHidden={setHeadHidden}
          setFootHidden={setFootHidden} />} />
        <Route path="/*" element={<NotFoundPage
          setHeadHidden={setHeadHidden}
          setFootHidden={setFootHidden} />} />
      </Routes>

      {!footHidden && <Footer />}
    </div>
    // </CurrentUserContext.Provider>
    
  );
}

export default App;
