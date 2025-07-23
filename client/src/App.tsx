import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Index from './pages/Index';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import Logout from './pages/Logout';
import AllUsersPage from './pages/AllUsersPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/users" element={<AllUsersPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
