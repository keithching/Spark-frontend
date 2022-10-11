import Head from 'next/head';
import React from 'react'
import dashboardStyles from '../styles/dashboard.module.css';
import Main from '../components/Main';
import Layout from '../components/layout';

export default function Dashboard() {  
    return (
    <Layout>
        <Head>
            <title>Dashboard</title>
        </Head>
        <div className={dashboardStyles.dashboard}>
            <Main />
        </div>
    </Layout>
  )
}
