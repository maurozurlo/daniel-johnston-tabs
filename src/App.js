import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect
} from "react-router-dom";
import { auth } from "./Config/firebase";
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.signButtons = this.signButtons.bind(this);
  }

  signButtons(isLoggedIn) {
    if (isLoggedIn) {
      return <Button onClick={() => auth.signOut().then()}>Sign out</Button>;
    } else {
      return (
        <Button
          onClick={() =>
            auth
              .signInWithEmailAndPassword("mauro.e.zurlo@gmail.com", "sarlanga")
              .then(console.log)
          }
        >
          Sign in
        </Button>
      );
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) this.setState({ user });
    });
  }

  render() {
    let isLoggedIn = Boolean(this.state.user);

    return (
      <Router>
        <nav>
          <Logo src={logo} alt="logo" />
          <ul id="navbar" className="navbar">
            <li>
              <NavLink exact activeClassName="active" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="active" to="/bio">
                Bio
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/albums">
                Albums
              </NavLink>
            </li>

            {isLoggedIn && (
              <li>
                {" "}
                <NavLink to="/create">Create tab</NavLink>{" "}
              </li>
            )}
            <li>
              <NavLink exact activeClassName="active" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
          {this.signButtons(isLoggedIn)}
        </nav>
        <Route path="/" exact component={Home} />
        <Route path="/tabs/:id" component={ShowTab} />
        <Route path="/albums" exact component={ShowAlbums} />
        <Route path="/albums/:id" component={AlbumDetail} />
        {isLoggedIn ? (
          <Route path="/create" exact component={CreateTab} />
        ) : (
          <Redirect to="/" />
        )}
        <Footer />
      </Router>
    );
  }
}

export default App;
