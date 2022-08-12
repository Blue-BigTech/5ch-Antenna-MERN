import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { notification } from 'antd';
import CIcon from '@coreui/icons-react'
import useCookies from '@react-smart/react-cookie-service';
import { cilLockLocked, cilUser } from '@coreui/icons'
import { ActionLogin } from '../../reducers/login/action'

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeInput = (e) => {
    let name = e.target.name
    let value = e.target.value
    if(name === 'email') { setEmail(value) } 
    else { setPassword(value) }
  }

  const validationLogin = (email, password) => {
    if(email.length === 0) return false;
    if(password.length < 5) return false;
    return true;
  }

  const onClickLoginBtn = () => {
    if(!validationLogin(email, password)) 
      return notification.error({
        message: `エラー`,
        description:
          '入力エラー！',
        placement: 'bottomRight',
      });
    const { dispatch } = props
    dispatch(ActionLogin(email, password))
  }

  const { getCookie } = useCookies();
  let auth = getCookie('auth');
  if(auth === 'true'){
    return <Navigate to='/genre' />
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1 className="text-center">ログイン</h1>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                        id="email" 
                        name="email" 
                        placeholder="name@example.com"
                        onChange={onChangeInput}
                        required 
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        placeholder="パスワード"
                        onChange={onChangeInput}
                        required 
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12} className="text-center">
                        <CButton color="primary" className="px-4" onClick={onClickLoginBtn}>
                        ログイン
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

Login.propTypes = {
  loadingLogin: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loadingLogin: state.reducerLogin.loadingLogin,
  }
}

export default connect(mapStateToProps)(Login)
