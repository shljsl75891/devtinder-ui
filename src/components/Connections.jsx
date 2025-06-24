import {useLoaderData} from 'react-router';

const Connections = () => {
  const connections = useLoaderData();

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Your Connections ({connections.length})
      </li>

      {connections.map(
        ({firstName, about, lastName, profileImageUrl, gender}) => (
          <li className="list-row">
            <div>
              <img className="size-10 rounded-box" src={profileImageUrl} />
            </div>
            <div>
              <div>{firstName + ' ' + lastName}</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {about}
              </div>
            </div>
            <button className="btn btn-secondary btn-sm ml-auto">Chat</button>
          </li>
        ),
      )}
    </ul>
  );
};

export default Connections;
