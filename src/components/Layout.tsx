import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <h1 className="text-2xl font-bold text-primary-600">EduWeave</h1>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <span className="text-gray-700">
              Welcome, <strong>{user?.name}</strong>
            </span>
            <span className="text-sm px-3 py-1 rounded-full bg-primary-100 text-primary-700 font-medium">
              {user?.role === 'diet' ? 'DIET Official' : 'Teacher'}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>

          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t">
            <div className="text-gray-700 mb-4">
              Welcome, <strong>{user?.name}</strong>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-white font-bold mb-4">EduWeave</h3>
          <p className="text-sm">Empowering teachers, designing training with AI insights.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Dashboard</a></li>
            <li><a href="#" className="hover:text-white">Support</a></li>
            <li><a href="#" className="hover:text-white">Documentation</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Government</h4>
          <p className="text-sm">Ministry of Education<br />Department of Teacher Training</p>
        </div>
      </div>
      <div className="border-t border-gray-700 pt-8 text-center text-sm">
        <p>&copy; 2024 EduWeave. All rights reserved. Built for government education transformation.</p>
      </div>
    </div>
  </footer>
);
