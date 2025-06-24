import {useRouteError} from 'react-router';

const ErrorPage = () => {
  /** @type {*} */
  const error = useRouteError();

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-gray-600 mt-2">
        {error?.message || 'An unexpected error occurred.'}
      </p>
    </div>
  );
};

export default ErrorPage;
