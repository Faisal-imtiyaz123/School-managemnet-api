import { Request, Response, NextFunction } from 'express';
import { getDistance } from '../utils/utilityFunctions';
import { ConflictError, ValidationError } from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import Joi from 'joi';
import { schoolService } from '../services/schoolService';

const createSchool = catchAsync(async (req: Request, res: Response) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        throw new ValidationError('Invalid input data', { name, address, latitude, longitude });
    }
    const exists = await schoolService.schoolExists(name, address, latitude, longitude);
    if (exists) {
        throw new ConflictError('School already exists with the same details');
    }
    await schoolService.addSchool({ name, address, latitude, longitude });
    res.status(201).json({ message: 'School added successfully' });
});

const listSchools = catchAsync(async (req: Request, res: Response) => {
    const { latitude, longitude } = req.query;

    const userLat = parseFloat(latitude as string);
    const userLon = parseFloat(longitude as string);

    if (isNaN(userLat) || isNaN(userLon)) {
        throw new ValidationError('Invalid latitude or longitude');
    }

    const schools = await schoolService.listAllSchools();
    const sortedSchools = schools
        .map((school) => ({
            ...school,
            distance: getDistance(userLat, userLon, school.latitude, school.longitude),
        }))
        .sort((a, b) => a.distance - b.distance);

    res.json(sortedSchools);
});
const  validateSchool = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        throw new ValidationError('Validation error', error.details);
    }

    next();
};

const schoolController = {
    createSchool,
    listSchools,
    validateSchool,
};

export default schoolController;
