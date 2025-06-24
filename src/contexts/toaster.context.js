import {createContext} from 'react';

/** @type import('react').Context<{(message: string, type: 'info' | 'success' | 'warning' | 'error'): void}> */
const ToasterContext = createContext(null);

export default ToasterContext;
