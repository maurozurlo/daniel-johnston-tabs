import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding-bottom: 2em;
  min-height: 80vh;
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.5;

  & > img {
    max-width: 80%;
  }

  & > ol {
    column-count: 2;
    column-gap: 20px;
  }
`;

class AlbumDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      album: "",
      api: `http://localhost:5000/api/albums/`
    };
    this.fetchInit = this.fetchInit.bind(this);
  }

  componentDidMount() {
    this.fetchInit();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchInit();
    }
  }

  fetchInit() {
    axios
      .get(`${this.state.api + this.props.match.params.id}`)
      .then(res => {
        this.setState({ album: res.data });
      })
      .catch(error => {
        console.log(error);
        this.setState({ album: "error" });
      });
  }

  renderList() {
    if (this.state.album === "" || this.state.album === "error") {
      if (this.state.album === "") {
        // This is loading
        return (
          <Main>
            <div className="loader">Loading...</div>
          </Main>
        );
      } else {
        // This doesn't exist
        return (
          <Main>
            <div>Album not found...</div>
          </Main>
        );
      }
    } else {
      return (
        <Main key={this.props.match.params.id}>
          <Column>
            <img
              src={require(`../assets/albums/${this.state.album.permalink}.jpg`)}
              alt="Album cover"
            ></img>
            <h1>{this.state.album.name}</h1>
            <p>Released: {new Date(this.state.album.released).getFullYear()}</p>
          </Column>
          <Column>
            <h2>Tracklist</h2>
            <ol> {this.trackList()}</ol>
          </Column>
        </Main>
      );
    }
  }

  returnPermalink(track) {
    return track.replace(/ /g, "-").toLowerCase();
  }

  trackList() {
    return this.state.album.trackList.length > 0 ? (
      this.state.album.trackList.map(track => (
        <li key={track}>
          <Link to={`/tabs/${this.returnPermalink(track)}`}>{track}</Link>
        </li>
      ))
    ) : (
      <a>No tracks found</a>
    );
  }

  render() {
    return <Container>{this.renderList()}</Container>;
  }
}

export default AlbumDetail;
