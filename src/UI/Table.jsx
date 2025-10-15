import TableBodyItems from "./TableBodyItems.jsx";
import TableHeader from "./TableHeader.jsx";
import TableItem from "./TableItem.jsx";

export default function Table({ children }) {
  return (
    <div className="border rounded-2xl border-[#E7E7E7] dark:border-[#3D3D3D] mt-5 bg-white dark:bg-[#1A1A1B]  dark:text-white w-full h-fit">
      {children}
    </div>
  );
}

Table.head = TableHeader;
Table.row = TableBodyItems;
Table.rowItem = TableItem;
