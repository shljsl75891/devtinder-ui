/** @type {import('react').FC<{gender: 0 | 1 | 2}> } */
const Gender = ({gender}) => {
  const getGenderIcon = () => {
    switch (gender) {
      case 0:
        return '🙋🏼‍♂️';
      case 1:
        return '🙋🏼‍♀️';
      case 2:
        return '⚧️';
      default:
        return '❓';
    }
  };

  return <span className="text-3xl">{getGenderIcon()}</span>;
};

export default Gender;
