import { useState } from "react";
import { Link, Form, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import EmptyPage from "../../UI/EmptyPage.jsx";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import {
  convertObjectToArray,
  formatCurrency,
  pagination,
} from "../../utilities.js";
import {
  fetchTransactionsApi,
  deleteTransactionApi,
  fetchCustomersApi,
  fetchProducts,
} from "../../http";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { BiSolidShow } from "react-icons/bi";
import Wrapper from "../../UI/Wrapper";
import Table from "../../UI/Table";
import { useTableAccordian } from "../../Contexts/AccordianTableCtx";
import accordianDrop from "../../assets/icons/accordianDrop.svg";
import accordianDropDark from "../../assets/icons/accordianDropDark.svg";
import { useModal } from "../../components/useModal.jsx";
import Loading from "../../UI/Loading.jsx";
import { queryClient } from "../../utilities.js";
import addIcon from "../../assets/icons/add.svg";
import { CiSearch } from "react-icons/ci";
import Pagination from "../../UI/Pagination.jsx";
import Badge from "../../UI/Badge.jsx";
export default function Customers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const searchParam = searchParams.get("search");

  const { toggleItem, openId } = useTableAccordian();
  const { Modal, open, close } = useModal();
  const { data: transactionsData, fetchIsPending } = useSuspenseQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactionsApi,
  });
  const { data: customersData } = useSuspenseQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomersApi,
  });
  const { data: productsData } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { isPending: deleteIsPending, mutate: deleteTransaction } = useMutation(
    {
      mutationKey: ["delete-transaction"],
      mutationFn: deleteTransactionApi,
      onSuccess: () => {
        queryClient.invalidateQueries(["transactions"]);
        setSearchParams({ page: 1 });
        toast.success("Transaction has been deleted successfully");
      },
      onError: () => {
        toast.error("Something went Wrong!. Could not delete this Transaction");
      },
    }
  );
  let pageNumber = Number(searchParams.get("page")) || 1;
  // Response Data to a Reg Array
  // Search
  let transactions = convertObjectToArray(transactionsData);
  if (searchParam) {
    transactions = transactions.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(searchParam.toLowerCase())
    );
  }
  let { pagesNumber, items } = pagination(transactions, pageNumber, 3);

  function nextPage() {
    let currentPage = Number(searchParams.get("page")) || 1;
    if (currentPage < pagesNumber) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", currentPage + 1);
      setSearchParams(newParams);
    }
    toggleItem("");
  }
  function prevPage() {
    let currentPage = Number(searchParams.get("page"));
    if (currentPage > 1) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", currentPage - 1);
      setSearchParams(newParams);
    }
    toggleItem("");
  }

  // Pending Handling

  if (deleteIsPending || fetchIsPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!transactionsData) {
    let isEmptyAtAll = false;
    if (!customersData || !productsData) {
      isEmptyAtAll = true;
    }
    return (
      <EmptyPage
        btnContent="Add Transaction"
        path={isEmptyAtAll ? "" : `/transactions/new`}
        buttonIsHidden={isEmptyAtAll}
      >
        {isEmptyAtAll
          ? "You have to have customers and products to create a transaction"
          : "Add Your First Transaction!"}
      </EmptyPage>
    );
  }
  let selectedId = false;
  function handleDeleteProduct() {
    deleteTransaction(selectedId);
    close();
    toggleItem("");
  }

  function handleOpenModal(itemId) {
    open();
    selectedId = itemId;
  }

  return (
    <Wrapper>
      <Modal>
        <h1 className="text-2xl text-center mb-3">Are you sure?</h1>
        <p className="text-center">You will delete this transaction forever!</p>
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
        <div
          className={`w-[60%] relative h-fit  max-md:w-[80%] max-md:max-md:z-10  max-md:bg-white max-md:dark:bg-[#252525]`}
        >
          <Form action={`/transactions?page=1&search=${searchText}`}>
            <input
              type="text"
              name="search"
              placeholder="Search Transactions"
              className="focus:outline-none border-1 max-md:max-md:z-4 border-[#B0B0B0] dark:border-[#D1D1D1] rounded-lg px-[16px] py-[8px] w-full text-[#949494] "
            />
            <CiSearch className="text-[#949494] text-2xl absolute top-2 right-3" />
          </Form>
        </div>
        <Link to="new">
          <button className="px-[12px] py-[8px] text-white cursor-pointer bg-[#1A71F6] rounded-2xl flex items-center gap-2 justify-center">
            <span>New Transaction</span>
            <img src={addIcon} className="w-[30px] h-[30px]" alt="" />
          </button>
        </Link>
      </div>

      <Table>
        <Table.head>
          <Table.rowItem className="flex-1/12 max-md:hidden">id</Table.rowItem>
          <Table.rowItem className="flex-1/2">Customer Name</Table.rowItem>
          <Table.rowItem className="flex-1/4 max-md:hidden">
            Price
          </Table.rowItem>
          <Table.rowItem className="flex-1/3 max-md:hidden">Date</Table.rowItem>
          <Table.rowItem className="flex-1/3 max-md:hidden">
            Payment
          </Table.rowItem>
          <Table.rowItem className="flex-1/3 max-md:hidden">
            Status
          </Table.rowItem>
          <Table.rowItem className="flex-1/4 max-md:hidden">
            Actions
          </Table.rowItem>
        </Table.head>
        {transactions &&
          items.map((transaction) => {
            return (
              <Table.row id={transaction.id} key={transaction.id}>
                <Table.rowItem className="flex-1/12 max-md:hidden">
                  <span>{transaction.id} </span>
                </Table.rowItem>
                <Table.rowItem
                  onClick={() => toggleItem(transaction.id)}
                  className="flex-1/2 max-md:flex max-md:justify-between max-md:cursor-pointer "
                >
                  <span>{transaction.customer_name}</span>
                  <span
                    className={`md:hidden cursor-pointer duration-150 ease-in-out transition-all ${
                      openId === transaction.id ? "rotate-180" : ""
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
                  <span>{transaction.id} </span>
                </Table.rowItem>

                <Table.rowItem className="flex-1/4">
                  <span className="mr-2 md:hidden">Price : </span>
                  <span>{formatCurrency(transaction.transaction_coast)}</span>
                </Table.rowItem>
                <Table.rowItem className="flex-1/3">
                  <span className="mr-2 md:hidden">Date : </span>
                  <span>{transaction.date}</span>
                </Table.rowItem>
                <Table.rowItem className="flex-1/3">
                  <span className="mr-2 md:hidden">Payment : </span>
                  <span>
                    <Badge>{transaction.payment}</Badge>
                  </span>
                </Table.rowItem>
                <Table.rowItem className="flex-1/3">
                  <span className="mr-2 md:hidden">Status : </span>
                  <span>
                    <Badge>{transaction.status}</Badge>
                  </span>
                </Table.rowItem>
                <Table.rowItem className="flex-1/4 flex gap-2">
                  <span className="mr-2 md:hidden">Actions</span>
                  <span className="flex justify-evenly max-md:justify-start max-md:gap-2 gap-3">
                    <Link to={`${transaction.id.toUpperCase()}`}>
                      <BiSolidShow className="h-6 w-6" />
                    </Link>
                    <Link to={`edit/${transaction.id}`}>
                      <FaRegEdit className="h-6 w-6 " />
                    </Link>
                    <span>
                      <IoTrashOutline
                        className="h-6 w-6 cursor-pointer text-red-500"
                        onClick={() => handleOpenModal(transaction.id)}
                      />
                    </span>
                  </span>
                </Table.rowItem>
              </Table.row>
            );
          })}
        {items.length === 0 && (
          <div className="w-full text-2xl font-bold text-center py-5">
            No Transactions Founded
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
