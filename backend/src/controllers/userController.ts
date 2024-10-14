import { Request, Response } from 'express';
import prisma from '../utils/db';

export const checkForUser = async (req: Request, res: Response) => {
	const { userName } = req.body;

	try {
		// Try to find the user by username
		const existingUser = await prisma.user.findUnique({
			where: { username: userName },
			include: { scores: true },
		});

		// If the user exists, return the existing user and their scores
		if (existingUser) {
			return res.status(200).json({
				message: 'User already exists',
				scores: existingUser.scores,
			});
		}

		// If the user doesn't exist, create a new user with initial scores
		const newUser = await prisma.user.create({
			data: {
				username: userName,
				scores: {
					create: {}, // Initialize scores if needed
				},
			},
			include: { scores: true },
		});

		return res.status(201).json(newUser);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'An error occurred while checking or creating the user.' });
	}
};
