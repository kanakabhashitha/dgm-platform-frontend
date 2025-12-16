import { Riple } from "react-loading-indicators";

const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Riple color="#008B8A" size="small" />
    </div>
  );
};

export default Loader;
