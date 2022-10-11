// import PrivateRoute from '../components/PrivateRoute';
import Home from '../components/Home';
import indexStyles from '../styles/index.module.css';
import React, { useState, useEffect } from 'react'
import Layout from '../components/layout';

function Index() {
  return (
    <Layout>
      <div className={indexStyles.App}>  
            <Home />
      </div>
    </Layout>
  );
}

export default Index;
