import { 
    createUser, 
    createUserCourses, 
    getUserCourses, 
    markCourseCompleted, 
    getCompletedCoursesWithData,
    checkIfCourseCompleted,
    checkIfUserExists,
    getCompletedCourses
} from '@/app/db';

export async function POST(request: Request) {
    try {
        const { user_id } = await request.json();
        
        if (!user_id) {
            return new Response('User ID is required', { status: 400 });
        }

        // Create user and their courses
        await createUser(user_id);
        await createUserCourses(user_id);

        return new Response('User created successfully', { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return new Response('Error creating user', { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const user_id = searchParams.get('user_id');
        const course_id = searchParams.get('course_id');

        if (!user_id) {
            return new Response('User ID is required', { status: 400 });
        }

        const userExists = await checkIfUserExists(user_id);
        if (!userExists) {
            return new Response('User does not exist', { status: 404 });
        }

        // If only user_id is provided, return a success response without fetching courses
        if (!course_id) {
            return new Response(JSON.stringify({ userExists: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // If course_id is provided, check completion status
        try {
            const isCompleted = await checkIfCourseCompleted(user_id, parseInt(course_id));
            return new Response(JSON.stringify({ isCompleted }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (err) {
            console.error('Error checking course completion:', err);
            return new Response(JSON.stringify({ error: 'Failed to check course completion' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (error) {
        console.error('Error in GET route:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


export async function PUT(request: Request) {
    try {
        const { user_id, course_name } = await request.json();

        if (!user_id || !course_name) {
            return new Response('User ID and course name are required', { status: 400 });
        }

        await markCourseCompleted(user_id, course_name);
        return new Response('Course marked as completed', { status: 200 });
    } catch (error) {
        console.error('Error marking course as completed:', error);
        return new Response('Error marking course as completed', { status: 500 });
    }
}

// Additional endpoint for getting completed courses with data
export async function PATCH(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const user_id = searchParams.get('user_id');

        if (!user_id) {
            return new Response('User ID is required', { status: 400 });
        }

        const completedCourses = await getCompletedCourses(user_id);
        return new Response(JSON.stringify(completedCourses), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error fetching completed courses:', error);
        return new Response('Error fetching completed courses', { status: 500 });
    }
}
