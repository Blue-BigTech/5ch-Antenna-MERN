import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { actionFetchGenres } from './reducers/home/action'
import ScrollTop from './components/ScrollTop';
import AllContext from './context/AllContext';
import Home from './pages/Home/Home';
import More from './pages/More/More';
import './App.css';


function App(props) {

  useEffect(() => {
    const { dispatch } = props
    dispatch(actionFetchGenres())
  }, []);

  const { genres } = props

  return (
    <>
      <AllContext>
        <BrowserRouter>
          <ScrollTop />
          <Routes>
            <Route path="/" element={<Navigate to="/0" />} />
            <Route path="/blog/:id" element={<More />} />
            {genres.map((genre, index) => (
              <Route key={index} path={`/${index}`} element={<Home child={genre._id} />} />
            ))}
          </Routes>
        </BrowserRouter>
      </AllContext>
    </>
  );
}

App.propTypes = {
  genres: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    genres: state.reducerHome.genres,
  }
}

export default connect(mapStateToProps)(App)
