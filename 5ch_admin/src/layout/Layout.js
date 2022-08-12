import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import PropTypes from 'prop-types';

const Layout = ({ child }) => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent subChild={child} />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

Layout.propTypes = {
  child: PropTypes.any,
};

export default Layout
