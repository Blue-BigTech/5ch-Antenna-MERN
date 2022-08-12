import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilList, cilNotes, cilPuzzle } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: '主要',
  },
  {
    component: CNavItem,
    name: 'ジャンル',
    to: '/genre',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'サイト',
    to: '/urls',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '記事',
    to: '/blogs',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
]

export default _nav
