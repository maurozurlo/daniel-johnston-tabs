import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  Navigate
} from "react-router-dom";
import styled from "styled-components";

// Components
import ShowTab from "./Tabs/ShowTab";
import Home from "./Home/Index";
import Footer from "./Home/Footer";
import ShowAlbums from "./Albums/ShowAlbums";
import AlbumDetail from "./Albums/AlbumDetail";
import CreateTab from "./Tabs/CreateTab";
import logo from "./assets/brand.svg";

const Button = styled.button`
  background-color: transparent;
  text-transform: uppercase;
  border: 1px solid #000;
  display: inline-block;
  cursor: pointer;
  padding: 5px 10px;
  text-decoration: none;
  margin-right: 1em;

  &:hover {
    background-color: #f7f7f7;
  }
  &:active {
    position: relative;
    top: 1px;
  }
`;

const Logo = styled.img`
  height: 35px;
  margin-left: 1em;
`;

const App = () => {
  const [user, setUser] = useState({})
  
    return (
      <Router>
        <nav>
          <Logo src={logo} alt="logo" />
          <ul id="navbar" className="navbar">
            <li>
              <NavLink to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/bio">
                Bio
              </NavLink>
            </li>
            <li>
              <NavLink to="/albums">
                Albums
              </NavLink>
            </li>

              <li>
                <NavLink to="/create">Create tab</NavLink>
              </li>
            <li>
              <NavLink to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tabs/:id" element={<ShowTab/>} />
        <Route path="/albums" element={<ShowAlbums/>} />
        <Route path="/albums/:id" element={<AlbumDetail/>} />
        <Route path="/create" element={<CreateTab/>} />
        </Routes>
        <Footer />
      </Router>
    );
}

export default App;
