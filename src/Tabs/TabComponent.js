import React from "react";
import styled from "styled-components";

const Container = styled.ul`
  width: 100%;
  margin: 1em;
  padding: 1em;
  font-weight: lighter;
  font-size: 0.8em;
  color: #8b8888;
`;

class TabComponent extends React.Component {
  render() {
    return (
      <Container>
        <h1>{this.props.title}</h1>
        <ul>
          <li>
            Key:{" "}
            <strong>
              {this.props.key === undefined ? "No definida" : this.props.key}
            </strong>
          </li>
          <li>
            Album: <strong>{this.props.album}</strong>
          </li>
          <li>
            Author: <strong>{this.props.author}</strong>
          </li>
          <li>
            Track: <strong>{this.props.track}</strong>
          </li>
        </ul>
        <pre>{decodeURI(this.props.tab)}</pre>
      </Container>
    );
  }
}

export default TabComponent;
