import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card'; // Import the Card component
import '../Styles/prioritylisting.css';
import add from '../assests/add.svg';
import high from '../assests/high.svg';
import dots from '../assests/dots.svg';
import low from '../assests/low.svg';
import medium from '../assests/medium.svg';
import nopriority from '../assests/No-priority.svg';
import lowpriority from '../assests/lowpriority.svg';

function Prioritylisting() {
  const [tickets, setTickets] = useState([]);
  const [sortOptions, setSortOptions] = useState({}); // For tracking sorting by priority or title
  const [showSortOptions, setShowSortOptions] = useState(null); // For showing the sort options on click

  const containerRef = useRef(null);

  // Fetch the ticket data from the API
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

  // Sort toggle handler
  const handleSortToggle = (priorityId) => {
    setShowSortOptions(prev => (prev === priorityId ? null : priorityId));
  };

  // Sorting logic based on the selected priority
  const getTicketsByPriority = (priority) => {
    let filteredTickets = tickets.filter(ticket => ticket.priority === priority);

    const sortOption = sortOptions[priority] || 'priority'; // Default sorting by priority

    if (sortOption === 'priority') {
      filteredTickets.sort((a, b) => b.priority - a.priority); // Sort descending by priority
    } else if (sortOption === 'title') {
      filteredTickets.sort((a, b) => a.title.localeCompare(b.title)); // Sort ascending by title
    }

    return filteredTickets;
  };

  // Define priority types and icons
  const priorities = [
    { id: 0, label: 'No priority', icon: nopriority },
    { id: 1, label: 'Urgent', icon: low },
    { id: 2, label: 'High', icon: high },
    { id: 3, label: 'Medium', icon: medium },
    { id: 4, label: 'Low', icon: lowpriority },
  ];

  return (
    <div className='priority-container' ref={containerRef}>
      {priorities.map(priority => (
        <div key={priority.id} className='priority-column'>
          <div className='container-1'>
            <div className='container-2'>
              <img src={priority.icon} alt={`${priority.label} priority`} />
              <span>{priority.label}</span>
              <span>{getTicketsByPriority(priority.id).length}</span>
            </div>
            <div className='container-3'>
              <img
                src={add}
                alt="Add"
                onClick={() => handleSortToggle(priority.id)}
              />
              <img src={dots} alt="More options" />
              {showSortOptions === priority.id && (
                <div className='sort-options'>
                  <div onClick={() => setSortOptions(prev => ({
                    ...prev,
                    [priority.id]: 'priority'
                  }))}>
                    Sort by Priority
                  </div>
                  <div onClick={() => setSortOptions(prev => ({
                    ...prev,
                    [priority.id]: 'title'
                  }))}>
                    Sort by Title
                  </div>
                </div>
              )}
            </div>
          </div>
          {getTicketsByPriority(priority.id).length > 0 ? (
            getTicketsByPriority(priority.id).map(ticket => (
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

export default Prioritylisting;
