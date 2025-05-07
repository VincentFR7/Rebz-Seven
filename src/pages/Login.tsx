import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <Link to="/" className="text-blue-500 font-bold text-2xl">Rebz Seven</Link>
          <h1 className="text-xl font-bold text-white mt-4">Connexion</h1>
          <p className="text-gray-400 mt-2">
            Connectez-vous pour accéder à votre compte
          </p>
        </div>
        
        <LoginForm />
        
        <div className="mt-6 text-center text-gray-400">
          <p>
            Vous n'avez pas de compte?{' '}
            <Link to="/register" className="text-blue-400 hover:underline">
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;