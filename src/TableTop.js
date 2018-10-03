import React from "react";
import styled from "styled-components";

const Container = styled.ul`
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
    text-align: left;
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

class TableTop extends React.Component {
  render() {
    return (
      <Container>
        <li>ID</li>
        <li>NOMBRE COMPLETO</li>
        <li>ESTADO</li>
        <li>SEMANA 1</li>
        <li>SEMANA 2</li>
        <li>GRUPO</li>
        <li>INGRESADO</li>
        <li>ACCIONES</li>
      </Container>
    );
  }
}

export default TableTop;
