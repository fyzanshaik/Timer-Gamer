import { Request, Response } from 'express';
import prisma from '../utils/db';

export const checkForUser = async (req: Request, res: Response) => {
	const { userName } = req.body;
	try {
		const existingUser = await prisma.user.findUnique({
			where: { username: userName },
			include: { scores: true },
		});

		if (existingUser) {
			return res.status(200).json({
				message: 'User already exists',
				scores: existingUser,
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

		return res.status(201).json(newUser);
	} catch {}
};

export const getUserScore = async (req: Request, res: Response) => {
	const { userName } = req.params;

	try {
		const user = await prisma.user.findUnique({
			where: { username: userName },
			include: { scores: true },
		});

		if (!user) {
			return res.status(404).json({ message: 'User not found.' });
		}

		return res.status(200).json(user.scores);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'An error occurred while fetching user scores.' });
	}
};
