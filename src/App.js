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
      table: [
        {
          nombre: "No se encontraron resultados"
        }
      ]
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:8888/backoffice-api/public/index.php/api/v1/colonos/todos,todos"
      )
      .then(res => {
        this.setState({ table: res.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { table } = this.state;

    return (
      <Container>
        <SideNav />
        <Main>
          <Headings />
          <TableTop />
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
