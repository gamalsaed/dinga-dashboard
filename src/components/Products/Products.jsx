import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useModal } from "../useModal.jsx";
import { fetchProducts, deleteProductApi } from "../../http.js";
import { productsFilter, searchFilter } from "../../utilities.js";
import { useTableAccordian } from "../../Contexts/AccordianTableCtx.jsx";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { BiSolidShow } from "react-icons/bi";

import Table from "../../UI/Table.jsx";
import FilterSlide from "../FilterSlide.jsx";
import filterList from "../../assets/icons/filter-list.svg";
import addIcon from "../../assets/icons/add.svg";
import accordianDrop from "../../assets/icons/accordianDrop.svg";
import accordianDropDark from "../../assets/icons/accordianDropDark.svg";
import Badge from "../../UI/Badge.jsx";
import ProductsNav from "./ProductsNav.jsx";
import EmptyPage from "../../UI/EmptyPage.jsx";
import Pagination from "../../UI/Pagination.jsx";
import {
  pagination,
  formatCurrency,
  productsCount,
  convertObjectToArray,
  queryClient,
} from "../../utilities.js";
import Loading from "../../UI/Loading.jsx";
export default function Products() {
  const {
    data: productsData,
    error,
    isPending,
    isSuccess,
  } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { mutate: deleteProduct, isPending: deletePending } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: deleteProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const { Modal, open, close } = useModal();

  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleItem, openId } = useTableAccordian();
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const searchParam = searchParams.get("search");
  let itemsCount;
  let products;
  let itemsPerPage = 4;

  const [filterProperty, setFilterProperty] = useState({
    catigory: "",
    operator: "",
    value: "",
  });

  let pageNumber = Number(searchParams.get("page")) || 1;
  useEffect(() => {
    if (!searchParams.get("page")) {
      const newParams = new URLSearchParams(searchParams);
      setSearchParams({ page: pageNumber + 1 });
      setSearchParams(newParams);
    }
  }, []);

  // Fetching Data Error Handling

  if (!productsData) {
    return (
      <EmptyPage btnContent="Add Product" path="/products/new">
        Add Your First Product!
      </EmptyPage>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">
          Error: {error.message}
        </h1>
      </div>
    );
  }

  if (isSuccess && productsData) {
    products = convertObjectToArray(productsData);
    products = products.filter((item) => item !== null);
    itemsCount = productsCount(products);
  }

  // Filter
  if (
    filterProperty.catigory &&
    filterProperty.operator &&
    filterProperty.value
  ) {
    products = productsFilter(products, filterProperty);
    pageNumber = 1;
  }
  let id = 0;

  function handleOpenModal(itemId) {
    open();
    id = itemId;
  }

  function handleDeleteProduct() {
    deleteProduct(id);
    close();
  }
  // Search
  products = searchFilter(products, searchParam);

  // Handle Delete Product Error Handling
  if (deletePending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  // Pagination
  let { pagesNumber, items } = pagination(products, pageNumber, itemsPerPage);
  function nextPage() {
    let currentPage = Number(searchParams.get("page")) || 1;
    if (currentPage < pagesNumber) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", currentPage + 1);
      setSearchParams(newParams);
    }
  }

  function prevPage() {
    let currentPage = Number(searchParams.get("page"));
    if (currentPage > 1) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", currentPage - 1);
      setSearchParams(newParams);
    }
  }

  return (
    <div className="p-5 border-[#E7E7E7] dark:border-[#3D3D3D] mt-5 my-5 bg-white dark:bg-[#1A1A1B]  dark:text-white rounded-2xl">
      <Modal>
        <h1 className="text-2xl text-center mb-3">Are you sure?</h1>
        <p className="text-center">You Will delete this product forever!</p>
        <div className="flex justify-evenly mt-5">
          <button
            onClick={close}
            className="bg-white py-2 px-6 text-black rounded-2xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeleteProduct()}
            className="bg-white py-2 px-6 text-black rounded-2xl cursor-pointer"
          >
            Yes
          </button>
        </div>
      </Modal>
      <div className="flex items-center justify-between mb-5">
        <button
          className="px-[12px] py-[8px] cursor-pointer border-[#E7E7E7] dark:border-[#3D3D3D] rounded-2xl border flex items-center gap-2"
          onClick={() => setFilterIsOpen(!filterIsOpen)}
        >
          <div>Filter</div>
          <img
            src={filterList}
            className="w-[30px] h-[30px] brightness-50 dark:brightness-75 dark:invert dark:saturate-100 transition-all duration-300"
            alt=""
          />
        </button>
        <Link to="new">
          <button className="px-[12px] py-[8px] text-white cursor-pointer bg-[#1A71F6] rounded-2xl flex items-center gap-2 justify-center">
            <span>New Product</span>
            <img src={addIcon} className="w-[30px] h-[30px]" alt="" />
          </button>
        </Link>
      </div>
      <FilterSlide
        isOpen={filterIsOpen}
        catigories={["Price", "Size", "QTY", "Sales"]}
        filterProperty={filterProperty}
        handleFilter={setFilterProperty}
      />
      {/* Sneakers Jacket T-Shirt Bag */}
      <ProductsNav itemsCount={itemsCount} />

      <Table>
        <Table.head>
          <Table.rowItem className="flex-1/12 max-md:hidden">id</Table.rowItem>
          <Table.rowItem className="flex-1/2">Product</Table.rowItem>
          <Table.rowItem className="flex-1/4 max-md:hidden">
            Price
          </Table.rowItem>
          <Table.rowItem className="flex-1/4 max-md:hidden">
            Color
          </Table.rowItem>
          <Table.rowItem className="flex-1/4 max-md:hidden">Size</Table.rowItem>
          <Table.rowItem className="flex-1/4 max-md:hidden">QTY</Table.rowItem>
          <Table.rowItem className="flex-1/4 max-md:hidden">
            Sales
          </Table.rowItem>
          <Table.rowItem className="flex-1/4 max-md:hidden">
            Status
          </Table.rowItem>
          <Table.rowItem className="flex-1/4 max-md:hidden">
            Actions
          </Table.rowItem>
        </Table.head>
        {products !== -1 &&
          items.map((item) => {
            return (
              <Table.row id={item.id} key={item.id} className="h-auto">
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
                  <span>{formatCurrency(Number(item.product_price))}</span>
                </Table.rowItem>
                <Table.rowItem className="flex-1/4">
                  <span className="mr-2 md:hidden"> Color : </span>
                  {item.product_color && item.product_color.length > 2
                    ? item.product_color
                        .slice(0, 2)
                        .map((color) => (
                          <span>
                            {color.value[0].toUpperCase() +
                              color.value.slice(1)}{" "}
                          </span>
                        ))
                    : item?.product_color.map((color) => (
                        <span key={color}>
                          {color.value[0].toUpperCase() + color.value.slice(1)}{" "}
                        </span>
                      ))}
                  {item.product_color && item.product_color.length > 2 && (
                    <span className="text-shadow-gray-100 opacity-50">
                      . . .
                    </span>
                  )}
                </Table.rowItem>
                <Table.rowItem className="flex-1/4">
                  <span className="mr-2 md:hidden"> Size : </span>
                  <span>{item.size}</span>
                </Table.rowItem>
                <Table.rowItem className="flex-1/4">
                  <span className="mr-2 md:hidden"> QTY : </span>
                  <span>{item.QTY}</span>
                </Table.rowItem>
                <Table.rowItem className="flex-1/4">
                  <span className="mr-2 md:hidden"> Sales : </span>
                  <span>{item.product_sales}</span>
                </Table.rowItem>
                <Table.rowItem className="flex-1/4">
                  <Badge>{item.product_status}</Badge>
                </Table.rowItem>
                <Table.rowItem className="flex-1/4 flex  justify-evenly items-center max-md:justify-start gap-2 max-md:gap-5">
                  <Link to={`/products/${item.id.toUpperCase()}`}>
                    <BiSolidShow className="h-6 w-6" />
                  </Link>
                  <Link to={`edit/${item.id}`}>
                    <FaRegEdit className="h-6 w-6" />
                  </Link>
                  <span>
                    <IoTrashOutline
                      className="h-6 w-6 cursor-pointer text-red-500"
                      onClick={() => handleOpenModal(item.id)}
                    />
                  </span>
                </Table.rowItem>
              </Table.row>
            );
          })}
        {items.length === 0 && (
          <div className="w-full text-2xl font-bold text-center py-5">
            No Products
          </div>
        )}
      </Table>
      <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        pageNumber={pageNumber}
        pagesNumber={pagesNumber}
      />
    </div>
  );
}
