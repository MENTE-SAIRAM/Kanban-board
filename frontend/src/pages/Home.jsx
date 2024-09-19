import React, { useState } from 'react';
import displayIcon from '../assests/Display.svg'; 
import down from '../assests/down.svg';
import '../Styles/home.css';
import Statuslisting from '../Components/Statuslisting';
import UserListing from '../Components/UserListing';
import Prioritylisting from '../Components/Prioritylisting';

function Home() {
  const [display, setDisplay] = useState(false); 
  const [groupingDropdown, setGroupingDropdown] = useState(false);  
  const [listing, setListing] = useState("Status");

  const toggleDropdown = () => {
    setDisplay((prevDisplay) => !prevDisplay);
  };

  const toggleGroupingDropdown = (e) => {
    e.stopPropagation();
    setGroupingDropdown((prev) => !prev);
  };
  const handleOptionSelect = (option) => {
    setListing(option);     
    setGroupingDropdown(false);  
    setDisplay(false); 
  };

  return (
    <>
      <div className='nav' style={display ? { boxShadow: '1px 2px 5px 0px rgba(0,0,0,0.68)' } : null}>
        <div className="navitems" onClick={toggleDropdown}>
          <img src={displayIcon} alt="Display icon" />
          <span>Display</span>
          <img src={down} alt="Dropdown icon" />
        </div>
      </div>
      
      {display && (
        <div className="dropdown">
          <div className="dropdown-item">
            <div onClick={toggleGroupingDropdown} className="dropdown-header">
              <span>Grouping</span>
              <div className='dropdown-button'>
                <span>{listing}</span>
                <img src={down} alt="Arrow" />
              </div>
            </div>

            {groupingDropdown && (
              <div className="nested-dropdown">
                <div className="dropdown-option" onClick={() => handleOptionSelect("Status")}>Status</div>
                <div className="dropdown-option" onClick={() => handleOptionSelect("User")}>User</div>
                <div className="dropdown-option" onClick={() => handleOptionSelect("Priority")}>Priority</div>
              </div>
            )}
          </div>

          <div className="dropdown-item">
            <div className="dropdown-header">
              <span>Ordering</span>
              <div>
                <span>Priority</span>
                <img src={down} alt="Arrow" />
              </div>
            </div>
          </div>
        </div>
      )}

      {listing === "Status" ? (
        <Statuslisting />
      ) : listing === "User" ? (
        <UserListing />
      ) : (
        <Prioritylisting />
      )}
    </>
  );
}

export default Home; 