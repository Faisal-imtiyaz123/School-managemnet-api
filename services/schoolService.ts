import pool from "../config/db";


interface School {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
}

async function schoolExists(name: string, address: string, latitude: number, longitude: number): Promise<boolean> {
    const [rows] = await pool.query(
        'SELECT COUNT(*) AS count FROM schools WHERE name = ? AND address = ? ',
        [name, address, latitude, longitude]
    );
    return (rows as any[])[0].count > 0;
}

async function addSchool(school: School): Promise<void> {
    await pool.query('INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)', [
        school.name,
        school.address,
        school.latitude,
        school.longitude,
    ]);
}

async function listAllSchools(): Promise<School[]> {
    const [rows] = await pool.query('SELECT * FROM schools');
    return rows as School[];
}

export const schoolService = {
    schoolExists,
    addSchool,
    listAllSchools,
};
