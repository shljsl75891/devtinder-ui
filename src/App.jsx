import {Outlet} from 'react-router';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
