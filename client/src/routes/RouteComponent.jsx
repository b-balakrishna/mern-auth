import { Navigate } from 'react-router-dom';

const RouteComponent = ({ route, currentUser }) => {
    if (route.private && !currentUser) {
        return <Navigate to='/' replace />;
    }

    return route.component ? <route.component routes={route.routes} /> : null;
};
export default RouteComponent;
