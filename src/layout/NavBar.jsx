import React, { useEffect } from 'react';

const { M } = window;

const NavBar = () => {
  useEffect(() => {
    // dropdown
    const elem = document.querySelectorAll('.dropdown-button');
    const options = {
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false, // Stops event propagation
      container: '.dropdown-trigger btn',
      draggable: false,
    };
    M.Dropdown.init(elem, options);
  }, []);
  return (
    <nav id="header">
      <div className="nav-wrapper">
        <div className="row">
          <div className="col s12">
            <ul id="dropdown1" className="dropdown-content">
              <li>
                <a href="www.example.com">
                  <i className="far fa-user-circle my-icon" />
                  {' '}
Profiles
                </a>
              </li>
              <li>
                <a href="www.example.com">
                  <i className="fas fa-cog my-icon" />
                  {' '}
Settings
                </a>
              </li>
              <li className="divider" />
              <li>
                <a href="www.example.com">
                  <i className="fas fa-sign-out-alt my-icon" />
                  {' '}
Logout
                </a>
              </li>
            </ul>
            <ul id="dropdown2" className="dropdown-content">
              <li><a href="www.example.com"> Notification</a></li>
              <li className="divider" />
              <li><a href="www.example.com"> More</a></li>
            </ul>
            <a href="www.example.com" data-target="sidenav-1" className="left sidenav-trigger hide-on-medium-and-up">
              <i
                className="material-icons"
              >
menu
              </i>
            </a>
            <a href="https://codepen.io/collection/nbBqgY" target="_blank" rel="noopener noreferrer" id="title" className="brand-logo">Materialize</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a href="www.example.com">
                  <i
                    className="material-icons dropdown-button"
                    data-activates="dropdown2"
                    data-target="dropdown2"
                  >
notifications
                  </i>
                </a>
              </li>
              <li>
                <a href="www.example.com">
                  <i
                    className="material-icons dropdown-button"
                    data-activates="dropdown1"
                    data-target="dropdown1"
                  >
account_circle
                  </i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
