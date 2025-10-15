import icon from "../assets/icons/icon-right.svg";
export default function ProductsFooter({
  prevPage,
  nextPage,
  pageNumber,
  pagesNumber,
}) {
  const arrowLeftStyle = `rotate-180 filter cursor-pointer brightness-0 saturate-0 dark:brightness-0 dark:invert  dark:saturate-50 ${
    pageNumber === 1 &&
    "dark:brightness-75  dark:saturate-75 brightness-100  saturate-100  !cursor-default"
  }`;

  const arrowRightStyle = `filter cursor-pointer brightness-0 saturate-0 dark:brightness-0 dark:invert  dark:saturate-50 ${
    pagesNumber === pageNumber &&
    "dark:brightness-75  dark:saturate-75 brightness-100  saturate-100  !cursor-default"
  }`;

  return (
    <div className="flex justify-between items-end flex-row-reverse">
      <div className="mt-5 flex gap-3">
        <img src={icon} className={arrowLeftStyle} onClick={prevPage} />
        <img src={icon} className={arrowRightStyle} onClick={nextPage} />
      </div>
      <div className="text-[#B0B0B0]">
        <span>{pageNumber} of </span>
        <span>{pagesNumber} Pages</span>
      </div>
    </div>
  );
}
