import { Request, Response } from 'express';
import prisma from '../utils/db';
import redisClient from '../redisClient';

export const checkForUser = async (req: Request, res: Response) => {
	const { userName } = req.body;

	try {
		const cacheKey = `userInfo:${userName}`;
		const cachedData = await redisClient.get(cacheKey);

		if (cachedData) {
			return res.status(201).json(JSON.parse(cachedData));
		}

		const existingUser = await prisma.user.findUnique({
			where: { username: userName },
			include: { scores: true },
		});

		console.log(existingUser);
		if (existingUser) {
			await redisClient.set(cacheKey, JSON.stringify(existingUser));
			return res.status(200).json({
				message: 'User already exists',
				scores: existingUser.scores,
			});
		}

		const newUser = await prisma.user.create({
			data: {
				username: userName,
				scores: {
					create: {},
				},
			},
			include: { scores: true },
		});
		console.log(newUser);
		await redisClient.set(cacheKey, JSON.stringify(newUser));
		return res.status(201).json(newUser);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'An error occurred while checking or creating the user.' });
	}
};
