import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// Create the context
const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await api.get('/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (err) {
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  // Register user
  const register = async (formData) => {
    const response = await api.post('/api/users/register', formData);
    localStorage.setItem('token', response.data.token);
    await checkUserLoggedIn();
  };

  // Login user
  const login = async (formData) => {
    const response = await api.post('/api/users/login', formData);
    localStorage.setItem('token', response.data.token);
    await checkUserLoggedIn();
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export the context
export default AuthContext;