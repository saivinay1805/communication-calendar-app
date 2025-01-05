// src/components/user/CalendarView.jsx
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styles from './CalendarView.module.css';


const CalendarView = ({ communications, companies, communicationMethods }) => {

  const events = communications.map(comm => {
      const company = companies.find(c => c.id === comm.companyId)
      const method = communicationMethods.find(m => m.id === comm.methodId)
    return {
    title: `${company?.name || 'N/A'} - ${method?.name || 'N/A'}`,
    start: comm.date,
     extendedProps: {
        notes: comm.notes
        }
  }});


  return (
    <div className={styles.calendarContainer}>
          <h2>Communication Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
          events={events}
         eventContent={renderEventContent}
          eventMouseEnter={handleEventMouseEnter}
          eventMouseLeave={handleEventMouseLeave}
      />
    </div>
  );
    function renderEventContent(eventInfo) {
        return (
            <div className={styles.eventContent} >
                <b>{eventInfo.event.title}</b>
            </div>
        )
    }

  function handleEventMouseEnter (info) {
      info.el.setAttribute('title', info.event.extendedProps.notes || 'No notes' )
    }

     function handleEventMouseLeave(info) {
          info.el.removeAttribute('title');
    }


};

export default CalendarView;