import React from "react";
import styled from "styled-components";
import axios from "axios";
import TabComponent from "./TabComponent";

const Container = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  margin-top: 2em;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

class ShowTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "",
      api: `http://localhost:5000/api/tabs/`
    };
  }

  renderList() {
    if (this.state.tab === "") {
      return <div>Tab not found</div>;
    } else {
      console.log({ state: this.state });
      return (
        <TabComponent
          key={this.props.match.params.id}
          title={this.state.tab.title}
          tab={this.state.tab.tab}
          album={this.state.tab.album}
          author={this.state.tab.author}
          track={this.state.tab.track}
        />
      );
    }
  }

  componentDidMount() {
    this.fetchInit()
  }

  componentDidUpdate(prevProps){
    if(prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchInit()
    }
  }

  fetchInit = () => {
    axios
      .get(`${this.state.api + this.props.match.params.id}`)
      .then(res => {
        this.setState({ tab: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Container>
        <Main>{this.renderList()}</Main>
      </Container>
    );
  }
}

export default ShowTab;
