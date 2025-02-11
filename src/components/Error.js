import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <div>
      <h2>OOPS!</h2>
      <h3> You have reached an unrecognized URL</h3>
      <h4>
        error:{err.status} {err.statusText}
      </h4>
    </div>
  );
};

export default Error;
