import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CRow,
} from '@coreui/react'
import { connect } from 'react-redux'
import { actionFetchGenres, actionAddGenre } from 'src/reducers/genre/action'
import useCookies from '@react-smart/react-cookie-service';
import PropTypes from 'prop-types';

const Genre = (props) =>  {
  const [name, setName] = useState('');

  useEffect(() => {
    const { dispatch } = props
    dispatch(actionFetchGenres())
  }, []);

  const onClickAddBtn = () => {
    if(name === '') return
    
    const { dispatch } = props
    dispatch(actionAddGenre(name))
    setName('')
  }

  const onChangeInput = (e) => {
    e.preventDefault()
    let name = e.target.value
    setName(name)
  }

  const { getCookie } = useCookies();
  let auth = getCookie('auth');
  if(auth === 'false'){
    return <Navigate to='/login' />
  }

  const { genres } = props
  
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>ジャンル</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row gx-3 gy-2 align-items-center">
              <CCol sm={3}>
                <CFormInput id="name" name="name" placeholder="ジャンル" onChange={onChangeInput} />
              </CCol>
              <CCol xs="auto">
                <CButton type="button" onClick={onClickAddBtn}>加算</CButton>
              </CCol>
            </CForm>
            <br />
            <CTable striped className='text-center'>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ジャンル</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  genres.map((genre, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{genre.name}</CTableDataCell>
                    </CTableRow>
                  ))
                }
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

Genre.propTypes = {
  loadingGenre: PropTypes.bool,
  genres: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loadingGenre: state.reducerGenre.loadingGenre,
    genres: state.reducerGenre.genres,
  }
}

export default connect(mapStateToProps)(Genre)
