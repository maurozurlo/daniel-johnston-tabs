import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  height: 100%;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

class CreateTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api: "http://localhost:5000/api/tab/create/",
      permalink: "default-title",
      title: "Default title",
      tab: "//Write tab here",
      album: "More Songs of Pain",
      track: 1,
      author: "Miauz"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    console.log(this.state);
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <Container>
        <Main>
          <form onSubmit={this.handleSubmit}>
            <p>Permalink</p>
            <input
              type="text"
              value={this.state.permalink}
              onChange={this.handleInputChange}
              name="permalink"
            />
            <p>Title</p>
            <input type="text" name="title" />
            <p>Album</p>
            <select
              value={this.state.album}
              onChange={this.handleInputChange}
              type="text"
              name="album"
            >
              <option value="More songs of pain">More Songs of Pain</option>
              <option value="Fear Yourself">Fear Yourself</option>
            </select>
            <p>Tab</p>
            <textarea
              name="tab"
              value={this.state.tab}
              onChange={this.handleInputChange}
            />
            <p>Author</p>
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleInputChange}
            />
            <p>Track</p>
            <input
              type="number"
              name="track"
              value={this.state.track}
              onChange={this.handleInputChange}
            />
            <input type="submit" value="Submit" />
          </form>
        </Main>
      </Container>
    );
  }
}

export default CreateTab;
