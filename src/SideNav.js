import React from "react";
import styled from "styled-components";
import giroLogo from "./assets/logo.png";
import avatar from "./assets/avatar.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 10%;
  min-width: 230px;
  height: 100vh;
  background-image: linear-gradient(-135deg, #61c6ff 0%, #4591d7 100%);
  box-shadow: 6px 0 9px 0 #dceeff;
  position: sticky;
  top: 0;

  div {
    width: 80%;
  }

  .logo {
    width: 125px;
    height: auto;
  }

  .avatar {
    clip-path: circle(30px at center);
    width: 60px;
  }

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: %80;
  }

  & li {
    padding-bottom: 0.5em;
  }

  & a {
    font-weight: lighter;
    font-size: 1em;
    color: rgba(255, 255, 255, 0.7);
  }
  a:hover {
    font-weight: normal;
    font-size: 1em;
    color: white;
    cursor: pointer;
  }

  .selected {
    font-weight: normal;
    font-size: 1em;
    color: #ffffff;
  }
  .userDetails {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    a {
      font-size: 0.8em;
    }
  }
`;

class SideNav extends React.Component {
  render() {
    return (
      <Container>
        <img className="logo" src={giroLogo} alt="giro logo" />
        <div>
          <ul>
            <li>
              <a className="selected">Inscripciones</a>
            </li>
            <li>
              <a>Buscar colono</a>
            </li>
            <li>
              <a>Últimos movimientos</a>
            </li>
            <li>
              <a>Calendario</a>
            </li>
            <li>
              <a>Cerrar sesión</a>
            </li>
          </ul>
        </div>
        <div className="userDetails">
          <img src={avatar} className="avatar" alt="avatar" />
          <a>Administrador</a>
        </div>
      </Container>
    );
  }
}

export default SideNav;
