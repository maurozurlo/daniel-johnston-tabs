import React from 'react'
import styled from 'styled-components'
import eraseIcon from './assets/Icon/Erase.png'
import searchIcon from './assets/Icon/Search.png'

const Container = styled.ul`
width: 90%;
background: white;
box-shadow: 0 2px 15px 0 rgba(203,226,255,0.50);
min-height: 60px;
display: flex;
align-items:center;
justify-content:center;
list-style: none;
margin: .5em 0;
padding: 0;
text-align: center;
font-weight: lighter;
font-size: .8em;
color: #8B8888;

li{
  float:left;
}

li:nth-child(1){
width: 10%;
}
li:nth-child(2){
width: 20%;
font-weight: normal;
}
li:nth-child(3){
width: 12%;
min-height:30px;
line-height:30px;
color: white;
background-color: #80EC71;
border-radius: 18px;
box-shadow: 0 0 3px 0 #B9EAB2;
}
li:nth-child(4){
  width: 12%;
}
li:nth-child(5){
  width: 12%;
}
li:nth-child(6){
  width: 12%;
}
li:nth-child(7){
  width: 12%;
}
li:nth-child(8){
width: 10%;
display:flex;
justify-content:center;

& a{
  border: 1px solid #979797;
  border-radius: 5px;
  padding:.5em;
  display:flex;
  align-items: center;
  justify-content:center;
  min-height:20px;
  transition: 0.2s ease all;

  & img{
    width:90%;
    max-width:20px;
  }
  }
  a:nth-child(2){
    margin-left:5px;
  }
  a:hover{
    border: 1px solid rgba(70,146,216,1);
    background-color:rgba(70,146,216,0.50);
    cursor:pointer;
    & img{
      filter:brightness(2);
    }
  }
  a:nth-child(2):hover{
    border: 1px solid #E25A5A;
    background-color: #FF8787;
  }
}
`
class TableRow extends React.Component {
  render () {
    return (
      <Container>
        <li>#0001</li>
        <li>Mauro Zurlo</li>
        <li>Aprobado</li>
        <li>Jornada simple</li>
        <li>Jornada completa</li>
        <li>Grupo 1</li>
        <li>27/11/2018 3:33 PM</li>
        <li>
          <a><img src={searchIcon} alt="view"/></a>
          <a><img src={eraseIcon} alt="erase"/></a>
        </li>
      </Container>
    )
  }
}

export default TableRow
