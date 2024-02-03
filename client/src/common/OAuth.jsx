import { Button } from '@mui/material';
import toast from 'react-hot-toast';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            console.log('Aquired google provider');
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log('Aquired google Result');
            const user = {
                name: result.user.displayName,
                email: result.user.email,
                photoUrl: result.user.photoURL,
                provider: 'GOOGLE',
            };
            const response = await axios.post('/api/auth/google', user, {
                withCredentials: true,
            });
            dispatch(signInSuccess(response?.data?.data));
            toast.success(response.data.message);
            navigate('/');
        } catch (error) {
            toast.error('Cannot Login with Google, Try Again');
        }
    };
    return (
        <Button
            type='button'
            variant='contained'
            color='error'
            fullWidth
            style={{ marginTop: '10px' }}
            onClick={handleGoogleClick}
        >
            Continue with Google
        </Button>
    );
};
export default OAuth;
