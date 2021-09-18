import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VideoList from './components/VideoList';
import Modal from './components/Modal';
import { getVideos, updateVideo } from './api';
import 'holderjs';
import './assets/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [videoList, setVideoList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isVoteSuccess, setIsVoteSuccess] = useState(false);

  const openModal = (data) => {
    const videoId = data.url
      .split('https://www.youtube.com/watch?v=')[1]
      .split('&list=')[0];

    const dataForModal = {
      ...data,
      url: `https://www.youtube.com/embed/${videoId}`,
    };
    setModalData(dataForModal);
    setIsModalOpen(true);
  };

  const handleModalClose = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setModalData({});
  };

  const handleVote = (e, modalVideo) => {
    e.preventDefault();
    const [votedVideo] = videoList.filter(
      (video) => video.id === modalVideo.id
    );
    votedVideo.votes++;
    updateVideo('bands', votedVideo).then((response) => {
      setIsVoteSuccess(true);
    });
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
    <div className="App">
      <Header />
      <VideoList videoList={videoList} onVote={openModal} />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          isVoteSuccess={isVoteSuccess}
          data={modalData}
          onCloseModal={handleModalClose}
          onVote={handleVote}
        />
      )}
    </div>
  );
}

export default App;
