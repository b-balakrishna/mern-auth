import React from 'react';
import { Typography, Paper, Container } from '@mui/material';

const About = () => {
    return (
        <Container maxWidth='lg' style={{ paddingTop: '2rem' }}>
            <Paper elevation={3} style={{ padding: '1.5rem' }}>
                <Typography variant='h6' paragraph>
                    Welcome to the About page!
                </Typography>

                <Typography paragraph>
                    In this project, I utilized the power of the MERN stack,
                    which includes MongoDB as the database, Express.js for the
                    server, React.js for the frontend, and Node.js for the
                    backend.
                </Typography>
                <Typography paragraph>
                    To enhance the user experience and streamline data input, I
                    implemented the{' '}
                    <span style={{ color: '#2196F3' }}>React Hook Form</span>{' '}
                    library. This allows for efficient and dynamic form handling
                    in the frontend, making the user interaction smoother and
                    more responsive.
                </Typography>
                <Typography paragraph>
                    Security is a top priority, and that's why I integrated{' '}
                    <span style={{ color: '#2196F3' }}>
                        JSON Web Tokens (JWT)
                    </span>{' '}
                    for secure authentication. JWT provides a robust and
                    efficient way to manage user authentication and
                    authorization.
                </Typography>
                <Typography paragraph>
                    <span style={{ color: '#2196F3' }}>Firebase</span>, the
                    cloud-based platform, plays a crucial role in this project.
                    It provides a scalable and reliable infrastructure for
                    various services such as real-time database, storage, and
                    authentication.
                </Typography>
                <Typography paragraph>
                    Lastly, <span style={{ color: '#2196F3' }}>Redux</span> is
                    employed for state management, ensuring a centralized and
                    predictable state for the application. This helps in
                    managing complex state transitions and providing a seamless
                    user experience.
                </Typography>
                <Typography paragraph>
                    Thank you for visiting the About page and learning more
                    about the technologies that power this project. Feel free to
                    explore other sections of the application and reach out if
                    you have any questions or feedback!
                </Typography>
            </Paper>
        </Container>
    );
};

export default About;
