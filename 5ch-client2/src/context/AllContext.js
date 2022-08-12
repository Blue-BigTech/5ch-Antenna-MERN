import React, { createContext, useEffect, useState } from 'react';
import useFirebase from '../hooks/useFirebase';

export const AuthContext = createContext();

const AllContext = ({children}) => {
    // Slick ArrowLeft
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <button
            {...props}
            className={
                "slick-prev slick-arrow" +
                (currentSlide === 0 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentSlide === 0 ? true : false}
            type="button"
        >
            <i className="fas fa-arrow-left"></i>
        </button>
    );
    // Slick Arrow Right
    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <button
            {...props}
            className={
                "slick-next slick-arrow" +
                (currentSlide === slideCount - 1 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentSlide === slideCount - 1 ? true : false}
            type="button"
        >
            <i className="fas fa-arrow-right"></i>
        </button>
    );

    const [stickyMenu, setStickyMenu] = useState(false);
    // sticky
    useEffect(() => {
        const stickyMenuBar = () => {
            if (window.scrollY > 80) {
                setStickyMenu(true)
            }
            else {
                setStickyMenu(false)
            }
        }
       window.addEventListener('scroll', stickyMenuBar);
    },[])

    const [isOpen, setIsOpen] = useState(false);
    const value = {
        auth: useFirebase(),
        isOpen,
        setIsOpen,
        stickyMenu,
        SlickArrowLeft,
        SlickArrowRight,
    }
    return (
       <>
           <AuthContext.Provider value={value}>
                {children}
           </AuthContext.Provider>
       </>
    );
};

export default AllContext;