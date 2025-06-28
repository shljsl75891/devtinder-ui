import useReviewRequest from '../hooks/mutations/useReviewRequest';
import useRequests from '../hooks/queries/useRequests';
import GenericFallback from '../utils/loaders/generic.fallback';
import Gender from './ui/Gender';

const Requests = () => {
  const {data: requests, isPending} = useRequests();
  const {mutate: reviewRequest} = useReviewRequest();

  if (isPending) return GenericFallback('Requests');

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        No. of people interesed ({requests.length})
      </li>

      {requests.map(
        ({
          _id,
          sender: {firstName, skills, lastName, profileImageUrl, gender},
        }) => (
          <li key={_id} className="list-row items-center">
            <div>
              <img className="size-10 rounded-box" src={profileImageUrl} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                {firstName + ' ' + lastName}
                <Gender gender={gender} />
              </div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {skills.join(', ')}
              </div>
            </div>
            <button
              className="btn btn-secondary btn-sm ml-auto"
              onClick={() => reviewRequest({id: _id, status: 3})}
            >
              Reject
            </button>
            <button
              className="btn btn-primary btn-sm ml-auto"
              onClick={() => reviewRequest({id: _id, status: 2})}
            >
              Accept
            </button>
          </li>
        ),
      )}
    </ul>
  );
};

export default Requests;
