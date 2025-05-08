import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../contexts/AuthContext';
import { format } from 'date-fns';

function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get('/api/activities');
        setActivities(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const handleBookActivity = async (activityId) => {
    try {
      await api.post('/api/bookings', { activityId });
      alert('Activity booked successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Available Activities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <div key={activity._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{activity.title}</h2>
              <p className="text-gray-600 mb-4">{activity.description}</p>
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Location:</span> {activity.location}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Date & Time:</span>{' '}
                  {format(new Date(activity.dateTime), 'MMM dd, yyyy h:mm a')}
                </p>
              </div>
              {user && (
                <button
                  onClick={() => handleBookActivity(activity._id)}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
                >
                  Book Now
                </button>
              )}
              {!user && (
                <Link
                  to="/login"
                  className="block text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Login to Book
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivitiesPage;