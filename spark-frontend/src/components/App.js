import { useEffect, useState } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Signup from './Signup';
import '../styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';

function App() {
  return (
      <div className={`App`}>
        <Router>
          <AuthProvider>
            <Header />
            <Routes>
              <Route index path="/" element={
                <>
                  <Main />
                  <Footer />
                </>
              } />
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                } 
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    
  );
}

export default App;
