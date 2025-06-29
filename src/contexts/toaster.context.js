import {createContext} from 'react';

/** @type import('react').Context<{
 *    info: (message: string) => void,
 *    success: (message: string) => void,
 *    warning: (message: string) => void,
 *    error: (message: string) => void
 * }> */
const ToasterContext = createContext(null);

export default ToasterContext;
