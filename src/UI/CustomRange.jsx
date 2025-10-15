import "./slider.css";
const CustomRange = ({ rangeHandler, value }) => {
  return (
    <input
      onChange={rangeHandler}
      type="range"
      min="0"
      max="100"
      defaultValue="50"
      className={`w-full h-4 rounded-lg appearance-none bg-[#737373] accent-blue-500 slider-thumb`}
      style={
        {
          background: `linear-gradient(to right, #3b82f6 ${value}%, #d1d1d1 ${value}%)`,
        }
      }
    />
  );
};

export default CustomRange;
