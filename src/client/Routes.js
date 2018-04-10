import React from 'react';
import HomePage from '../client/pages/HomePage';
import UsersListPage from '../client/pages/UsersListPage';
import ImageListPage from '../client/pages/ImageListPage';
import EverFiPage from '../client/pages/EverFiPage';

export default [
  {
    ...HomePage,
    path: '/',
    exact: true
  },
  {
    ...UsersListPage,
    path: '/users'
  },
  {
    ...ImageListPage,
    path: '/imageList'
  },
  {
    ...EverFiPage,
    path: '/everFi'
  }
];
