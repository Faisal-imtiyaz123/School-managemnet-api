"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.round = exports.getDistance = void 0;
const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degrees) => degrees * (Math.PI / 180);
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
exports.getDistance = getDistance;
const round = (num, places) => Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
exports.round = round;
