import { 
    createUser, 
    createUserCourses, 
    getUserCourses, 
    markCourseCompleted, 
    getCompletedCoursesWithData 
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

        if (!user_id) {
            return new Response('User ID is required', { status: 400 });
        }

        const courses = await getUserCourses(user_id);
        return new Response(JSON.stringify(courses), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error fetching user courses:', error);
        return new Response('Error fetching user courses', { status: 500 });
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

        const completedCourses = await getCompletedCoursesWithData(user_id);
        return new Response(JSON.stringify(completedCourses), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error fetching completed courses:', error);
        return new Response('Error fetching completed courses', { status: 500 });
    }
}
