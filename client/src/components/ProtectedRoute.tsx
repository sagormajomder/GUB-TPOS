import { Box, CircularProgress } from '@chakra-ui/react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store';

interface PropType {
    children?: JSX.Element;
    roles: string[]
    isLoading: boolean
}

const ProtectedRoute = ({ children, roles, isLoading }: PropType) => {
    // from the account slice get the isLoggedIn state 
    const { user } = useAppSelector(x => x.account);

    if (isLoading) {
        return (
            <Box
                height={"90vh"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}>
                <CircularProgress isIndeterminate color='green.300' />
            </Box>
        )
    }

    if (!user) {
        return <Navigate to={'/'} replace />;
    }
    if (roles && roles.indexOf(user.role!) === -1) {
        // Redirect to an unauthorized page if the user's role doesn't match
        return <Navigate to={'/unauthorized'} replace />;
    }
    return children ? children : <Outlet />;
};

export default ProtectedRoute;