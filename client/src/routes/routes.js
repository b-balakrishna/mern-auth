import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const About = lazy(() => import('../pages/About'));
const SignUp = lazy(() => import('../pages/SignUp'));
const Profile = lazy(() => import('../pages/Profile'));

export const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/sign-in',
        exact: true,
        component: Login,
    },
    {
        path: '/about',
        exact: true,
        component: About,
    },
    {
        path: '/sign-up',
        exact: true,
        component: SignUp,
    },
    // Private routes
    {
        path: '/profile',
        exact: true,
        component: Profile,
        private: true,
    },
    {
        path: '/404',
        component: Login,
    },
];

export default routes;
