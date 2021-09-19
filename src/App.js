import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VideoList from './components/VideoList';
import Modal from './components/Modal';
import {
  auth,
  getVideos,
  updateVideo,
  login,
  getUsers,
  createUser,
} from './api';
import 'holderjs';
import './assets/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [videoList, setVideoList] = useState([]);
  const [filteredVideoList, setFilteredVideoList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingVideos, setIsLoadingVideos] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isVoteSuccess, setIsVoteSuccess] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState({});
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [authToken, setAuthToken] = useState('');

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
    login()
      .then((result) => {
        return {
          token: result.credential.accessToken,
          user: result.user.multiFactor.user,
        };
      })
      .then((res) => {
        setUser(res.user);
        setAuthToken(res.token);
        const userAuth = auth.currentUser;
        // console.log(userAuth.multiFactor.user.email);
        getUsers().then((querySnapshot) => {
          const usersListResponse = [];
          querySnapshot.forEach((doc) => {
            usersListResponse.push(doc.data());
          });
          if (usersListResponse.some((u) => u.email === res.user.email)) {
            setIsReturningUser(true);
          } else {
            if (userAuth.multiFactor.user.email.length) {
              createUser({
                email: res.user.email,
                name: res.user.displayName,
                voted: true,
                votedVideo: votedVideo.id,
              }).then(() => {
                votedVideo.votes++;
                updateVideo('bands', votedVideo).then(() => {
                  setIsVoteSuccess(true);
                });
              });
            } else {
              alert(
                'Error: No pudimos identificarte. Por favor, intenta nuevamente.'
              );
              setIsVoteSuccess(false);
            }
          }
        });
      })
      .catch((err) => {
        alert(
          'Error: No pudimos identificarte. Por favor, intenta nuevamente.'
        );
        setIsVoteSuccess(false);
      });
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    setIsLoadingVideos(true);
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
        setFilteredVideoList(videoListResponse);
        setIsLoadingVideos(false);
      }
    });
  }, []);

  useEffect(() => {
    if (searchText.length) {
      setFilteredVideoList(
        videoList.filter(
          (video) =>
            video.title.toLowerCase().includes(searchText.toLowerCase()) ||
            video.artist.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } else {
      setFilteredVideoList(videoList);
    }
  }, [searchText, videoList]);

  return (
    <div className="App">
      <Header onSearch={handleSearch} searchText={searchText} />
      <VideoList
        isLoading={isLoadingVideos}
        searchText={searchText}
        videoList={filteredVideoList}
        onVote={openModal}
      />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          isVoteSuccess={isVoteSuccess}
          isReturningUser={isReturningUser}
          data={modalData}
          onCloseModal={handleModalClose}
          onVote={handleVote}
        />
      )}
    </div>
  );
}

export default App;
