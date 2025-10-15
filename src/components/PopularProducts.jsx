import { Link } from "react-router-dom";
import Table from "../UI/Table.jsx";
import ArrowUp from "../assets/icons/arrow-up-right.svg";
import DUMMY_PRODUCTS from "../Data/products.json";
import Badge from "../UI/Badge.jsx";
import accordianDrop from "../assets/icons/accordianDrop.svg";
import accordianDropDark from "../assets/icons/accordianDropDark.svg";
import { useTableAccordian } from "../Contexts/AccordianTableCtx.jsx";
import { formatCurrency } from "../utilities.js";
export default function PopularProducts() {
  const { toggleItem, openId } = useTableAccordian();
  const products = DUMMY_PRODUCTS.slice(0, 4);
  return (
    <div className="w-full  bg-white dark:bg-[#1A1A1B] mt-5 dark:text-white rounded-2xl p-[20px] overflow-y-hidden flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <div>Popular Products</div>
        <Link to="products?page=1">
          <div className="flex gap-2">
            <span>Show All</span>
            <img
              src={ArrowUp}
              className={`w-[30px] brightness-75 invert saturate-100`}
            />
          </div>
        </Link>
      </div>
      {/* 232 */}
      <Table>
        <Table.head>
          <Table.rowItem className="flex-1/12 max-md:hidden">id</Table.rowItem>
          <Table.rowItem className="flex-1/2">Product</Table.rowItem>
          <Table.rowItem className="flex-1/4 max-md:hidden">
            Price
          </Table.rowItem>
          <Table.rowItem className="flex-1/4 max-md:hidden">
            Sales
          </Table.rowItem>
          <Table.rowItem className="flex-1/4 max-md:hidden">
            Status
          </Table.rowItem>
        </Table.head>
        {products.map((item) => {
          return (
            <Table.row id={item.id} key={item.id}>
              <Table.rowItem className="flex-1/12 max-md:hidden">
                {item.id}
              </Table.rowItem>
              <Table.rowItem
                onClick={() => toggleItem(item.id)}
                className="flex-1/2 max-md:flex max-md:justify-between max-md:cursor-pointer "
              >
                <span>{item.product_name}</span>
                <span
                  className={`md:hidden cursor-pointer duration-150 ease-in-out transition-all ${
                    openId === item.id ? "rotate-180" : ""
                  }`}
                >
                  <img
                    src={accordianDrop}
                    className="dark:hidden md:hidden"
                    alt=""
                  />
                  <img
                    src={accordianDropDark}
                    className="dark:block hidden md:hidden"
                    alt=""
                  />
                </span>
              </Table.rowItem>
              <Table.rowItem className="flex-1/12 md:hidden">
                <span className="mr-2 md:hidden"> ID : </span>
                <span> {item.id}</span>
              </Table.rowItem>
              <Table.rowItem className="flex-1/4">
                <span className="mr-2 md:hidden"> Price : </span>
                <span>{formatCurrency(item.product_price)}</span>
              </Table.rowItem>
              <Table.rowItem className="flex-1/4">
                <span className="mr-2 md:hidden"> Sales : </span>
                <span>{item.product_sales}</span>
              </Table.rowItem>
              <Table.rowItem className="flex-1/4">
                <Badge>{item.product_status}</Badge>
              </Table.rowItem>
            </Table.row>
          );
        })}
      </Table>
    </div>
  );
}
