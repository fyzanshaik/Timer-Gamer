import express, { Router, Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
	origin: [
		'https://timer-gamer.vercel.app',
		'https://timer-gamer-nn3lfzkme-fyzanshaiks-projects.vercel.app',
		'https://vercel.live/link/timer-gamer-git-main-fyzanshaiks-projects.vercel.app?via=project-dashboard-alias-list&p=1',
		'https://timer-gamer-fyzanshaiks-projects.vercel.app/',
		'http://localhost:5173/',
	],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
	res.status(200).json({
		message: 'SERVER IS UP & RUNNING',
	});
	console.log('working!');
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
