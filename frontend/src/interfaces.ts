export interface ScoreData {
	id: number;
	userId: number;
	timer1Score: number;
	timer5Score: number;
	timer10Score: number;
	timer15Score: number;
	timer30Score: number;
}

export interface UserData {
	message: string;
	id: number;
	username: string;
	scores: ScoreData[];
}

export interface PlayerProps {
	userData: UserData | null;
	setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

export interface TimerChallengeProps {
	title: string;
	userId: number;
	userName: string;
	targetTime: number;
	highScore: number;
}

export interface ResultModalProps {
	targetTime: number;
	userId: number;
	remainingTime: number;
	userName: string;
	userHighScore: number;
	setUserHighScore: React.Dispatch<React.SetStateAction<number>>;
	handleReset: () => void;
}
