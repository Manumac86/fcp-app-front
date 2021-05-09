import './assets/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import VideoList from './components/VideoList/VideoList';
import 'holderjs';

function App() {
  return (
    <div className="App">
      <Header />
      <VideoList />
    </div>
  );
}

export default App;
