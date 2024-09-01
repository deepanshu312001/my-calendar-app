// pages/book-event.js
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getFreeSlots, bookEvent } from '../lib/api';
import styles from '../styles/Calendar.module.css';

const timezones = [
  'Asia/Kolkata',
  'America/New_York',
  'Europe/London',
  'Australia/Sydney',
  'Asia/Tokyo'
];

const BookEventPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [duration, setDuration] = useState(30);
  const [timezone, setTimezone] = useState(timezones[0]);
  const [freeSlots, setFreeSlots] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleFetchSlots = async () => {
    try {
      const date = selectedDate.toISOString().split('T')[0];
      const slots = await getFreeSlots(date, timezone);
      setFreeSlots(slots);
    } catch (error) {
      console.error('Failed to fetch free slots:', error);
    }
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBookEvent = async () => {
    if (selectedSlot) {
      try {
        const result = await bookEvent(selectedSlot, duration);
        setBookingStatus(result); // Display the success message
        setSelectedSlot(null); // Clear the selected slot after booking
        handleFetchSlots(); // Refresh free slots
      } catch (error) {
        setBookingStatus('Failed to book event');
      }
    } else {
      setBookingStatus('No slot selected for booking');
    }
  };

  return (
    <div className={styles.calendarContainer}>
      <h1>Book Event</h1>

      <div className={styles.section}>
        <h2>Select Date</h2>
        <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
      </div>

      <div className={styles.section}>
        <h2>Duration (minutes)</h2>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          min="1"
        />
      </div>

      <div className={styles.section}>
        <h2>Timezone</h2>
        <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
          {timezones.map((tz, index) => (
            <option key={index} value={tz}>{tz}</option>
          ))}
        </select>
      </div>

      <div className={styles.section}>
        <button onClick={handleFetchSlots} className={styles.button}>Get Free Slots</button>
        <div className={styles.slotList}>
          {freeSlots.map((slot, index) => (
            <button
              key={index}
              onClick={() => handleSlotClick(slot)}
              className={styles.slot}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Book Event</h2>
        {selectedSlot && <p className={styles.statusMessage}>Selected Slot: {selectedSlot}</p>}
        <button onClick={handleBookEvent} className={styles.button}>Book Event</button>
        {bookingStatus && <p className={styles.statusMessage}>{bookingStatus}</p>}
      </div>
    </div>
  );
};

export default BookEventPage;
