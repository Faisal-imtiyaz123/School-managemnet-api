"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schoolRoutes_1 = __importDefault(require("./routes/schoolRoutes"));
const cors_1 = __importDefault(require("cors"));
const errorContoller_1 = require("./controllers/errorContoller");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use(express_1.default.json());
app.use('/api/schools', schoolRoutes_1.default);
app.use(errorContoller_1.globalErrorHandler);
exports.default = app;
