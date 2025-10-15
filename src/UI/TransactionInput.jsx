import CreatableSelect from "react-select/creatable";
import { useContext } from "react";
import { Theme } from "../Contexts/ThemeContext";

const TransactionInput = ({ data, className, ref, ...props }) => {
  const { dark } = useContext(Theme);
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "none",
      border: "none ",
      "&:focus": {
        borderColor: "none ",
      },
      ...(state.isFocused && {
        borderColor: "transparent",
        boxShadow: "none",
      }),
    }),
    placeholder: (base) => ({
      ...base,
      color: dark ? "white" : "black",
      fontStyle: "italic",
    }),
    singleValue: (base) => ({
      ...base,
      color: dark ? "white" : "black",
    }),
  };
  return (
    <div className={className}>
      <CreatableSelect
        options={data}
        className={`basic-multi-select w-full text-black  rounded-lg border-2 border-gray-300 `}
        styles={customStyles}
        ref={ref}
        {...props}
      />
    </div>
  );
};

export default TransactionInput;
