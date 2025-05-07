import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="text-blue-500 font-bold text-xl">Rebz Seven</Link>
            <p className="mt-3 text-gray-400 text-sm">
              Votre plateforme de streaming pour découvrir les meilleurs films et séries.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-gray-400 hover:text-white transition-colors">
                  Films
                </Link>
              </li>
              <li>
                <Link to="/series" className="text-gray-400 hover:text-white transition-colors">
                  Séries
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-medium mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/genre/action" className="text-gray-400 hover:text-white transition-colors">
                  Action
                </Link>
              </li>
              <li>
                <Link to="/genre/aventure" className="text-gray-400 hover:text-white transition-colors">
                  Aventure
                </Link>
              </li>
              <li>
                <Link to="/genre/science-fiction" className="text-gray-400 hover:text-white transition-colors">
                  Science-Fiction
                </Link>
              </li>
              <li>
                <Link to="/genre/romance" className="text-gray-400 hover:text-white transition-colors">
                  Romance
                </Link>
              </li>
              <li>
                <Link to="/genre/drame" className="text-gray-400 hover:text-white transition-colors">
                  Drame
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Legal */}
          <div>
            <h3 className="text-lg font-medium mb-4">Aide & Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="text-gray-400 hover:text-white transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Rebz Seven. Tous droits réservés.</p>
          <p className="mt-1">Ce site est un projet de démonstration et n'est pas un service réel de streaming.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;