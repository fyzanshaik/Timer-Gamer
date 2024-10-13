import Player from './components/Player.js';
import TimerChallenge from './components/TimerChallenge.js';
import { Header } from './components/Header.js';
function App() {
	return (
		<>
			<Header />
			<Player />
			<div id="challenges">
				<TimerChallenge title="Quick Reflex" targetTime={1} />
				<TimerChallenge title="Speed Test" targetTime={3} />
				<TimerChallenge title="Endurance" targetTime={10} />
				<TimerChallenge title="Focus Mode" targetTime={15} />
				<TimerChallenge title="Ultimate Challenge" targetTime={30} />
			</div>
		</>
	);
}

export default App;
