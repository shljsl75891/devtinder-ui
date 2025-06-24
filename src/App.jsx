import {Outlet, useNavigate} from 'react-router';
import Header from './components/Header';

const App = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
