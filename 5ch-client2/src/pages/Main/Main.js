import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { actionFetchBlogsites, actionFetchNewBlogs } from '../../reducers/home/action'
import { Table, Card, Button, ListGroup, Spinner } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const Main = (props) => {
   const [page, setPage] = useState(1);

   useEffect(() => {
      const { dispatch, child } = props
      dispatch(actionFetchNewBlogs())
      getBlogsitesByGenre(child)
   }, []);

   const onChangePage = (e, genre_id) => {
      const page = e.target.value;
      setPage(parseInt(page)+1);
      const { dispatch } = props
      dispatch(actionFetchBlogsites(parseInt(page), genre_id))
   }

   const getBlogsitesByGenre = (genreId) => {
      const { dispatch } = props
      dispatch(actionFetchBlogsites(0, genreId))
   }

   const pageBtn = (total, genre_id) => {
      const btnNum = total%50?(parseInt(total/50) + 1):total/50
      var btnItems = [];
      for (var i = 0; i < btnNum; i++) {
         if(i === btnNum - 1){
            btnItems.push(<Button key={i} value={i} onClick={(e) => onChangePage(e, genre_id)} variant="primary">{i*50 + 1} ~ {total}</Button>);
            btnItems.push(' ')
         } else {
            btnItems.push(<Button key={i} value={i} onClick={(e) => onChangePage(e, genre_id)} variant="primary">{i*50 + 1} ~ {2}</Button>);
            btnItems.push(' ')
         }
      }
      return btnItems
   }

   const { loadingBlogsite, blogsites, loadingNewBlog, newBlogs, total } = props
   var genre_id = ''
   if(blogsites.length !== 0){
      genre_id = blogsites[0].genre_id
   }

   return (
      <>
         <section style={{ 'marginTop': '50px' }}>
            <div className="container">
               <div className="row">
                  <div className="col-xl-12">
                     <div className="appoinment-box-2" style={{ 'marginTop': '0px' }}>
                        <div className='new-blogs-header'>
                           <img src="img/i_new.png" style={{ 'margin': '0 20px', 'width': '50px', 'height': '25px' }} /><span style={{ 'color': 'white', 'fontSize': '20px' }}>最新記事一覧</span>
                        </div>
                        {
                           loadingNewBlog
                           ?
                           <div className='text-center'>
                              <Spinner animation="border" variant="primary" />
                           </div>
                           :
                           <div className="appoinment-box-content" style={{ 'padding': '0' }}>
                              <div style={{ 'height': '500px', 'overflowY': 'scroll' }}>
                              <Table striped responsive>
                                 <tbody>
                                    {
                                       newBlogs.map((blog, index) => (
                                          <tr key={index}>
                                             <td width={'15%'} className="text-center">{blog.blog_date.slice(5, 7)}月{blog.blog_date.slice(8, 10)}日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{blog.blog_date.slice(11, 16)}</td>
                                             <td width={'65%'}><img src={blog.blogsite_id.icon} style={{ 'marginRight': '10px', 'width': '25px' }} /><a href={blog.link}>{blog.title}</a></td>
                                             <td width={'20%'}><a href={blog.blogsite_id.URL}>{blog.blogsite_id.title}</a></td>
                                          </tr>
                                       ))
                                    }
                                 </tbody>
                              </Table>
                              </div>
                           </div>
                        }
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <br />
         <br />
         {
            loadingBlogsite 
            ?
            <div className='text-center'>
               <Spinner animation="border" variant="primary" />
            </div>
            :
            <section>
               <div className="container">
                  <div className="row">
                     {
                        blogsites.map((blogsite, index) => (
                           <div key={index} className="col-xl-6 col-md-6" style={{ 'marginBottom': '25px' }}>
                              <Card>
                                 <Card.Header>
                                    <div className='row'>
                                       <div className='col-xl-2 col-md-2 col-sm-2 col-2' style={{ 'textAlign': 'center' }}>
                                          <div className='award-img'>
                                             <span className='award-text'>{(page-1)*50+index + 1}</span>
                                          </div>
                                       </div>
                                       <div className='col-xl-10 col-md-10 col-sm-10 col-10' style={{ 'display': 'flex', 'margin': 'auto' }}>
                                          <img src={blogsite.icon} style={{ 'marginRight': '10px', 'width': '25px' }} />
                                          <span style={{ 'fontSize': '20px', 'color': '#444' }}><a href={blogsite.URL}>{blogsite.title}</a></span>
                                       </div>
                                    </div>
                                 </Card.Header>
                                 <Card.Body>
                                    <div className='row'>
                                       <div className='col-xl-4 text-center'>
                                          <a href={blogsite.URL}><img src={'http://localhost:3000/data/uploads/'+ blogsite.image} alt="" width={'100px'} height={'130px'} /></a>
                                          <br />
                                          <br />
                                          <Link to={`/blog/${blogsite._id}`} ><Button variant="outline-info" >記事一覧</Button></Link>
                                       </div>
                                       <div className='col-xl-8'>
                                          <ListGroup variant="flush">
                                             {blogsite.blogs.map((blog, index) => (
                                                <ListGroup.Item key={index} className='text-nowrap-overflow'><Icon.ChevronRight color="royalblue" style={{ 'marginRight': '10px' }} /><a href={blog.blog_link}>{blog.blog_title}</a></ListGroup.Item>
                                             ))}
                                          </ListGroup>
                                       </div>
                                    </div>
                                 </Card.Body>
                              </Card>
                           </div>
                        ))
                     }
                  </div>
               </div>
            </section>
         }
         <br />
         <br />
         <section className="text-center">{ pageBtn(total, genre_id) }</section>
         <br />
      </>
   );
}

Main.propTypes = {
   loadingNewBlog: PropTypes.bool,
   loadingBlogsite: PropTypes.bool,
   blogsites: PropTypes.array,
   newBlogs: PropTypes.array,
   total: PropTypes.number,
   dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
   return {
      loadingBlogsite: state.reducerHome.loadingBlogsite,
      loadingNewBlog: state.reducerHome.loadingNewBlog,
      blogsites: state.reducerHome.blogsites,
      newBlogs: state.reducerHome.newBlogs,
      total: state.reducerHome.total,
   }
}

export default connect(mapStateToProps)(Main)