import React from 'react';
import { Offcanvas, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = ({ show, handleClose, onChangeNav, genres }) => {

   return (
      <>
         <div>
            <Offcanvas show={show} onHide={handleClose} placement='end' className='side__bar'>
               <Offcanvas.Header closeButton>
               </Offcanvas.Header>
               <Offcanvas.Body>
               <ListGroup variant="flush">
                  {
                     genres.map((genre, index) => (
                        <Link to={`/${index}`} key={index} onClick={(e) => onChangeNav(genre._id)}><ListGroup.Item className='list__item__background'>{genre.name}</ListGroup.Item></Link>
                     ))
                  }
               </ListGroup>
               </Offcanvas.Body>
            </Offcanvas>
         </div>
      </>
   );
};

export default Sidebar;