import { Router, Request, Response } from 'express';
import { checkForUser, getUserScore } from '../controllers/userController';
import { getLeaderboard, updateScore } from '../controllers/scoreController';
const router = Router();

interface UserCheckRequestBody {
	userName: string;
}

router.post<{}, {}, UserCheckRequestBody>('/userCheck', async (req: Request<{}, {}, UserCheckRequestBody>, res: Response) => {
	await checkForUser(req, res);
});

router.get<{}, {}, UserCheckRequestBody>('/userScore/:userName', async (req: Request<{}, {}, UserCheckRequestBody>, res: Response) => {
	await getUserScore(req, res);
});

router.post<{}, {}, UserCheckRequestBody>('/updateScore/', async (req: Request<{}, {}, UserCheckRequestBody>, res: Response) => {
	await updateScore(req, res);
});

router.get<{}, {}, UserCheckRequestBody>('/leaderboard/', async (req: Request<{}, {}, UserCheckRequestBody>, res: Response) => {
	await getLeaderboard(req, res);
});

export default router;
