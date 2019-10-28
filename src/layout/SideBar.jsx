import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CollapsibleSideBar from './CollapsibleSideBar';

const { M } = window;
// loading view

const SideBar = () => {
  const [user, setUser] = useState({ name: '', mail: '', perfil: '' });
  useEffect(() => {
    // sidenav
    const options = {
      menuWidth: 200, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
      onOpen() { }, // A function to be called when sideNav is opened
      onClose() { }, // A function to be called when sideNav is closed
    };
    const sidenav = document.querySelector('.sidenav');
    M.Sidenav.init(sidenav, options);

    async function fetchData() {
      try {
        const getUser = await axios.post(`${process.env.USER_API_ENDPOINT}/getUser`, {});
        setUser(getUser.data);
      } catch (err) {
        setUser({ name: '', mail: '', perfil: '' });
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <ul id="sidenav-1" className="sidenav sidenav-fixed">
        <li>
          <div className="user-view">
            <div className="background" style={{ backgroundColor: '#757575' }} />
            <a href="/picture"><img alt="circle" className="circle" src={user.perfil} /></a>
            <a href="/name"><span className="white-text name">{user.name}</span></a>
            <a href="/mail"><span className="white-text email">{user.mail}</span></a>
          </div>
        </li>
        <CollapsibleSideBar />
      </ul>
    </>
  );
};
export default SideBar;
