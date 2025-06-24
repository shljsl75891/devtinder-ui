import {useContext} from 'react';
import ToasterContext from '../contexts/toaster.context';

const useToaster = () => useContext(ToasterContext);

export default useToaster;
