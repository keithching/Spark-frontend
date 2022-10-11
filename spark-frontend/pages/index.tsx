// import PrivateRoute from '../components/PrivateRoute';
import Home from '../components/Home';
import indexStyles from '../styles/index.module.css';
import React, { useState, useEffect } from 'react'
import Layout from '../components/layout';
import Head from 'next/head';

function Index() {
  return (
    <Layout>
      <Head>
        <title>Spark</title>
      </Head>
      <div className={indexStyles.App}>  
            <Home />
      </div>
    </Layout>
  );
}

export default Index;
