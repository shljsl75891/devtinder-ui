import {useQueryClient} from '@tanstack/react-query';
import {Link, useNavigate} from 'react-router';
import appLogo from '../assets/app-logo.png';
import environment from '../config/environment';
import useLoggedInUser from '../hooks/useLoggedInUser';
import useToaster from '../hooks/useToaster';
import {isNullOrUndefined} from '../utils/constants';

const Header = () => {
  const navigate = useNavigate();
  const toatser = useToaster();
  const user = useLoggedInUser();
  const queryClient = useQueryClient();

  const onLogOut = async () => {
    await fetch(`${environment.baseApiUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    queryClient.invalidateQueries({queryKey: ['loggedInUser']});
    navigate('/login');
    toatser('Logged out successfully', 'success');
  };

  return (
    <div className="navbar bg-base-300 shadow-lg">
      <div className="flex-none">
        <img src={appLogo} className="h-8 w-12" />
      </div>
      <div className="flex-1 text-lg font-bold">DevTinder</div>
      {!isNullOrUndefined(user?.profileImageUrl) && (
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="profile-pic" src={user?.profileImageUrl} />
                <div>{user?.firstName + ' ' + user?.lastName}</div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/" className="cursor-pointer">
                  Feed
                </Link>
              </li>
              <li>
                <Link to="/profile" className="cursor-pointer">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="cursor-pointer">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="cursor-pointer">
                  Requests
                </Link>
              </li>
              <li>
                <button onClick={onLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
