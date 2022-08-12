import { useEffect, useState } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
// import Header from './Header';
// import Main from './Main';
// import Footer from './Footer';

import Signup from './Signup';

// import '../styles/App.css';

function App() {
  return (
    <AuthProvider>
      <div className={`App`}>
        {/* <Header />
        <Main />
        <Footer /> */}
        <Signup />
      </div>
    </AuthProvider>
  );
}

export default App;
