import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MediaProvider } from './context/MediaContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AdminLayout from './components/admin/AdminLayout';

// Pages
import Home from './pages/Home';
import Browse from './pages/Browse';
import MovieDetails from './pages/MovieDetails';
import SeriesDetails from './pages/SeriesDetails';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ManageMovies from './pages/admin/ManageMovies';
import ManageSeries from './pages/admin/ManageSeries';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

// Admin Route Component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

// Main Layout Component
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <MediaProvider>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="movies" element={<ManageMovies />} />
              <Route path="series" element={<ManageSeries />} />
            </Route>
            
            {/* Main Routes */}
            <Route 
              path="/" 
              element={
                <MainLayout>
                  <Home />
                </MainLayout>
              } 
            />
            
            <Route 
              path="/movies" 
              element={
                <MainLayout>
                  <Browse />
                </MainLayout>
              } 
            />
            
            <Route 
              path="/series" 
              element={
                <MainLayout>
                  <Browse />
                </MainLayout>
              } 
            />
            
            <Route 
              path="/search" 
              element={
                <MainLayout>
                  <Browse />
                </MainLayout>
              } 
            />
            
            <Route 
              path="/movie/:id" 
              element={
                <MainLayout>
                  <MovieDetails />
                </MainLayout>
              } 
            />
            
            <Route 
              path="/series/:id" 
              element={
                <MainLayout>
                  <SeriesDetails />
                </MainLayout>
              } 
            />
            
            {/* Catch-all route */}
            <Route
              path="*"
              element={
                <MainLayout>
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold mb-2">Page non trouvée</h2>
                      <p className="text-gray-400">La page que vous recherchez n'existe pas.</p>
                    </div>
                  </div>
                </MainLayout>
              }
            />
          </Routes>
        </MediaProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;