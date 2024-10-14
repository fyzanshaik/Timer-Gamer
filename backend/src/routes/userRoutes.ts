import { Router, Request, Response } from 'express';
import { checkForUser } from '../controllers/userController';
import { getLeaderboard, updateScore, getTimerLeaderBoard } from '../controllers/scoreController';
const router = Router();

interface UserCheckRequestBody {
	userName: string;
}

router.post<{}, {}, UserCheckRequestBody>('/userCheck', async (req: Request<{}, {}, UserCheckRequestBody>, res: Response) => {
	await checkForUser(req, res);
});

router.post<{}, {}, UserCheckRequestBody>('/updateScore/', async (req: Request<{}, {}, UserCheckRequestBody>, res: Response) => {
	await updateScore(req, res);
});

router.get<{}, {}, UserCheckRequestBody>('/leaderboards/', async (req: Request<{}, {}, UserCheckRequestBody>, res: Response) => {
	await getLeaderboard(req, res);
});

router.get<{}, {}, UserCheckRequestBody>('/leaderboard/:timerName', async (req: Request<{}, {}, UserCheckRequestBody>, res: Response) => {
	await getTimerLeaderBoard(req, res);
});

export default router;
