import {Link} from 'react-router';
import appLogo from '../assets/app-logo.png';
import useLogout from '../hooks/mutations/useLogout';
import useLoggedInUser from '../hooks/queries/useLoggedInUser';
import {isNullOrUndefined} from '../utils/constants';

const Header = () => {
  const user = useLoggedInUser();
  const {mutate: logout} = useLogout();

  return (
    <div className="navbar bg-base-300 shadow-lg justify-between">
      <Link to="/" className="flex items-center">
        <div className="flex-none">
          <img src={appLogo} className="h-8 w-12" />
        </div>
        <div className="flex-1 text-lg font-bold">DevTinder</div>
      </Link>
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
                <button onClick={() => logout()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
