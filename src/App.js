import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VideoList from './components/VideoList';
import Modal from './components/Modal';
import Footer from './components/Footer';
import {
  auth,
  getContest,
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
  const [isLoginError, setIsLoginError] = useState(false);
  const [isContestActive, setIsContentActive] = useState(false);

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
    setIsVoteSuccess(false);
  };

  const handleModalClose = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setIsLoginError(false);
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
                setIsLoginError(false);
              });
            } else {
              setIsVoteSuccess(false);
            }
          }
        });
      })
      .catch((err) => {
        setIsModalOpen(false);
        setIsLoginError(true);
        setIsVoteSuccess(false);
      });
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    getContest('bands').then((querySnapshot) => {
      const { isActive } = querySnapshot.data();
      setIsContentActive(isActive);
    })
  }, []);

  useEffect(() => {
    if(isContestActive) {
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
    }
  }, [isContestActive])

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
      {
        isContestActive && 
        <VideoList
          isLoading={isLoadingVideos}
          searchText={searchText}
          videoList={filteredVideoList}
          onVote={openModal}
        />
      }
      {
        !isContestActive && <div className="VideoList" style={{height: 'calc(100vh - 80px', fontSize: "3em"}}>No hay concursos activos! Verifica nuestras redes para saber más.</div>
      }
      <Footer />
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
      {!isModalOpen && isLoginError && (
        <div
          className={'modal fade show'}
          style={{
            display: 'block',
          }}
          onClick={handleModalClose}
        >
          <div className="modal-container">
            <div
              className="modal-content"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <>
                <div
                  className="modal-header"
                  style={{ justifyContent: 'flex-end' }}
                >
                  <button
                    type="button"
                    className="btn close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={handleModalClose}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p style={{ fontSize: '24px', margin: '0' }}>
                    <span style={{ color: '#C1272D' }}>
                      NO PUDIMOS IDENTIFICARTE.
                    </span>{' '}
                    <br></br> POR FAVOR, RECARGA LA PAGINA EN INTENTA
                    NUEVAMENTE.
                  </p>
                </div>
              </>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
