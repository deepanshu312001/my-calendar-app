// pages/show-events.js
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getEventsInRange } from '../lib/api';
import styles from '../styles/Calendar.module.css';

const ShowEventsPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const handleFetchEvents = async () => {
    try {
      const start = startDate.toISOString().split('T')[0];
      const end = endDate.toISOString().split('T')[0];
      const events = await getEventsInRange(start, end);
      setEvents(events);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  return (
    <div className={styles.calendarContainer}>
      <h1>Show Events</h1>

      <div className={styles.section}>
        <h2>Select Date Range</h2>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy-MM-dd"
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy-MM-dd"
          placeholderText="End Date"
        />
        <button onClick={handleFetchEvents} className={styles.button}>Fetch Events</button>
      </div>

      <div className={styles.section}>
        <h2>Events</h2>
        <ul className={styles.list}>
          {events.map((event, index) => (
            <li key={index} className={styles.event}>
              Start: {event.start}, Duration: {event.duration} minutes
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowEventsPage;
