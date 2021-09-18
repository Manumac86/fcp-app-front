import React from 'react';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const VideoList = ({ videoList, onVote }) => {
  const handleVote = (event, videoItem) => {
    event.preventDefault();
    onVote(videoItem);
  };

  return (
    <div className="VideoList">
      <Container>
        <h1>¡VOTÁ A TU BANDA FAVORITA!</h1>
        <ul className="VideoList_List">
          {videoList &&
            !!videoList.length &&
            videoList.map((videoItem) => (
              <div className="VideoList_List_Item" key={videoItem.id}>
                <div>
                  <button
                    className="VideoList_List_Item_Image_Button"
                    onClick={(e) => handleVote(e, videoItem)}
                  >
                    <img src={`${videoItem.thumbnail}`} />
                  </button>
                  <Card.Body>
                    <Card.Text>
                      {`${videoItem.title.split('|')[0].trim()} - ${
                        videoItem.artist
                      }`}
                    </Card.Text>
                  </Card.Body>
                </div>
              </div>
            ))}
          {!videoList.length && (
            <div className="w-full h-full d-flex align-items-center">
              <Spinner animation="grow" variant="primary" />
            </div>
          )}
        </ul>
      </Container>
    </div>
  );
};

VideoList.propTypes = {
  onVote: PropTypes.func.isRequired,
  videoList: PropTypes.array,
};

export default VideoList;
