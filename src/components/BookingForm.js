import React, { useState } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const BookingForm = ({ onBook, userId }) => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [timeRange, setTimeRange] = useState('');
  const [refName, setRefName] = useState('');
  const [price, setPrice] = useState('RM0');
  const [fieldImage, setFieldImage] = useState('');
  const [isDateAvailable, setIsDateAvailable] = useState(true); // State to track date availability

  const locations = [
    { value: 'Rhino Kampung Baru', img: 'pic/rkb.jpg' },
    { value: 'UM Park', img: 'pic/umpark.jpg' },
    { value: 'Rhino Shah Alam', img: 'pic/rshahalam.jpg' },
  ];

  const timeRanges = [
    { value: '5-7pm', price: 400 },
    { value: '7-9pm', price: 450 },
    { value: '9-11pm', price: 450 },
    { value: '11-1am', price: 500 },
  ];

  const referees = ['Safee Sali', 'Faizal Halim', 'Zainal Abidin'];

  const updateFieldImage = (selectedLocation) => {
    const locationObj = locations.find(loc => loc.value === selectedLocation);
    if (locationObj) {
      setFieldImage(locationObj.img);
      setLocation(selectedLocation);
    } else {
      setFieldImage('');
    }
  };

  const calculatePrice = (selectedTimeRange) => {
    const timeRangeObj = timeRanges.find(tr => tr.value === selectedTimeRange);
    if (timeRangeObj) {
      setPrice(`RM${timeRangeObj.price}`);
      setTimeRange(selectedTimeRange);
    } else {
      setPrice('RM0');
    }
  };

  const handleBook = async () => {
    if (!date || !timeRange) {
      alert("Please select a date and time range.");
      return;
    }

    // Query Firestore to check if the selected date and time range is available
    const bookingsRef = collection(db, 'bookings');
    const q = query(bookingsRef, 
      where('date', '==', date),
      where('timeRange', '==', timeRange)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setIsDateAvailable(false); // Date and time range is not available
      return;
    }

    setIsDateAvailable(true); // Date and time range is available

    const bookingDetails = { userId, location, date, timeRange, refName, price };
    
    try {
      const docRef = await addDoc(bookingsRef, bookingDetails);
      alert('Booking successful, ID: ' + docRef.id);
      onBook(bookingDetails);
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('Booking failed.');
    }
  };

  const handleReset = () => {
    setLocation('');
    setDate('');
    setTimeRange('');
    setRefName('');
    setPrice('RM0');
    setFieldImage('');
    setIsDateAvailable(true); // Reset date availability status
    onBook(null);
  };

  return (
    <div>
      <h1>FieldZone Booking</h1>
      {fieldImage && <img src={fieldImage} alt="Field" className="field-image" />}
      <div className="form-group">
        <label>Select Location:</label>
        <select value={location} onChange={(e) => updateFieldImage(e.target.value)}>
          <option value="">Select Location</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc.value}>{loc.value}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Select Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Select Time Range:</label>
        <select value={timeRange} onChange={(e) => calculatePrice(e.target.value)}>
          <option value="">Select Time Range</option>
          {timeRanges.map((tr, index) => (
            <option key={index} value={tr.value}>{tr.value} (RM{tr.price})</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Select Referee:</label>
        <select value={refName} onChange={(e) => setRefName(e.target.value)}>
          <option value="">Select Referee</option>
          {referees.map((ref, index) => (
            <option key={index} value={ref}>{ref}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Total Price:</label>
        <p>{price}</p>
      </div>
      {!isDateAvailable && (
        <p className="error-message">This date and time range is not available. Please choose another.</p>
      )}
      <button onClick={handleBook} disabled={!isDateAvailable}>Book Now</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default BookingForm;
