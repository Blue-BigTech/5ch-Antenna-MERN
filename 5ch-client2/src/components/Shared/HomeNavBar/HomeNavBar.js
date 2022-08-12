import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import useGlobalContext from '../../../hooks/useGlobalContext';
import { actionFetchGenres, actionFetchBlogsites, activeNav } from '../../../reducers/home/action'
import Sidebar from '../Sidebar/Sidebar';
import * as Icon from 'react-bootstrap-icons';

const HomeNavBar = (props) => {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const { stickyMenu } = useGlobalContext();

   useEffect(() => {
      const { dispatch } = props
      dispatch(actionFetchGenres())
   }, []);

   const onChangeNav = (genre_id, index) => {
      const { dispatch } = props
      dispatch(activeNav(index))
      dispatch(actionFetchBlogsites(0, genre_id))
   }

   const { genres, navIndex } = props

   return (
      <>
         <header>
            <div className={stickyMenu ? "sticky_menu top-bar-white top-bar-3 lg-pt-30 lg-pb-30 h3_topBar" :
            "top-bar-white top-bar-3 h3_topBar"}>
               <div className="container">
                  <div className={ "row align-items-center"}>
                     <div className="col-xl-12 col-lg-12 col-md-6 col-6 text-center">
                        <div className="logo logo-3 pos-rel">
                           <img src="../img/logo.png" alt=""/>
                        </div>
                     </div>
                     <div className='col-6 d-lg-none'>
                        <div onClick={handleShow} className="side-menu-icon d-lg-none text-end">
                           <button className="side-toggle border-0 bg-transparent">
                              <Icon.List style={{'width': '100px', 'height': '50px'}} /></button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className={stickyMenu ? "sticky_menu header-menu-area header-menu-blue theme-bg sticky_navBar_bg" :
               "header-menu-area header-menu-blue theme-bg h3_navBar"}>
               <div className="container">
                  <div className="row align-items-center">
                     <div className="col-xl-2 col-lg-2"></div>
                        <div className="col-xl-8 col-lg-8 text-center">
                           <div className="header__menu menu-dark">
                              <nav id="mobile-menu">
                                 <ul>
                                    {
                                       genres.map((genre, index) => (
                                          <li key={index}><Link to={`/${index}`} onClick={(e) => onChangeNav(genre._id, index)}
                                             style={navIndex===index?{'color':'red'}:{'color':'#b2bfcf'}} 
                                          >{genre.name}</Link></li> 
                                       ))
                                    }
                                    <li><a href="#"><Icon.StarFill /></a></li>
                                    <li><a href="#"><Icon.InfoCircleFill /></a></li>
                                    <li><a href="#"><Icon.Twitter /></a></li>
                                 </ul>
                              </nav>
                           </div>
                        </div>
                     <div className="col-xl-2 col-lg-2">
                     </div>
                  </div>
               </div>
            </div>
         </header>

         <Sidebar 
            show={show} 
            handleClose={handleClose}
            onChangeNav={onChangeNav}
            genres={genres} />
      </>
   );
};

HomeNavBar.propTypes = {
   genres: PropTypes.array,
   navIndex: PropTypes.number,
};

function mapStateToProps(state) {
   return {
     genres: state.reducerHome.genres,
     navIndex: state.reducerHome.navIndex,
   }
}

export default connect(mapStateToProps)(HomeNavBar)