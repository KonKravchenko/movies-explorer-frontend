import React from 'react';

function SavedMovies({ setHeadHidden, setFootHidden,  setIsActive }) {

  React.useEffect(() => {
    setHeadHidden(false)
    setFootHidden(false)
    setIsActive(true)
  })

  return (
    <div className="SavedMovies">

    </div>
  );
}

export default SavedMovies;