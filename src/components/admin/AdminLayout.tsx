import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Film, Tv, Home, Settings, BarChart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout: React.FC = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect non-admin users
  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return <div className="p-8 text-center">Redirection vers la page de connexion...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4 border-b border-gray-800">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-500">Rebz Seven</span>
          </Link>
          <div className="mt-2 text-sm text-gray-400">Panneau d'administration</div>
        </div>
        
        <nav className="mt-4">
          <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase">Général</div>
          
          <Link 
            to="/admin" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <BarChart size={18} className="mr-3" />
            <span>Tableau de bord</span>
          </Link>
          
          <div className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">Contenu</div>
          
          <Link 
            to="/admin/movies" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <Film size={18} className="mr-3" />
            <span>Films</span>
          </Link>
          
          <Link 
            to="/admin/series" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <Tv size={18} className="mr-3" />
            <span>Séries</span>
          </Link>
          
          <div className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">Navigation</div>
          
          <Link 
            to="/admin/settings" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <Settings size={18} className="mr-3" />
            <span>Paramètres</span>
          </Link>
          
          <Link 
            to="/" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <Home size={18} className="mr-3" />
            <span>Retour au site</span>
          </Link>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;