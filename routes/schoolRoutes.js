"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schoolController_1 = __importDefault(require("../controllers/schoolController"));
const router = express_1.default.Router();
router.post('/addSchool', schoolController_1.default.validateSchool, schoolController_1.default.createSchool);
router.get('/listSchools', schoolController_1.default.listSchools);
exports.default = router;
