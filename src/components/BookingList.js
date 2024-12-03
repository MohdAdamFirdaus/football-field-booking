import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

const BookingList = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const q = query(collection(db, 'bookings'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const bookingsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [userId]);

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  return (
    <div>
      <h2>Booking List</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time Range</th>
            <th>Referee Name</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.location}</td>
              <td>{booking.date}</td>
              <td>{booking.timeRange}</td>
              <td>{booking.refName}</td>
              <td>{booking.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
