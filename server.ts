import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

try {
     app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} catch (error:any) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1); 
}
