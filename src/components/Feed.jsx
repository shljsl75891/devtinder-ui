import {useState} from 'react';
import useSendRequest from '../hooks/mutations/useSendRequest';
import usePaginatedFeed from '../hooks/queries/usePaginatedFeed';
import {FEED_LIMIT} from '../utils/constants';
import GenericFallback from '../utils/loaders/generic.fallback';
import Gender from './ui/Gender';

const Feed = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [clickedLabel, setClickedLabel] = useState(null);
  const [
    {data: usersCount, isPending: isCountPending},
    {data: users, isPending: isUsersPending},
  ] = usePaginatedFeed(selectedPage);

  const user = users?.[0];
  const numberOfPages = Array(
    Math.ceil((usersCount?.count ?? 0) / FEED_LIMIT),
  ).fill(0);

  const {mutate: sendRequest, isPending: isRequestPending} =
    useSendRequest(selectedPage);

  if (isCountPending || isUsersPending) {
    return GenericFallback('Feed');
  }

  /** @param {string} label The label for the button */
  const getButtonLabel = label => {
    return isRequestPending && label === clickedLabel ? (
      <span className="loading loading-spinner"></span>
    ) : (
      label
    );
  };

  /**
   * @param {string} userId The ID of the user to send a request to
   * @param {0 | 1} status The status of the request (0 for interested, 1 for ignored)
   */
  const handleSendRequest = (userId, status) => {
    setClickedLabel(status === 0 ? 'Interested' : 'Ignore');
    sendRequest({userId, status}, {onSettled: () => setClickedLabel(null)});
  };

  return (
    <>
      {usersCount?.count !== 0 && user ? (
        <div className="mx-auto card bg-base-200 w-96 shadow-md mt-40">
          <div className="card-body">
            <h2 className="card-title">
              {`${user.firstName} ${user.lastName}  `}
              <Gender gender={user.gender} />
            </h2>
            <p>{user.about}</p>
          </div>
          <figure>
            <img
              src={user.profileImageUrl}
              className="h-80 w-full"
              alt="profile-pic"
            />
          </figure>
          <div className="flex justify-between items-center m-6">
            <button
              className={
                'btn btn-secondary' + (isRequestPending ? ' btn-disabled' : '')
              }
              onClick={() => handleSendRequest(user._id, 1)}
            >
              {getButtonLabel('Ignore')}
            </button>
            <button
              className={
                'btn btn-primary' + (isRequestPending ? ' btn-disabled' : '')
              }
              onClick={() => handleSendRequest(user._id, 0)}
            >
              {getButtonLabel('Interested')}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-40">
          <span className="mx-auto text-xl font-black">
            No more recommendations on this page. Try navigating to other pages
          </span>
        </div>
      )}
      <div className="join flex justify-center mt-14">
        {numberOfPages.map((_, idx) => (
          <span
            key={idx}
            className={
              'join-item btn btn-md' +
              (idx === selectedPage - 1 && ' btn-active')
            }
            onClick={() => {
              setSelectedPage(idx + 1);
            }}
          >
            {idx + 1}
          </span>
        ))}
      </div>
    </>
  );
};

export default Feed;
