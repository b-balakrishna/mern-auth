import { Typography, Grid } from '@mui/material';

const Home = () => {
    return (
        <Grid
            container
            direction='column'
            justifyContent='center'
            alignItems='center'
            spacing={2}
            style={{ minHeight: '70vh', backgroundColor: '#ffffff' }}
        >
            <Grid item>
                <Typography
                    variant='h4'
                    align='center'
                    sx={{
                        color: '#2196F3',
                        fontFamily: 'cursive',
                    }}
                >
                    Welcome!
                </Typography>
            </Grid>

            <Grid item>
                <Typography
                    variant='body1'
                    align='center'
                    sx={{ fontFamily: 'cursive' }}
                >
                    I'm <span style={{ color: '#2196F3' }}>BalaKrishna</span>, a
                    passionate Full Stack Developer.
                </Typography>
            </Grid>

            <Grid item>
                <Typography
                    variant='body1'
                    align='center'
                    sx={{ fontFamily: 'cursive' }}
                >
                    I specialize in building MERN stack applications and
                    implementing secure authentication systems.
                </Typography>
            </Grid>

            <Grid item>
                <Typography
                    variant='body1'
                    align='center'
                    sx={{ fontFamily: 'cursive' }}
                >
                    Let's turn your ideas into reality!
                </Typography>
            </Grid>

            <Grid item>
                <Typography
                    variant='body1'
                    align='center'
                    sx={{ fontFamily: 'cursive' }}
                >
                    Contact me via email:
                    <a
                        href='mailto:battulabalakrishna063@gmail.com'
                        style={{
                            color: '#2196F3',
                            textDecoration: 'none',
                            fontFamily: 'cursive',
                        }}
                    >
                        battulabalakrishna063@gmail.com
                    </a>
                </Typography>
            </Grid>

            <Grid item>
                <Typography
                    variant='body1'
                    align='center'
                    sx={{ fontFamily: 'cursive' }}
                >
                    Explore the MERN Auth app.
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Home;
