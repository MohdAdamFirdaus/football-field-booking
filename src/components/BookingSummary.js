import React from 'react';

const BookingSummary = ({ booking }) => {
  if (!booking) return null;

  return (
    <div className="booking-summary">
      <h2>Booking Summary</h2>
      <p><strong>Location:</strong> {booking.location}</p>
      <p><strong>Date:</strong> {booking.date}</p>
      <p><strong>Time Range:</strong> {booking.timeRange}</p>
      <p><strong>Referee Name:</strong> {booking.refName}</p>
      <p><strong>Total Price:</strong> {booking.price}</p>
    </div>
  );
};

export default BookingSummary;
