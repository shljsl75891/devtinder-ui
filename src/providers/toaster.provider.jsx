import {useCallback, useState} from 'react';
import ToasterContext from '../contexts/toaster.context';

let idCounter = 0;

/** @type {Record<'info' | 'success' | 'warning' | 'error', import('react').JSX.Element>} */
const TOASTER_ICON_MAP = {
  info: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="stroke-info h-6 w-6 shrink-0"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  success: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="h-6 w-6 shrink-0 stroke-current"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="h-6 w-6 shrink-0 stroke-current"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667
              1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464
              0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  error: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="h-6 w-6 shrink-0 stroke-current"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0
              11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

const ToasterProvider = ({children}) => {
  const [toasters, setToasters] = useState([]);

  const showToaster = useCallback((message = '', type = 'info') => {
    const id = ++idCounter;
    setToasters(prev => [...prev, {id, message, type}]);

    setTimeout(() => {
      setToasters(prev => prev.filter(t => t.id !== id));
    }, 1500);
  }, []);

  /**
   * @type {{
   *    info: (message: string) => void,
   *    success: (message: string) => void,
   *    warning: (message: string) => void,
   *    error: (message: string) => void
   * }}
   */
  const toasterApi = {
    info: message => showToaster(message, 'info'),
    success: message => showToaster(message, 'success'),
    warning: message => showToaster(message, 'warning'),
    error: message => showToaster(message, 'error'),
  };

  return (
    <ToasterContext.Provider value={toasterApi}>
      {children}
      {toasters.length > 0 && (
        <div className="toast toast-top toast-center">
          {toasters.map(({id, message, type}) => (
            <div
              key={id}
              role="alert"
              className={`alert alert-${type} alert-soft`}
            >
              {TOASTER_ICON_MAP[type]}
              <span>{message}</span>
            </div>
          ))}
        </div>
      )}
    </ToasterContext.Provider>
  );
};

export default ToasterProvider;
