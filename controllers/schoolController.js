"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utilityFunctions_1 = require("../utils/utilityFunctions");
const appError_1 = require("../utils/appError");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const joi_1 = __importDefault(require("joi"));
const schoolService_1 = require("../services/schoolService");
const createSchool = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        throw new appError_1.ValidationError('Invalid input data', { name, address, latitude, longitude });
    }
    const exists = yield schoolService_1.schoolService.schoolExists(name, address, latitude, longitude);
    if (exists) {
        throw new appError_1.ConflictError('School already exists with the same details');
    }
    yield schoolService_1.schoolService.addSchool({ name, address, latitude, longitude });
    res.status(201).json({ message: 'School added successfully' });
}));
const listSchools = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude } = req.query;
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);
    if (isNaN(userLat) || isNaN(userLon)) {
        throw new appError_1.ValidationError('Invalid latitude or longitude');
    }
    const schools = yield schoolService_1.schoolService.listAllSchools();
    const sortedSchools = schools
        .map((school) => (Object.assign(Object.assign({}, school), { distance: (0, utilityFunctions_1.getDistance)(userLat, userLon, school.latitude, school.longitude) })))
        .sort((a, b) => a.distance - b.distance);
    res.json(sortedSchools);
}));
const validateSchool = (req, res, next) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        address: joi_1.default.string().required(),
        latitude: joi_1.default.number().required(),
        longitude: joi_1.default.number().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        throw new appError_1.ValidationError('Validation error', error.details);
    }
    next();
};
const schoolController = {
    createSchool,
    listSchools,
    validateSchool,
};
exports.default = schoolController;
