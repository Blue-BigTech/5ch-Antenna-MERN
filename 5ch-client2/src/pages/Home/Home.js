import React from 'react';
import HomeFooter from './HomeFooter/HomeFooter';
import HomeNavBar from './HomeNavBar/HomeNavBar';
import Main from '../Main/Main';

const Home = ({ child }) => {
    return (
        <>
            <HomeNavBar/>
            <Main child={child}/>
            <HomeFooter/>
        </>
    );
};

export default Home;