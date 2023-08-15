import React, { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="App">
      <Header
        loggedIn={loggedIn}
      />

      <Routes>
        <Route path="/*" element={loggedIn ? <Navigate to="/movies" replace /> : <Navigate to="/" replace />} />
        {/* <Route path="/" element={loggedIn ? <Navigate to="/movies" replace /> : <Navigate to="/" replace />} /> */}

        <Route path="/" element={<Main />} />
        {loggedIn && <Route path="/movies" element={<Movies />} />}
        {loggedIn && <Route path="/saved-movies" element={<SavedMovies />} />}
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
