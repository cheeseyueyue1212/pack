'use strict'

// import React from 'react';
// import './index.less'
// import logo from './images/logo.png'
// import sv from './images/sv.svg'
// import ReactDom from 'react-dom'
// import { StrictMode, React } from 'react';
// import '../../common';
// import {a} from './tree-shaking'

const log = require('./images/logo.png')
const a = require('./tree-shaking')
require('./index.less')
const { StrictMode, React } = require('react')
const createRoot = require('react-dom/client')

const container = document.getElementsByClassName('css')[0]
const root = ReactDom.createRoot(container)



class Search extends React.Component {
  loadComponent() {
    import ('./text').then((Text)=> {
      console.log('text:', Text)
    });
  }

  render() {
    return <div className='search-text'>Search Text lalallaallalalal{a}
      <img src={ logo } onClick={this.loadComponent.bind(this)}></img>
      {/* <img src={ sv }></img> */}
    </div>
  }
}

// root.render(
//   <StrictMode>
//     <Search/>
//   </StrictMode>
// )

module.exports = <Search/>