import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PortfolioHome from './pages/PortfolioHome';
import Footer from './components/Footer';
import Login from './components/admin/Login';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Dashboard from './components/admin/Dashboard';
import ProjectEditor from './components/admin/ProjectEditor';
import ManagerStudio from './components/admin/ManagerStudio';

function App() {
  return (
    <div className="min-h-screen transition-colors duration-500">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/projects/new" element={
            <ProtectedRoute>
              <ProjectEditor />
            </ProtectedRoute>
          } />
          <Route path="/admin/projects/edit/:id" element={
            <ProtectedRoute>
              <ProjectEditor />
            </ProtectedRoute>
          } />
          <Route path="/admin/studio" element={
            <ProtectedRoute>
              <ManagerStudio />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
