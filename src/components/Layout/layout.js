import React from 'react'
import Header from '../Header/header';

const Layout = (props) => {
    return (
      <>
        <Header />
        {props.children}
      </>
    );
}
 
export default Layout;
