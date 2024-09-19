import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card'; 
import '../Styles/prioritylisting.css';
import add from '../assests/add.svg';
import high from '../assests/in-progress.svg';
import dots from '../assests/dots.svg';
import low from '../assests/To-do.svg';
import medium from '../assests/Done.svg';
import nopriority from '../assests/Backlog.svg';
import lowpriority from '../assests/Cancelled.svg';

function Statuslisting() {
  const [tickets, setTickets] = useState([]);
  const [sortOptions, setSortOptions] = useState({});
  const [showSortOptions, setShowSortOptions] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        setTickets(res.data.tickets);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSortOptions(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSortToggle = (statusId) => {
    setShowSortOptions(prev => (prev === statusId ? null : statusId));
  };

  const getTicketsByStatus = (status) => {
    let filteredTickets = tickets.filter(ticket => ticket.status === status);
    const sortOption = sortOptions[status] || 'priority'; 

    if (sortOption === 'priority') {
      filteredTickets.sort((a, b) => b.priority - a.priority); // Descending order
    } else if (sortOption === 'title') {
      filteredTickets.sort((a, b) => a.title.localeCompare(b.title)); // Ascending order
    }

    return filteredTickets;
  };

  const statuses = [
    { id: 'Backlog', label: 'Back log', icon: nopriority },
    { id: 'Todo', label: 'Todo', icon: low },
    { id: 'In progress', label: 'In progress', icon: high },
    { id: 'Done', label: 'Done', icon: medium },
    { id: 'Canceled', label: 'Canceled', icon: lowpriority }
  ];

  return (
    <div className='priority-container' ref={containerRef}>
      {statuses.map(status => (
        <div key={status.id} className='priority-column'>
          <div className='container-1'>
            <div className='container-2'>
              <img src={status.icon} alt={`${status.label} status`} />
              <span>{status.label}</span>
              <span>{getTicketsByStatus(status.id).length}</span>
            </div>
            <div className='container-3'>
              <img
                src={add}
                alt="Add"
                onClick={() => handleSortToggle(status.id)} // Toggle sort options for specific column
              />
              <img src={dots} alt="More options" />
              {showSortOptions === status.id && (
                <div className='sort-options'>
                  <div onClick={() => setSortOptions(prev => ({
                    ...prev,
                    [status.id]: 'priority'
                  }))}>
                    Sort by Priority
                  </div>
                  <div onClick={() => setSortOptions(prev => ({
                    ...prev,
                    [status.id]: 'title'
                  }))}>
                    Sort by Title
                  </div>
                </div>
              )}
            </div>
          </div>
          {getTicketsByStatus(status.id).length > 0 ? (
            getTicketsByStatus(status.id).map(ticket => (
              <Card
                key={ticket.id}
                id={ticket.id}
                title={ticket.title}
                tag={ticket.tag}
                priority={ticket.priority}
              />
            ))
          ) : (
            <div></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Statuslisting;
