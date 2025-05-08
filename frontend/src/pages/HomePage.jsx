import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to MeetX Activity Booking
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Discover and book exciting activities in your area
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          to="/activities"
          className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
        >
          Browse Activities
        </Link>
        {!user && (
          <Link
            to="/register"
            className="bg-white hover:bg-gray-100 text-primary-600 font-bold py-3 px-6 border border-primary-600 rounded-lg transition duration-200"
          >
            Sign Up
          </Link>
        )}
      </div>
    </div>
  );
}

export default HomePage;