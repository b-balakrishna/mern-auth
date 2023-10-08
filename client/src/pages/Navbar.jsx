import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const linkStyle = {
    textDecoration: 'none', // Remove underline
    color: 'inherit', // Inherit the color from the parent element (Button in this case)
};
export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                    >
                        <Link to='/' style={linkStyle}>
                            Auth
                        </Link>
                    </Typography>
                    <Button color='inherit'>
                        <Link to='/' style={linkStyle}>
                            Home
                        </Link>
                    </Button>
                    <Button color='inherit'>
                        <Link to='/about' style={linkStyle}>
                            About
                        </Link>
                    </Button>
                    <Button color='inherit'>
                        <Link to='/sign-in' style={linkStyle}>
                            Sign In
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
