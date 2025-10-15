import { useRef, useState } from "react";
export default function FilterSlide({ isOpen, catigories, handleFilter }) {
  const filterRef = useRef(null);
  const inputRef = useRef(null);
  const oprators = [">", "<", "="];
  const [selectedFilter, setSelectedFilter] = useState(false);
  const [operator, setOprator] = useState(false);

  function onSubmit() {
    handleFilter((prev) => {
      return {
        ...prev,
        catigory: selectedFilter,
        operator: operator,
        value: inputRef.current.value,
      };
    });
  }

  function handleClearFilter() {
    handleFilter((prev) => {
      return {
        catigory: "",
        operator: "",
        value: "",
      };
    });
    setSelectedFilter(false);
    setOprator(false);
    inputRef.current.value = 0;
  }

  return (
    <div
      className="w-full overflow-hidden transition-all duration-300 my-5 flex flex-col gap-10 items-start max-sm:items-center"
      ref={filterRef}
      style={{
        height:
          isOpen && filterRef.current.scrollHeight !== null
            ? filterRef.current.scrollHeight
            : "0px",
      }}
    >
      <div className="flex items-center gap-3 max-sm:flex-col">
        <div>Filter By: </div>
        <div className="flex gap-1">
          {catigories.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedFilter(item)}
              className={`cursor-pointer px-6 py-2 rounded-2xl dark:bg-[#101011] bg-[#F6F6F6] ${
                selectedFilter === item ? "bg-white dark:!bg-[#1A1A1B]" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className=" flex items-center gap-3 max-sm:flex-col">
        <div>Comparison Operators: </div>
        <div className="">
          {oprators.map((item) => (
            <button
              key={item}
              onClick={() => setOprator(item)}
              className={`cursor-pointer px-6 py-2 rounded-2xl dark:bg-[#101011] bg-[#F6F6F6] ${
                operator === item ? "bg-white dark:!bg-[#1A1A1B]" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 max-sm:flex-col">
        <div>Value: </div>
        <div>
          <input
            type="number"
            className="dark:bg-[#101011]  bg-[#F6F6F6]  pl-2 w-[100px] focus:outline-none"
            defaultValue={0}
            ref={inputRef}
          />
        </div>
      </div>
      <button
        onClick={onSubmit}
        className="cursor-pointer px-6 py-2 rounded-2xl dark:bg-[#101011] bg-[#F6F6F6]"
      >
        Filter
      </button>
      <button className="cursor-pointer" onClick={handleClearFilter}>
        Clear Filter
      </button>
    </div>
  );
}
