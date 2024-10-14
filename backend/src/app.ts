import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
	origin: 'http://localhost:5173',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', () => {
	console.log('working!');
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
