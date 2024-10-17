import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';


// Here, we display our Navbar
export default function Navbar() {
  // We are pulling in the user's info but not using it for now.
  // Warning disabled: 
  // eslint-disable-next-line
  const [user, setUser] = useState({})

  useEffect(() => {
  setUser(getUserInfo())
  }, [])
  
  // if (!user) return null   - for now, let's show the bar even not logged in.
  // we have an issue with getUserInfo() returning null after a few minutes
  // it seems.
  return (
    <ReactNavbar className="border border-white bg-[#301952]">
    <Container>
      <Nav className=" text-lg justify-center flex-grow space-x-20">
        <Nav.Link className="text-white hover:bg-[#5B3B8C]" href="/">Start</Nav.Link>
        <Nav.Link className="text-white hover:bg-[#5B3B8C]" href="/home">Home</Nav.Link>
        <Nav.Link className="text-white hover:bg-[#5B3B8C]" href="/findlocalreps">Reps</Nav.Link>
      </Nav>
    </Container>
  </ReactNavbar>

  );
}