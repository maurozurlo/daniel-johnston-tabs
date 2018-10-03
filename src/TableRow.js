import React from "react";
import styled from "styled-components";
import eraseIcon from "./assets/Icon/Erase.png";
import searchIcon from "./assets/Icon/Search.png";
import classNames from "classnames";

const Container = styled.ul`
  width: 100%;
  background: white;
  box-shadow: 0 2px 15px 0 rgba(203, 226, 255, 0.5);
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  /*margin: 0.5em 0;*/
  padding: 0;
  text-align: center;
  font-weight: lighter;
  font-size: 0.8em;
  color: #8b8888;

  li {
    float: left;
  }

  li:nth-child(1) {
    width: 10%;
  }
  li:nth-child(2) {
    width: 22%;
    font-weight: normal;
    text-align: left;
  }
  li:nth-child(3) {
    width: 10%;
    min-height: 30px;
    line-height: 30px;
    color: white;
    border-radius: 18px;
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
    display: flex;
    justify-content: center;

    & a {
      border: 1px solid #979797;
      border-radius: 5px;
      padding: 0.5em;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 20px;
      transition: 0.2s ease all;

      & img {
        width: 90%;
        max-width: 20px;
      }
    }
    a:nth-child(2) {
      margin-left: 5px;
    }
    a:hover {
      border: 1px solid rgba(70, 146, 216, 1);
      background-color: rgba(70, 146, 216, 0.5);
      cursor: pointer;
      & img {
        filter: brightness(2);
      }
    }
    a:nth-child(2):hover {
      border: 1px solid #e25a5a;
      background-color: #ff8787;
    }
  }

  .wait {
    background-color: #f7bd33;
    box-shadow: 0 0 3px 0 #f5a623;
  }

  .approved {
    background-color: #53d640;
    box-shadow: 0 0 3px 0 #b9eab2;
  }

  .denied {
    background-color: #e25a5a;
    box-shadow: 0 0 3px 0 #d0021b;
  }

  .pending {
    background-color: #87c6ff;
    box-shadow: 0 0 3px 0 #60c5fa;
  }
`;
class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusClass: this.computeClass(this.props.estado)
    };
  }

  computeClass(val) {
    return classNames({
      wait: val === "En Espera",
      pending: val === "Pendiente",
      approved: val === "Aprobado",
      denied: val === "Denegado"
    });
  }

  render() {
    return (
      <Container>
        <li>{this.props.id}</li>
        <li>{this.props.name}</li>
        <li className={this.state.statusClass}>{this.props.estado}</li>
        <li>{this.props.s1}</li>
        <li>{this.props.s2}</li>
        <li>{this.props.grupo}</li>
        <li>{this.props.ingresado}</li>
        <li>
          <a href={this.props.key}>
            <img src={searchIcon} alt="view" />
          </a>
          <a>
            <img src={eraseIcon} alt="erase" />
          </a>
        </li>
      </Container>
    );
  }
}

export default TableRow;
