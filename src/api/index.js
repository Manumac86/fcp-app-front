import {
  auth,
  provider,
  contestsCollection,
  usersCollection,
} from '../utils/firebaseConfig';

const login = () => {
  return auth.signInWithPopup(provider);
};

const getVideos = (contest) =>
  contestsCollection.doc(contest).collection('videos').get();

const updateVideo = (contest, doc) =>
  contestsCollection.doc(contest).collection('videos').doc(doc.id).update(doc);

const deleteVideo = () => {
  return new Promise();
};

const getUsers = () => usersCollection.get();

const createUser = (user) => usersCollection.doc().set(user);

export {
  auth,
  login,
  getVideos,
  getUsers,
  createUser,
  updateVideo,
  deleteVideo,
};
