import {isNullOrUndefined} from '../../utils/constants';

/** @type {import('react').FC<{gender: 0 | 1 | 2}> } */
const Gender = ({gender}) => {
  return (
    <span className="text-xl">
      {!isNullOrUndefined(gender) && (gender === 0 ? '♂️' : '♀️')}
    </span>
  );
};

export default Gender;
