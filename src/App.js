import React from "react";
import axios from "axios";
import styled from "styled-components";
import giroLogo from "./assets/logo.png";
import avatar from "./assets/avatar.png";
import searchIcon from "./assets/Icon/Search.png";
import TableRow from "./TableRow";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const SideNav = styled.div`
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

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;
const TableTop = styled.ul`
  font-weight: bold;
  font-size: 0.7em;
  color: #59b6f3;
  text-align: center;
  width: 90%;
  list-style: none;
  margin: 0.5em 0;
  padding: 0;

  li {
    float: left;
  }

  li:nth-child(1) {
    width: 10%;
  }
  li:nth-child(2) {
    width: 22%;
  }
  li:nth-child(3) {
    width: 10%;
  }
  li:nth-child(4) {
    width: 12%;
  }
  li:nth-child(5) {
    width: 12%;
  }
  li:nth-child(6) {
    width: 12%;
  }
  li:nth-child(7) {
    width: 12%;
  }
  li:nth-child(8) {
    width: 10%;
  }
`;

const TopRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin-top: 1em;

  & h1 {
    margin: 0;
    padding-left: 1em;
    font-size: 2.5em;
    font-weight: lighter;
    color: #4692d8;
    width: 90%;
  }

  & form {
    display: flex;
    padding-right: 1em;

    & input {
      font-family: "Open Sans", sans-serif !important;
      border: 1px solid #ccc;
      border-radius: 2px;
      min-height: 30px;
      margin-right: 0.5em;
      padding: 0 0.5em;
      font-size: 0.8em;
      color: #8b8888;
    }

    & button {
      background-color: white;
      border: 1px solid #979797;
      border-radius: 5px;
      padding: 0.5em;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 20px;
      transition: 0.2s ease all;
      min-width: 34px;
      min-height: 34px;
    }
    button:hover {
      border: 1px solid rgba(70, 146, 216, 1);
      background-color: rgba(70, 146, 216, 0.5);
      cursor: pointer;
      & img {
        filter: brightness(2);
      }
    }
    & img {
      width: 90%;
      max-width: 20px;
    }
  }
`;

const TableList = styled.span`
  width: 90%;
  margin: 0.5em 0;
`;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: [
        {
          id: 1,
          nombre: "hola",
          estado: 5,
          semana1: "jornada completa",
          semana2: "jornada completa",
          grupo: "grupo 1",
          ingresado: "22:22:22"
        }
      ],
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:8888/backoffice-api/public/index.php/api/v1/colonos"
      )
      .then(res => {
        this.setState({ table: res.data });
      })
      .catch(function(error) {
        console.log("Error");
      });
  }

  render() {
    const { table } = this.state;

    return (
      <Container>
        <SideNav>
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
        </SideNav>
        <Main>
          <TopRow>
            <h1>Inscripciones</h1>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <button type="submit" value="Enviar">
                <img src={searchIcon} alt="view" />
              </button>
            </form>
          </TopRow>
          <TableTop>
            <li>ID</li>
            <li>NOMBRE COMPLETO</li>
            <li>ESTADO</li>
            <li>SEMANA 1</li>
            <li>SEMANA 2</li>
            <li>GRUPO</li>
            <li>INGRESADO</li>
            <li>ACCIONES</li>
          </TableTop>
          {/* Mapeado */}
          <TableList ref={table => (this.table = table)}>
            {table.length > 0 &&
              table.map(item => (
                <TableRow
                  key={item.id}
                  id={item.id}
                  name={item.nombre}
                  estado={item.estado}
                  s1={item.semana1}
                  s2={item.semana2}
                  grupo={item.grupo}
                  ingresado={item.ingresado}
                />
              ))}
          </TableList>
        </Main>
      </Container>
    );
  }
}

export default App;
