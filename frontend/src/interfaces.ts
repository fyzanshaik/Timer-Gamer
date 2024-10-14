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
	scores: ScoreData[];
}

export interface PlayerProps {
	userData: UserData | null;
	setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

export interface TimerChallengeProps {
	title: string;
	userId: number;
    	targetTime: number;
	highScore: number;
}

export interface ResultModalProps {
	targetTime: number;
	userId: number;
	remainingTime: number;
	userHighScore: number;
	setUserHighScore: React.Dispatch<React.SetStateAction<number>>;
	handleReset: () => void;
}
