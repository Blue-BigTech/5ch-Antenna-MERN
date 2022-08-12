import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CFormLabel,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CRow,
  CImage,
  CFormSelect,
  CSpinner,
} from '@coreui/react'
import { notification } from 'antd';
import CIcon from '@coreui/icons-react'
import useCookies from '@react-smart/react-cookie-service';
import { connect } from 'react-redux'
import { cilPlus, cilTrash } from '@coreui/icons'
import PropTypes from 'prop-types';
import { actionFetchBlogsites, actionAddBlogsite, actionDeleteBlogsite } from 'src/reducers/blogsite/action'
import { actionFetchGenres } from 'src/reducers/genre/action'

const Urls = (props) => {
  const [visible, setVisible] = useState(false);
  const [visibleDelete, setDelete] = useState(false);
  const [genreId, setGenre] = useState('');
  const [url, setUrl] = useState('');
  const [selectedBlogsiteId, setSelect] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const { dispatch } = props
    dispatch(actionFetchBlogsites(''))
    dispatch(actionFetchGenres())
  }, []);

  const setVisibleDelete = (selectedBlogsiteId, check) => {
    if(check) setSelect(selectedBlogsiteId)

    setDelete(true)
  }

  const onChangeSelectFilterByGenre = (e) => {
    let genre_Id = e.target.value;
    const { dispatch } = props
    dispatch(actionFetchBlogsites(genre_Id))
  }

  const onChangeSelectAdd = (e) => {
    let genreId = e.target.value;
    setGenre(genreId)
  }

  const onChangeUrl = (e) => {
    let url = e.target.value;
    setUrl(url)
  }

  const onChangeFile = (e) => {
    const fileList = e.target.files;

    if (!fileList) return;

    setImage(fileList[0])
  }

  const validate = (_url, _genreId, _image) => {
    if(_url === '') return false
    if(_genreId === '') return false
    if(_image === '') return false
    return true
  }

  const saveChange = () => {
    if(!validate(url, genreId, image)) 
      return notification.error({
        message: `エラー`,
        description:
          '入力エラー！',
        placement: 'bottomRight',
      });
    const { dispatch } = props
    dispatch(actionAddBlogsite(url, genreId, image))
    setVisible(false)
    setGenre('')
  }

  const deleteBlogsite = () => {
    const { dispatch } = props
    dispatch(actionDeleteBlogsite(selectedBlogsiteId))
    setDelete(false)
  }

  const { getCookie } = useCookies();
  let auth = getCookie('auth');
  if(auth === 'false'){
    return <Navigate to='/login' />
  }

  const { loadingBlogsite, blogsites, genres } = props
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>サイト</strong>
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
                <CCol xs={6}></CCol>
                <CCol xs={4}>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton
                      color="success"
                      className="me-md-2 text-light"
                      onClick={() => setVisible(true)}
                    >
                      <CIcon icon={cilPlus} />
                    </CButton>
                  </div>
                </CCol>
              </CRow>
              <br />
              {
                loadingBlogsite
                ?
                <CSpinner color="primary"/>
                :
                <CTable striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">題名</CTableHeaderCell>
                      <CTableHeaderCell scope="col">リンク</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Rss</CTableHeaderCell>
                      <CTableHeaderCell scope="col">画像</CTableHeaderCell>
                      <CTableHeaderCell scope="col">削除</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {
                      blogsites.map((blogsite, index) => (
                        <CTableRow key={index} style={{ verticalAlign: 'middle' }}>
                          <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                          <CTableDataCell>{blogsite.title}</CTableDataCell>
                          <CTableDataCell>{blogsite.URL}</CTableDataCell>
                          <CTableDataCell>{blogsite.RSS}</CTableDataCell>
                          <CTableDataCell>
                            <CImage fluid src={'http://localhost:3000/data/uploads/'+ blogsite.image} width={50} height={50} />
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="danger"
                              className="me-md-2 text-light"
                              value={blogsite._id}
                              onClick={(e) => setVisibleDelete(blogsite._id, true)}
                            >
                              <CIcon icon={cilTrash} />
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    }
                  </CTableBody>
                </CTable>
              }
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal alignment="center" visible={visible}>
        <CModalHeader closeButton={false}>
          <CModalTitle>URL を追加してください。</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardBody>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="URL" className="col-sm-2 col-form-label">
                    サイト :
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormSelect size="lg" className="mb-3" aria-label="Large select example" onChange={onChangeSelectAdd}>
                        <option key={'100'} value={''}>選択する</option>
                        {
                          genres.map((genre, index) => (
                            <option key={index} value={genre._id}>{genre.name}</option>
                          ))
                        }
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="URL" className="col-sm-2 col-form-label">
                      URL :
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput type="text" id="URL" placeholder="URL を追加してください。" onChange={onChangeUrl} />
                    </CCol>
                  </CRow><br />
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="URL" className="col-sm-2 col-form-label">
                    画像 :
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput accept="image/*" type="file" onChange={onChangeFile} id="formFile" />
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
          キャンセル
          </CButton>
          <CButton color="primary" onClick={saveChange}>保存</CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={visibleDelete}>
        <CModalHeader closeButton={false}>
          <CModalTitle>URL 削除</CModalTitle>
        </CModalHeader>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDelete(false)}>
          キャンセル
          </CButton>
          <CButton color="primary" onClick={deleteBlogsite} style={{ backgroundColor: '#e55353', borderColor: '#e55353' }}>
          削除
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

Urls.propTypes = {
  loadingBlogsite: PropTypes.bool,
  blogsites: PropTypes.array,
  loadingGenre: PropTypes.bool,
  genres: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loadingBlogsite: state.reducerBlogsite.loadingBlogsite,
    blogsites: state.reducerBlogsite.blogsites,
    loadingGenre: state.reducerGenre.loadingGenre,
    genres: state.reducerGenre.genres,
  }
}

export default connect(mapStateToProps)(Urls)
