import React from 'react';

function Movies({ setHeadHidden, setFootHidden, setIsActive }) {

  React.useEffect(() => {
    setHeadHidden(false)
    setFootHidden(false)
    setIsActive(true)
  })

  return (
    <section className="Movies">

    </section>
  );
}

export default Movies;