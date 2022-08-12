import React from 'react'
import { Navigate } from 'react-router-dom'
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import PropTypes from 'prop-types';
import { cilLockUnlocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { connect } from 'react-redux'
import { ActionLogout } from '../../reducers/login/action'
import avatar from './../../assets/images/avatars/1.jpg'

const AppHeaderDropdown = (props) => {

  const onClickSignout = () => {
    const { dispatch } = props
    dispatch(ActionLogout())
  }

  const { loadingLogout } = props

  if(loadingLogout){
    return <Navigate to='/login' />
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
        <CDropdownItem href="#" onClick={onClickSignout}>
          <CIcon icon={cilLockUnlocked} className="me-2" />
          ログアウト
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

AppHeaderDropdown.propTypes = {
  loadingLogout: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loadingLogout: state.reducerLogin.loadingLogout,
  }
}

export default connect(mapStateToProps)(AppHeaderDropdown)
