import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getVideos } from '../../api';

const VideoList = (props) => {
  const [videoList, setVideoList] = useState([]);
  const openModal = (event, videoItem) => {
    event.preventDefault();
    console.log(videoItem);
  };

  useEffect(() => {
    getVideos('bands').then((querySnapshot) => {
      const videoListResponse = [];
      querySnapshot.forEach((doc) => {
        const youtubeVideoId = doc
          .data()
          .url.split('https://www.youtube.com/watch?v=')[1]
          .split('&')[0];
        const thumbnail = youtubeVideoId
          ? `https://img.youtube.com/vi/${youtubeVideoId}/0.jpg`
          : '';
        videoListResponse.push({
          thumbnail,
          id: doc.id,
          ...doc.data(),
        });
      });
      if (videoListResponse.length) {
        setVideoList(videoListResponse);
      }
    });
  }, []);

  return (
    <div className="VideoList">
      <Container>
        <h1>Videos</h1>
        <ul className="VideoList_List">
          {videoList &&
            !!videoList.length &&
            videoList.map((videoItem) => (
              <div className="VideoList_List_Item" key={videoItem.id}>
                <Card style={{ width: '18rem' }}>
                  <button
                    className="VideoList_List_Item_Image_Button"
                    onClick={(e) => openModal(e, videoItem)}
                  >
                    <Card.Img variant="top" src={`${videoItem.thumbnail}`} />
                  </button>
                  <Card.Body>
                    <Card.Title>
                      {videoItem.title.split('|')[0].trim()}
                    </Card.Title>
                    <Card.Text>{videoItem.artist}</Card.Text>
                    <Button
                      onClick={(e) => openModal(e, videoItem)}
                      variant="primary"
                    >
                      Votar
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          {!videoList.length && 'Loading...'}
        </ul>
      </Container>
    </div>
  );
};

VideoList.propTypes = {};

export default VideoList;
