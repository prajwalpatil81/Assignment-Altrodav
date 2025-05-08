import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ActivitiesPage from './pages/ActivitiesPage';
import MyBookingsPage from './pages/MyBookingsPage';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/my-bookings" element={<PrivateRoute />}>
            <Route path="/my-bookings" element={<MyBookingsPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;