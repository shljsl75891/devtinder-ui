import useConnections from '../hooks/queries/useConnections';
import GenericFallback from '../utils/loaders/generic.fallback';
import Gender from './ui/Gender';

const Connections = () => {
  const {data: connections, isPending} = useConnections();

  if (isPending) {
    return GenericFallback('Connections');
  }

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Your Connections ({connections.length})
      </li>

      {connections.map(
        ({_id, firstName, about, lastName, profileImageUrl, gender}) => (
          <li key={_id} className="list-row">
            <div>
              <img className="size-10 rounded-box" src={profileImageUrl} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div>{firstName + ' ' + lastName}</div>
                <Gender gender={gender} />
              </div>
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
