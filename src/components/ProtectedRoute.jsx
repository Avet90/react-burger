import { useLocation, Navigate } from 'react-router-dom';
import { getCookie } from '../utils/utils';


export default function ProtectedRoute({ children, anonymous = false }) {
  const isAuthorized = getCookie('accessToken');

  const location = useLocation();
  const from = location.state?.from || '/';
  
  if (anonymous && isAuthorized) {
    return <Navigate to={ from } />
  }

  if (!anonymous && !isAuthorized) {
    return <Navigate to="/login" state={{ from: location}}/>
  }

  return children
}
