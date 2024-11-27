import db from '../config/db';
import { School } from '../models/school';
import { round } from '../utils/utilityFunctions';

const addSchool = (school: School): Promise<void> => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        db.query(query, [school.name, school.address, school.latitude, school.longitude], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};
const schoolExists = async (name: string, address: string, latitude: number, longitude: number): Promise<boolean> => {
    const roundedLat = round(latitude, 6); 
    const roundedLon = round(longitude, 6); 
    const query = 'SELECT * FROM schools WHERE name = ? AND address = ? ';
    const [rows] = await db.promise().query(query, [name, address, roundedLat, roundedLon]);
    return (rows as any).length > 0;
};
 const listAllSchools = (): Promise<School[]> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM schools';
        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results as School[]);
        });
    });
};
export const schoolService = {
    addSchool,
    schoolExists,
    listAllSchools,
}
