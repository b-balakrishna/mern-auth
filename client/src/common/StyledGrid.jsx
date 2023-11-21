import { Grid } from '@mui/material';
import { styled } from '@mui/system';

const StyledGrid = styled(Grid)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 64px)',
});
export default StyledGrid;
