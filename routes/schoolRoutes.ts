import express from 'express';
import schoolController from '../controllers/schoolController';

const router = express.Router();

router.post('/addSchool', schoolController.validateSchool, schoolController.createSchool);
router.get('/listSchools', schoolController.listSchools);

export default router;
