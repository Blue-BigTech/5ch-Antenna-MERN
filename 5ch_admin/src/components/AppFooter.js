import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          Admin
        </a>
        <span className="ms-1">&copy; 2022 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5 c h まとめアンテナ</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
