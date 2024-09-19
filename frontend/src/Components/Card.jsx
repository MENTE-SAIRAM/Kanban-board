import React, { useState, useEffect } from 'react';
import '../Styles/card.css';
import img from '../assests/grey.svg'; // Default tag icon
import high from '../assests/high.svg';
import dots from '../assests/dots.svg';
import low from '../assests/low.svg';
import medium from '../assests/medium.svg';
import nopriority from '../assests/No-priority.svg';
import lowpriority from '../assests/lowpriority.svg';
import backlog from '../assests/Backlog.svg';
import done from '../assests/Done.svg';
import Todo from '../assests/To-do.svg';
import inprogress from '../assests/in-progress.svg';
function Card({ id, title, tag, priority, status }) {
  const featureText = tag.join(', ');
  const [image, setImage] = useState(img);
  const [statusImg, setStatusImg] = useState(null); // Changed NULL to null

  // useEffect to update the image based on status
  useEffect(() => {
    switch (status) {
      case 'Backlog':
        setStatusImg(backlog);
        break;
      case 'Done':
        setStatusImg(done);
        break;
      case 'In progress':
        setStatusImg(inprogress);
        break;
      case 'Todo':
        setStatusImg(Todo);
        break;
      case 'Canceled':
        setStatusImg(backlog);
        break;
      default:
        setStatusImg(null); 
    }
  }, [status]);

  // useEffect to update the image based on priority
  useEffect(() => {
    switch (priority) {
      case 0:
        setImage(nopriority);
        break;
      case 1:
        setImage(low);
        break;
      case 2:
        setImage(high);
        break;
      case 3:
        setImage(medium);
        break;
      case 4:
        setImage(lowpriority);
        break;
      default:
        setImage(img); // fallback to default image
    }
  }, [priority]);

  return (
    <div className='container'>
      <div className="id">
        <p>{id}</p>
        <div className='profile'>
          <span>AS</span>
        </div>
      </div>
      <div className="title">
        {statusImg && <img src={statusImg} alt="Status icon" />} {/* Conditional rendering */}
        {title}
      </div>
      <div className="tag">
        <img src={image} alt="Tag icon" />
        <div className='feature'>
          <span className="dot"></span>
          <span>{featureText}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
