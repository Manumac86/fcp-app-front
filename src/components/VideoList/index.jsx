import React from 'react';
import { Container, Card, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const VideoList = ({ isLoading, searchText, videoList, onVote }) => {
  const handleVote = (event, videoItem) => {
    event.preventDefault();
    onVote(videoItem);
  };

  return (
    <div className="VideoList">
      <Container>
        <h1>
          {searchText && videoList.length
            ? `Resultados para ${searchText}`
            : '¡VOTÁ A TU BANDA FAVORITA!'}
        </h1>
        <ul className="VideoList_List">
          {videoList &&
            !isLoading &&
            videoList.map((videoItem) => (
              <div className="VideoList_List_Item" key={videoItem.id}>
                <div>
                  <button
                    className="VideoList_List_Item_Image_Button"
                    onClick={(e) => handleVote(e, videoItem)}
                  >
                    <img
                      alt={`Video Thumbnail`}
                      src={`${videoItem.thumbnail}`}
                    />
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
          {isLoading && (
            <div className="w-full h-full d-flex align-items-center">
              <Spinner animation="grow" variant="primary" />
            </div>
          )}
          {!isLoading && !videoList.length && (
            <h2>No Encontramos Resultados para {searchText}</h2>
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
