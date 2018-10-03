import React from "react";
import axios from "axios";
import styled from "styled-components";
import TableRow from "./TableRow";
import TableTop from "./TableTop";
import Headings from "./Headings";
import SideNav from "./SideNav";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TableList = styled.span`
  width: 90%;
  margin: 0.5em 0;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: "",
      api:
        "http://localhost:8888/backoffice-api/public/index.php/api/v1/colonos/todos,todos"
    };
  }

  componentDidMount() {
    axios
      .get(this.state.api)
      .then(res => {
        this.setState({ table: res.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleFilters(filter) {
    let apiUrl =
      "http://localhost:8888/backoffice-api/public/index.php/api/v1/colonos/" +
      filter;

    axios
      .get(apiUrl)
      .then(res => {
        this.setState({ table: res.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  renderList() {
    if (this.state.table === "No existe") {
      return <div>No existe el usuario buscado</div>;
    } else {
      if (this.state.table.length > 0) {
        return this.state.table.map(item => (
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
        ));
      }
    }
  }

  render() {
    return (
      <Container>
        <SideNav />
        <Main>
          <Headings addFilter={this.handleFilters.bind(this)} />
          <TableTop />
          {/* Mapeado */}
          <TableList>{this.renderList()}</TableList>
        </Main>
      </Container>
    );
  }
}

export default App;
