import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CRow,
  CFormSelect,
  CSpinner
} from '@coreui/react'
import { connect } from 'react-redux'
import { CSmartPagination } from '@coreui/react-pro'
import useCookies from '@react-smart/react-cookie-service';
import PropTypes from 'prop-types';
import { actionFetchBlogs } from 'src/reducers/blog/action'
import { actionFetchGenres } from 'src/reducers/genre/action'

const Blogs = (props) =>  {
  const [genreId, setGenre] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const { dispatch } = props
    dispatch(actionFetchBlogs(0, ''))
    dispatch(actionFetchGenres())
  }, []);

  const onChangeSelectFilterByGenre = (e) => {
    let genreId = e.target.value;
    setGenre(genreId)
    const { dispatch } = props
    dispatch(actionFetchBlogs(0, genreId))
    setPage(1)
  }

  const onChangePage = (page) => {
    const { dispatch } = props
    if(page === 0) page = 1
    setPage(page)
    dispatch(actionFetchBlogs(page-1, genreId))
  }

  const { getCookie } = useCookies();
  let auth = getCookie('auth');
  if(auth === 'false'){
    return <Navigate to='/login' />
  }

  const { loadingBlog, blogs, genres, total } = props
  var totalPage = 0;
  if(total%50 === 0) totalPage = total/50
  else totalPage = total/50 + 1

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>記事</strong>
          </CCardHeader>
          <CCardBody className="text-center">
            <CRow>
              <CCol xs={2} style={{ textAlign: 'left' }}>
                <CFormSelect size="sm" className="mb-3" aria-label="Large select example" onChange={onChangeSelectFilterByGenre}>
                  <option key={'100'} value={''}>選択する</option>
                  {
                    genres.map((genre, index) => (
                      <option key={index} value={genre._id}>{genre.name}</option>
                    ))
                  }
                </CFormSelect>
              </CCol>
            </CRow>
            
              {
                loadingBlog
                ?
                <CSpinner color="primary"/>
                :
                <CTable striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">サイト</CTableHeaderCell>
                      <CTableHeaderCell scope="col">題名</CTableHeaderCell>
                      <CTableHeaderCell scope="col">リンク</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                  {
                    blogs.map((blog, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{(page-1)*50+index+1}</CTableHeaderCell>
                        <CTableDataCell>{blog.blogsite_id.title}</CTableDataCell>
                        <CTableDataCell>{blog.title}</CTableDataCell>
                        <CTableDataCell>{blog.link}</CTableDataCell>
                      </CTableRow>
                    ))
                  }
                  </CTableBody>
                </CTable>
              }
            <CSmartPagination
              align="end"
              activePage={page}
              pages={totalPage}
              onActivePageChange={onChangePage}
              style={{'cursor':'pointer'}}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

Blogs.propTypes = {
  loadingBlog: PropTypes.bool,
  blogs: PropTypes.array,
  genres: PropTypes.array,
  total: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loadingBlog: state.reducerBlog.loadingBlog,
    blogs: state.reducerBlog.blogs,
    total: state.reducerBlog.total,
    genres: state.reducerGenre.genres,
  }
}

export default connect(mapStateToProps)(Blogs)
