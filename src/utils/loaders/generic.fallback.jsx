/** @param {string} entity - The name of the entity being loaded */
const GenericFallback = entity => (
  <div className="flex flex-col justify-center items-center mt-80">
    <p>{`Loading ${entity}... Please wait`}</p>
    <div className="w-24 loading loading-infinity " />
  </div>
);

export default GenericFallback;
