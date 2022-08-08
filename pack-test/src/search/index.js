'use strict'

import React from 'react';
import './index.less'
import logo from './images/logo.png'
import sv from './images/sv.svg'
import { createRoot } from 'react-dom/client'
import {StrictMode} from 'react';
import '../../common';
import {a} from './tree-shaking'
// import 'babel-polyfill'

const container = document.getElementsByClassName('css')[0]
const root = createRoot(container)

const loadComponent = () => {
  import ('./text').then((Text)=> {
    console.log('text:', Text)
  });
}

root.render(
  <StrictMode>
    <div className='search-text'>Search121 Text lalallaall13131alalal{a}
        <img src={ logo } onClick={loadComponent}></img>
        <img src={ sv }></img>
      </div>
  </StrictMode>
)
