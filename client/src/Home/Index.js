import React from "react";
import styled from "styled-components";
import cover from "../assets/cover.jpg";

const Container = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 2em 0;
  height: 100%;
  min-height: 80vh;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  & > img {
    height: 60%;
    max-height: 300px;
  }
`;

class Index extends React.Component {
  render() {
    return (
      <Container>
        <Main>
          <img src={cover} alt="" />
          <h1>Hi, how are you?</h1>
          <p>
            This fan website is currently under construction. In the meantime,
            feel free to look around.
          </p>
          <p>-Miauz</p>
        </Main>
      </Container>
    );
  }
}

export default Index;
