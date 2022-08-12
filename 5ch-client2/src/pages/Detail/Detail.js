import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import { actionFetchBlogsByBlogsite } from '../../reducers/home/action'
import { Table, Button, Spinner } from 'react-bootstrap';

const Detail = (props) => {
   const params = useParams();

   useEffect(() => {
      const { dispatch } = props
      dispatch(actionFetchBlogsByBlogsite(0, params.id))
   }, []);

   const onChangePage = (e, blogsiteId) => {
      const curPage = e.target.value
      const { dispatch } = props
      dispatch(actionFetchBlogsByBlogsite(curPage, blogsiteId))
   }

   const pageBtn = (total) => {
      const btnNum = total%50?(parseInt(total/50) + 1):total/50
      var btnItems = [];
      for (var i = 0; i < btnNum; i++) {
         if(i === btnNum - 1){
            btnItems.push(<Button key={i} value={i} onClick={(e) => onChangePage(e, params.id)} variant="primary">{i*50 + 1} ~ {total}</Button>);
            btnItems.push(' ')
         } else {
            btnItems.push(<Button key={i} value={i} onClick={(e) => onChangePage(e, params.id)} variant="primary">{i*50 + 1} ~ {2}</Button>);
            btnItems.push(' ')
         }
      }
      return btnItems
   }

   const { loadingBlog, blogs, total } = props
   var blogsite_title = ''
   var blogsite_link = ''
   if(blogs.length !== 0){
      blogsite_title = blogs[0].blogsite_id.title
      blogsite_link = blogs[0].blogsite_id.URL
   }
   
   return (
      <>
         <section style={{ 'marginTop': '50px' }}>
            <div className="container">
               <div className="row">
                  <div className="col-xl-12">
                     <div className="appoinment-box-2" style={{ 'marginTop': '0px' }}>
                        <div className='new-blogs-header'>
                           <span style={{ 'fontSize': '20px', 'marginLeft': '50px' }}><a style={{'color': 'white'}} href={blogsite_link}>{blogsite_title}</a></span>
                        </div>
                        {
                           loadingBlog
                           ?
                           <div className='text-center'>
                              <Spinner animation="border" variant="primary" />
                           </div>
                           :
                           <div className="appoinment-box-content" style={{ 'padding': '0' }}>
                              <div style={{ 'height': '100%', 'overflowY': 'scroll' }}>
                              <Table striped responsive>
                                 <tbody>
                                    {
                                       blogs.map((blog, index) => (
                                          <tr key={index}>
                                             <td width={'15%'} className="text-center">{blog.blog_date.slice(5, 7)}月{blog.blog_date.slice(8, 10)}日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{blog.blog_date.slice(11, 16)}</td>
                                             <td width={'65%'}><img src={blog.blogsite_id.icon} style={{ 'marginRight': '10px', 'width': '25px' }} /><a href={blog.link}>{blog.title}</a></td>
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
         <section className="text-center">{ pageBtn(total) }</section>
         <br />
      </>
   );
}

Detail.propTypes = {
   loadingBlog: PropTypes.bool,
   blogs: PropTypes.array,
   total: PropTypes.number,
   blogsitedata: PropTypes.object,
   dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
   return {
      loadingBlog: state.reducerHome.loadingBlog,
      blogs: state.reducerHome.blogs,
      total: state.reducerHome.total,
      blogsitedata: state.reducerHome.blogsitedata,
   }
}

export default connect(mapStateToProps)(Detail)