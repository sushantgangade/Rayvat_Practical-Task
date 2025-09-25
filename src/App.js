import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import CRUDPage from './pages/CRUDPage';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector(state => state.auth);

  const PrivateRoute = ({ children }) => user ? children : <Navigate to="/login" />;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
        <Route path="/crud" element={<PrivateRoute><CRUDPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to={user ? "/products" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
