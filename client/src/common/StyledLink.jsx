import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'blue',
    '&:hover': {
        textDecoration: 'underline',
    },
});
export default StyledLink;
