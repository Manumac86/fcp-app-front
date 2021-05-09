import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import videoList from '../../example_respnse';

const VideoList = (props) => {
  const openModal = (e) => {
    e.preventDefault();
    console.log('worked');
  };

  return (
    <div className="VideoList">
      <Container>
        <h1>Main Content</h1>
        <ul className="VideoList_List">
          {videoList &&
            videoList.length &&
            videoList.map((videoItem) => (
              <li className="VideoList_List_Item" key={videoItem.id}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={`${videoItem.thumbnail}`} />
                  <Card.Body>
                    <Card.Title>{videoItem.songTitle}</Card.Title>
                    <Card.Text>{videoItem.band}</Card.Text>
                    <Button onClick={openModal} variant="primary">
                      Votar
                    </Button>
                  </Card.Body>
                </Card>
              </li>
            ))}
        </ul>
      </Container>
    </div>
  );
};

VideoList.propTypes = {};

export default VideoList;
