import { Request, Response } from 'express';
import prisma from '../utils/db';
import redisClient from '../redisClient';

export const updateScore = async (req: Request, res: Response) => {
	const { userId, timerName, newScore } = req.body;
	const validTimers = ['timer1Score', 'timer5Score', 'timer10Score', 'timer15Score', 'timer30Score'] as const;
	console.log(userId, timerName, newScore);
	if (!validTimers.includes(timerName)) {
		return res.status(400).json({ message: 'Invalid timer name.' });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: { scores: true },
		});

		if (!user || !user.scores.length) {
			return res.status(404).json({ message: 'User not found or no scores found for the user.' });
		}

		const userScore = user.scores[0];
		const currentScore = userScore[timerName as keyof typeof userScore];

		if (newScore > currentScore) {
			const updatedScore = await prisma.score.update({
				where: { id: userScore.id },
				data: { [timerName]: newScore },
			});

			const cacheKey = `leaderboard:${timerName}`;
			await redisClient.del(cacheKey);

			return res.status(200).json({ message: 'Score updated successfully.', updatedScore });
		}

		return res.status(200).json({ message: 'New score is not higher. No update needed.' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error.' });
	}
};

export const getLeaderboard = async (req: Request, res: Response) => {
	try {
		const timer1Leaderboard = await prisma.score.findMany({
			select: {
				user: { select: { username: true } },
				timer1Score: true,
			},
			orderBy: { timer1Score: 'desc' },
			take: 10,
		});

		const timer5Leaderboard = await prisma.score.findMany({
			select: {
				user: { select: { username: true } },
				timer5Score: true,
			},
			orderBy: { timer5Score: 'desc' },
			take: 10,
		});

		const timer10Leaderboard = await prisma.score.findMany({
			select: {
				user: { select: { username: true } },
				timer10Score: true,
			},
			orderBy: { timer10Score: 'desc' },
			take: 10,
		});

		const timer15Leaderboard = await prisma.score.findMany({
			select: {
				user: { select: { username: true } },
				timer15Score: true,
			},
			orderBy: { timer15Score: 'desc' },
			take: 10,
		});

		const timer30Leaderboard = await prisma.score.findMany({
			select: {
				user: { select: { username: true } },
				timer30Score: true,
			},
			orderBy: { timer30Score: 'desc' },
			take: 10,
		});

		const formattedLeaderboard = {
			timer1: timer1Leaderboard.map(({ user, timer1Score }) => ({
				userName: user.username,
				score: timer1Score,
			})),
			timer5: timer5Leaderboard.map(({ user, timer5Score }) => ({
				userName: user.username,
				score: timer5Score,
			})),
			timer10: timer10Leaderboard.map(({ user, timer10Score }) => ({
				userName: user.username,
				score: timer10Score,
			})),
			timer15: timer15Leaderboard.map(({ user, timer15Score }) => ({
				userName: user.username,
				score: timer15Score,
			})),
			timer30: timer30Leaderboard.map(({ user, timer30Score }) => ({
				userName: user.username,
				score: timer30Score,
			})),
		};

		return res.status(200).json(formattedLeaderboard);
	} catch (error) {
		console.error('Error fetching leaderboard:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export const getTimerLeaderBoard = async (req: Request, res: Response) => {
	const { timerName } = req.params;
	if (!['timer1Score', 'timer5Score', 'timer10Score', 'timer15Score', 'timer30Score'].includes(timerName as string)) {
		return res.status(400).json({ error: 'Invalid timer name.' });
	}

	try {
		const cacheKey = `leaderboard:${timerName}`;
		const cachedData = await redisClient.get(cacheKey);

		if (cachedData) {
			return res.status(200).json(JSON.parse(cachedData));
		}

		const timerLeaderBoard = await prisma.score.findMany({
			select: {
				user: {
					select: {
						username: true,
					},
				},
				[timerName as string]: true,
			},
			orderBy: {
				[timerName as string]: 'desc',
			},
			take: 10,
		});

		await redisClient.set(cacheKey, JSON.stringify(timerLeaderBoard));

		// const formattedLeaderBoard = timerLeaderBoard.map((entry) => ({
		// 	username: entry.user.username,
		// 	score: entry[timerName as string], // Dynamically access the timer score
		// }));

		res.status(200).json(timerLeaderBoard);
	} catch (error) {
		console.error('Error fetching leaderboard:', error);
		res.status(500).json({ error: 'Failed to fetch leaderboard.' });
	}
};

/**
 * {
  "timer1": [
    { "userName": "Alice", "score": 50 },
    { "userName": "Bob", "score": 45 }
    // Up to 10 entries...
  ],
  "timer5": [
    { "userName": "Charlie", "score": 150 },
    { "userName": "Dave", "score": 140 }
    // Up to 10 entries...
  ],
  "timer10": [
    { "userName": "Eve", "score": 250 },
    { "userName": "Frank", "score": 240 }
    // Up to 10 entries...
  ],
  "timer15": [
    { "userName": "Grace", "score": 350 },
    { "userName": "Hank", "score": 340 }
    // Up to 10 entries...
  ],
  "timer30": [
    { "userName": "Ivy", "score": 450 },
    { "userName": "Jack", "score": 440 }
    // Up to 10 entries...
  ]
}

 */
