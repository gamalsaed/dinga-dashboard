import { useState } from "react";
import { Link, Form, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import EmptyPage from "../../UI/EmptyPage.jsx";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import {
  convertObjectToArray,
  formatCurrency,
  pagination,
  customersFilter,
} from "../../utilities.js";
import { fetchCustomersApi, deleteCustomerApi } from "../../http";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { BiSolidShow } from "react-icons/bi";

import Wrapper from "../../UI/Wrapper";
import FilterSlide from "../FilterSlide";
import Table from "../../UI/Table";
import { useTableAccordian } from "../../Contexts/AccordianTableCtx";
import accordianDrop from "../../assets/icons/accordianDrop.svg";
import accordianDropDark from "../../assets/icons/accordianDropDark.svg";
import { useModal } from "../useModal.jsx";
import Loading from "../../UI/Loading.jsx";
import { queryClient, searchFilter } from "../../utilities.js";
import addIcon from "../../assets/icons/add.svg";
import filterList from "../../assets/icons/filter-list.svg";
import { CiSearch } from "react-icons/ci";
import Pagination from "../../UI/Pagination.jsx";
export default function Customers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const searchParam = searchParams.get("search");

  const { toggleItem, openId } = useTableAccordian();
  const { Modal, open, close } = useModal();
  const [filterProperty, setFilterProperty] = useState({
    catigory: "",
    operator: "",
    value: "",
  });
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const { data: customersData, fetchIsPending } = useSuspenseQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomersApi,
  });
  const { isPending: deleteIsPending, mutate: deleteCustomer } = useMutation({
    mutationKey: ["delete-customer"],
    mutationFn: deleteCustomerApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
      setSearchParams({ page: 1 });
      toast.success("Customer has been deleted successfully");
    },
    onError: () => {
      toast.error("Something went Wrong!. Could not delete this customer");
    },
  });
  let pageNumber = Number(searchParams.get("page")) || 1;
  // Response Data to a Reg Array
  // Search
  let customers = searchFilter(
    convertObjectToArray(customersData),
    searchParam
  );

  if (
    filterProperty.catigory &&
    filterProperty.operator &&
    filterProperty.value
  ) {
    customers = customersFilter(customers, filterProperty);
    pageNumber = 1;
  }

  let { pagesNumber, items } = pagination(customers, pageNumber, 3);

  // if (customers.length > 0 && items.length === 0) {
  // }

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

  // Pending Handling

  if (deleteIsPending || fetchIsPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  let selectedId = false;
  if (!customersData) {
    return (
      <EmptyPage btnContent="Add Customer" path="/customers/new">
        Add Your First Customer!
      </EmptyPage>
    );
  }

  function handleDeleteProduct() {
    deleteCustomer(selectedId);
    close();
  }

  function handleOpenModal(itemId) {
    open();
    selectedId = itemId;
  }
  return (
    <Wrapper>
      <Modal>
        <h1 className="text-2xl text-center mb-3">Are you sure?</h1>
        <p className="text-center">You Will delete this customer forever!</p>
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
      <div className="flex items-center justify-between max-md:flex-col max-md:justify-center max-md:gap-5">
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
        <div
          className={`w-[60%] relative h-fit  max-md:w-[80%] max-md:max-md:z-10  max-md:bg-white max-md:dark:bg-[#252525]`}
        >
          <Form action={`/customers?page=1&search=${searchText}`}>
            <input
              type="text"
              name="search"
              placeholder="Search Customer"
              className="focus:outline-none border-1 max-md:max-md:z-4 border-[#B0B0B0] dark:border-[#D1D1D1] rounded-lg px-[16px] py-[8px] w-full text-[#949494] "
            />
            <CiSearch className="text-[#949494] text-2xl absolute top-2 right-3" />
          </Form>
        </div>
        <Link to="new">
          <button className="px-[12px] py-[8px] text-white cursor-pointer bg-[#1A71F6] rounded-2xl flex items-center gap-2 justify-center">
            <span>New Customer</span>
            <img src={addIcon} className="w-[30px] h-[30px]" alt="" />
          </button>
        </Link>
      </div>
      <FilterSlide
        isOpen={filterIsOpen}
        catigories={["Purchases", "Order QTY"]}
        filterProperty={filterProperty}
        handleFilter={setFilterProperty}
      />
      <Table>
        <Table.head>
          <Table.rowItem className="flex-1/12 max-md:hidden">id</Table.rowItem>
          <Table.rowItem className="flex-1/3">Customer Name</Table.rowItem>
          <Table.rowItem className="flex-1/3 max-md:hidden">
            Contact
          </Table.rowItem>
          <Table.rowItem className="flex-1/2 max-md:hidden">
            Address
          </Table.rowItem>
          <Table.rowItem className="flex-1/4 max-md:hidden">
            Purchases
          </Table.rowItem>
          <Table.rowItem className="flex-1/3 max-md:hidden">
            Order QTY
          </Table.rowItem>
          <Table.rowItem className="flex-1/4 max-md:hidden">
            Actions
          </Table.rowItem>
        </Table.head>
        {customers !== -1 &&
          items.map((customer) => {
            return (
              <Table.row id={customer.id} key={customer.id}>
                <Table.rowItem className="flex-1/12 max-md:hidden">
                  <span>{customer.id} </span>
                </Table.rowItem>
                <Table.rowItem
                  onClick={() => toggleItem(customer.id)}
                  className="flex-1/3 max-md:flex max-md:justify-between max-md:cursor-pointer "
                >
                  <span>{customer.customer_name}</span>
                  <span
                    className={`md:hidden cursor-pointer duration-150 ease-in-out transition-all ${
                      openId === customer.id ? "rotate-180" : ""
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
                  <span className="mr-2 md:hidden">ID : </span>
                  <span>{customer.id} </span>
                </Table.rowItem>
                <Table.rowItem className="flex-1/3">
                  <span className="mr-2 md:hidden">Contact : </span>
                  <span>{customer.customer_phone}</span>
                </Table.rowItem>
                <Table.rowItem className="flex-1/2">
                  <span className="mr-2 md:hidden">Address : </span>
                  <span>{customer.customer_address}</span>
                </Table.rowItem>
                <Table.rowItem className="flex-1/4">
                  <span className="mr-2 md:hidden">Purchases : </span>
                  <span>{formatCurrency(customer.customer_purchases)}</span>
                </Table.rowItem>
                <Table.rowItem className="flex-1/3">
                  <span className="mr-2 md:hidden">Orders : </span>
                  <span>{customer.customer_orders_QTY}</span>
                </Table.rowItem>
                <Table.rowItem className="flex-1/4 flex gap-2">
                  <span className="mr-2 md:hidden">Actions</span>
                  <span className="flex justify-evenly max-md:justify-start max-md:gap-2 gap-3">
                    <Link to={`/customers/${customer.id.toUpperCase()}`}>
                      <BiSolidShow className="h-6 w-6" />
                    </Link>
                    <Link to={`edit/${customer.id}`}>
                      <FaRegEdit className="h-6 w-6 " />
                    </Link>
                    <span>
                      <IoTrashOutline
                        className="h-6 w-6 cursor-pointer text-red-500"
                        onClick={() => handleOpenModal(customer.id)}
                      />
                    </span>
                  </span>
                </Table.rowItem>
              </Table.row>
            );
          })}
        {items.length === 0 && (
          <div className="w-full text-2xl font-bold text-center py-5">
            No Customers Found
          </div>
        )}
      </Table>
      <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        pageNumber={pageNumber}
        pagesNumber={pagesNumber}
      />
    </Wrapper>
  );
}
