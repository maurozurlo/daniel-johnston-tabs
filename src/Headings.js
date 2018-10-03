import React from "react";
import styled from "styled-components";
import searchIcon from "./assets/Icon/Search.png";

const Container = styled.div`
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

    & input,
    select {
      font-family: "Open Sans", sans-serif !important;
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 2px;
      min-height: 30px;
      margin-right: 0.5em;
      padding: 0 0.5em;
      font-size: 0.8em;
      color: #8b8888;
    }

    select {
      margin-right: 0.5em;
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

class Headings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    return (
      <Container>
        <h1>Inscripciones</h1>
        <form onSubmit={this.handleSubmit}>
          <select>
            <option value="todos">Todos</option>
            <option value="0">Pendientes</option>
            <option value="1">Aprobados</option>
            <option value="2">Denegados</option>
            <option value="3">En lista de espera</option>
          </select>
          <select>
            <option value="todos">Todos</option>
            <option value="0">No especificado</option>
            <option value="1">Grupo 1</option>
            <option value="2">Grupo 2</option>
            <option value="3">Grupo 3</option>
            <option value="4">Grupo 4</option>
          </select>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button type="submit" value="Enviar">
            <img src={searchIcon} alt="view" />
          </button>
        </form>
      </Container>
    );
  }
}

export default Headings;
