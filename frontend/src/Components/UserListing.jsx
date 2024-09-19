import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card'; // Import the Card component
import '../Styles/prioritylisting.css';
import add from '../assests/add.svg';
import dots from '../assests/dots.svg';


function UserListing() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        setTickets(res.data.tickets);
        setUsers(res.data.users);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTicketsByPriority = (priority) => tickets.filter(ticket => ticket.priority === priority);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='priority-container'>
      {users.map(user => (
        <div key={user.id} className='priority-column'>
          <div className='container-1'>
            <div className='container-2'>
                
              <span>{user.name}</span>
              <span>{tickets.filter(ticket => ticket.userId === user.id).length}</span>
            </div>
            <div className='container-3'>
              <img src={add} alt="Add" />
              <img src={dots} alt="More options" />
            </div>
          </div>
          {tickets.filter(ticket => ticket.userId === user.id).map(ticket => (
            <Card
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              tag={ticket.tag}
              priority={ticket.priority}
              status={ticket.status}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default UserListing;
