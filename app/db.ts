// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     user_id TEXT
// )

// CREATE TABLE courses (
//     id SERIAL PRIMARY KEY,
//     name TEXT,
//     data TEXT
// );

// CREATE TABLE public.user_courses (
//     id SERIAL PRIMARY KEY,
//     user_id INTEGER REFERENCES public."user"(id) ON DELETE CASCADE,
//     course_id INTEGER REFERENCES public.courses(id) ON DELETE CASCADE,
//     is_completed BOOLEAN DEFAULT FALSE,
//     completed_at TIMESTAMP DEFAULT NULL
// );

import { sql } from "@vercel/postgres";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.POSTGRES_URL);

export async function createUser(user_id: string) {
    await sql`
        INSERT INTO users (user_id) 
        VALUES (${user_id}) 
        ON CONFLICT (user_id) DO NOTHING;
    `;
}

export async function createUserCourses(user_id: string) {
    await sql`
        WITH user_record AS (
            SELECT id FROM users WHERE user_id = ${user_id}
        )
        INSERT INTO user_courses (user_id, course_id)
        SELECT 
            user_record.id,
            courses.id
        FROM courses, user_record
        WHERE NOT EXISTS (
            SELECT 1 FROM user_courses uc 
            WHERE uc.user_id = user_record.id 
            AND uc.course_id = courses.id
        );
    `;
}

export async function getUserCourses(user_id: string) {
    const userRecord = await sql`
        SELECT id FROM users WHERE user_id = ${user_id}
    `;
    const userId = userRecord.rows[0].id;

    const result = await sql`
        SELECT c.name, uc.is_completed
        FROM user_courses uc
        JOIN courses c ON uc.course_id = c.id
        WHERE uc.user_id = ${userId};
    `;
    return result.rows;
}

export async function markCourseCompleted(user_id: string, course_name: string) {
    const userRecord = await sql`
        SELECT id FROM users WHERE user_id = ${user_id}
    `;
    const userId = userRecord.rows[0].id;

    await sql`
        UPDATE user_courses
        SET is_completed = TRUE, completed_at = CURRENT_TIMESTAMP
        WHERE user_id = ${userId} AND course_id = (
            SELECT id FROM courses WHERE name = ${course_name}
        );
    `;
}

export async function getCompletedCoursesWithData(user_id: string) {
    const userRecord = await sql`
        SELECT id FROM users WHERE user_id = ${user_id}
    `;
    const userId = userRecord.rows[0].id;

    const result = await sql`
        SELECT 
            c.name,
            c.text_data,
            uc.completed_at
        FROM user_courses uc
        JOIN courses c ON uc.course_id = c.id 
        WHERE uc.user_id = ${userId}
        AND uc.is_completed = TRUE
        ORDER BY uc.completed_at DESC;
    `;
    return result.rows;
}

export async function checkIfCourseCompleted(user_id: string, course_id: number) {
    const result = await sql`
        SELECT uc.is_completed 
        FROM user_courses uc
        JOIN users u ON uc.user_id = u.id
        WHERE u.user_id = ${user_id} 
        AND uc.course_id = ${course_id};
    `;
    return result.rows[0].is_completed;
}














