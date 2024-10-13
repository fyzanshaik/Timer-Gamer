import Player from './components/Player.jsx';
import TimerChallenge from './components/TimerChallenge.jsx';
import { Header } from './components/Header.jsx';
function App() {
  return (
    <>
      <Header />
      <Player />
      <div id="challenges">
        <TimerChallenge title="Easy" targetTime={1} ></TimerChallenge>
        {/* <TimerChallenge title="Not Easy" targetTime={5} ></TimerChallenge>
        <TimerChallenge title="Not Easy" targetTime={5} ></TimerChallenge>

        <TimerChallenge title="Not Easy" targetTime={5} ></TimerChallenge> */}
      </div>
    </>
  );
}

export default App;
