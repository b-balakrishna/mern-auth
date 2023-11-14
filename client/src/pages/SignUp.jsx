import React from 'react';
import { Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const StyledGrid = styled(Grid)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 64px)',
});

const StyledPaper = styled(Paper)({
    padding: '16px',
    maxWidth: 400,
    width: '100%',
});

const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'blue',
    '&:hover': {
        textDecoration: 'underline',
    },
});

const SignUp = () => {
    return (
        <StyledGrid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
        >
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <StyledPaper elevation={3}>
                    <form>
                        <Typography variant='h5' gutterBottom align='center'>
                            Sign Up
                        </Typography>

                        <TextField
                            label='User Name'
                            id='userName'
                            fullWidth
                            margin='normal'
                        />

                        <TextField
                            label='Email Address'
                            id='email'
                            fullWidth
                            type='email'
                            helperText='Please enter a valid email address'
                            margin='normal'
                        />

                        <TextField
                            label='Password'
                            id='password'
                            fullWidth
                            type='password'
                            helperText='Please enter a valid password'
                            margin='normal'
                        />

                        <Button variant='contained' color='primary' fullWidth>
                            Sign Up
                        </Button>

                        <Typography
                            variant='body2'
                            align='center'
                            style={{ marginTop: '16px' }}
                        >
                            Already have an account?{' '}
                            <StyledLink to='/sign-in'>Log in here</StyledLink>
                        </Typography>
                    </form>
                </StyledPaper>
            </Grid>
        </StyledGrid>
    );
};

export default SignUp;
