import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate('/');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simuler l'envoi d'un email de réinitialisation
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResetSuccess(true);
    } catch (err) {
      setError('Une erreur est survenue lors de l\'envoi de l\'email');
    } finally {
      setIsLoading(false);
    }
  };

  if (showResetForm) {
    return (
      <div className="space-y-4">
        {resetSuccess ? (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded text-green-700">
            <p>Un email de réinitialisation a été envoyé à {resetEmail}.</p>
            <button
              onClick={() => {
                setShowResetForm(false);
                setResetSuccess(false);
                setResetEmail('');
              }}
              className="text-blue-400 hover:underline mt-2"
            >
              Retour à la connexion
            </button>
          </div>
        ) : (
          <form onSubmit={handleResetPassword}>
            <h3 className="text-lg font-medium text-white mb-4">Réinitialisation du mot de passe</h3>
            
            {error && (
              <div className="p-3 rounded bg-red-500/10 border border-red-500/30 text-red-700 mb-4">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                id="resetEmail"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Button 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
              </Button>
              
              <button
                type="button"
                onClick={() => setShowResetForm(false)}
                className="text-sm text-gray-400 hover:text-white"
              >
                Retour à la connexion
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded bg-red-500/10 border border-red-500/30 text-red-700">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowResetForm(true)}
          className="text-sm text-blue-400 hover:underline"
        >
          Mot de passe oublié ?
        </button>
      </div>
      
      <div className="pt-2">
        <Button 
          type="submit" 
          fullWidth 
          disabled={isLoading}
        >
          {isLoading ? 'Connexion en cours...' : 'Se connecter'}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;