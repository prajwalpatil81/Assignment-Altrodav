import { useState, useEffect } from 'react';
import api from '../services/api';
import { format } from 'date-fns';

function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/api/bookings/mybookings');
        setBookings(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">You haven't booked any activities yet.</p>
          <a
            href="/activities"
            className="mt-4 inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
          >
            Browse Activities
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{booking.activity.title}</h2>
                <p className="text-gray-600 mb-4">{booking.activity.description}</p>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Location:</span> {booking.activity.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Date & Time:</span>{' '}
                    {format(new Date(booking.activity.dateTime), 'MMM dd, yyyy h:mm a')}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Booked on:</span>{' '}
                    {format(new Date(booking.createdAt), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookingsPage;