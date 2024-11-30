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
exports.schoolService = void 0;
const db_1 = __importDefault(require("../config/db"));
function schoolExists(name, address, latitude, longitude) {
    return __awaiter(this, void 0, void 0, function* () {
        const [rows] = yield db_1.default.query('SELECT COUNT(*) AS count FROM schools WHERE name = ? AND address = ? ', [name, address, latitude, longitude]);
        return rows[0].count > 0;
    });
}
function addSchool(school) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.default.query('INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)', [
            school.name,
            school.address,
            school.latitude,
            school.longitude,
        ]);
    });
}
function listAllSchools() {
    return __awaiter(this, void 0, void 0, function* () {
        const [rows] = yield db_1.default.query('SELECT * FROM schools');
        return rows;
    });
}
exports.schoolService = {
    schoolExists,
    addSchool,
    listAllSchools,
};
