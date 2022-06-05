import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import album1 from "../assets/albums/More-Songs-of-Pain.jpg";
import album2 from "../assets/albums/Hi-How-Are-You.jpg";
import album3 from "../assets/albums/Songs-of-Pain.jpg";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 2em 0;
  min-height: 80vh;
`;

const AlbumContainer = styled.div`
  max-width: 300px;
  & > a > img {
    width: 100%;
  }
`;

class ShowAlbums extends React.Component {
  render() {
    return (
      <Container>
        <AlbumContainer>
          <Link to="/albums/More-Songs-of-Pain">
            <img src={album1} alt="More songs of pain" />
          </Link>
          <h4>More Songs of Pain</h4>
          <p>Released: January 1983</p>
        </AlbumContainer>
        <AlbumContainer>
          <Link to="/albums/Hi-How-Are-You">
            <img src={album2} alt="Hi-How-Are-You" />
          </Link>
          <h4>Hi, How Are You?</h4>
          <p>Released: Sept 1983</p>
        </AlbumContainer>
        <AlbumContainer>
          <Link to="/albums/Songs-of-Pain">
            <img src={album3} alt="Songs of pain" />
          </Link>
          <h4>Songs of Pain</h4>
          <p>Released: January 1980</p>
        </AlbumContainer>
      </Container>
    );
  }
}

export default ShowAlbums;
