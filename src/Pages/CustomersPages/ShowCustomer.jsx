import { useParams, Link, useNavigate } from "react-router-dom";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  fetchCustomerApi,
  deleteCustomerApi,
  fetchTransactionsApi,
  deleteTransactionApi,
} from "../../http.js";
import { queryClient } from "../../utilities.js";
import { formatCurrency, convertObjectToArray } from "../../utilities.js";
import Wrapper from "../../UI/Wrapper.jsx";
import { useModal } from "../../components/useModal.jsx";
import Loading from "../../UI/Loading.jsx";
import Table from "../../UI/Table.jsx";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { useTableAccordian } from "../../Contexts/AccordianTableCtx";
import accordianDrop from "../../assets/icons/accordianDrop.svg";
import accordianDropDark from "../../assets/icons/accordianDropDark.svg";
import Badge from "../../UI/Badge.jsx";
export default function ShowCustomer() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { close, open, Modal } = useModal();
  const { toggleItem, openId } = useTableAccordian();

  const { mutate: deleteCustomer, isPending: deleteCustomerIsPending } =
    useMutation({
      mutationFn: deleteCustomerApi,
      mutationKey: [`delete ${customerId.toUpperCase()}`],
      onSuccess: () => {
        queryClient.invalidateQueries(["customers"]);
        navigate("/customers");
      },
    });

  const { mutate: deleteTransaction, isPending: deleteTransactionIsPending } =
    useMutation({
      mutationFn: deleteTransactionApi,
      onSuccess: () => {
        queryClient.invalidateQueries(["transactions"]);
        navigate(`/customers/${customerId}`);
      },
    });

  const { data, isPending } = useSuspenseQuery({
    queryKey: [`fetch ${customerId.toUpperCase()}`],
    queryFn: () => fetchCustomerApi(customerId),
  });
  const { data: transactionsData, isPending: transactionsIsPending } =
    useSuspenseQuery({
      queryKey: [`transactions`],
      queryFn: fetchTransactionsApi,
    });
  const transactions = convertObjectToArray(transactionsData).filter(
    (transaction) => transaction.customer_id === customerId.toUpperCase()
  );

  if (
    isPending ||
    transactionsIsPending ||
    deleteCustomerIsPending ||
    deleteTransactionIsPending
  ) {
    return (
      <div className="flex justify-center items-center h-screen z-50">
        <Loading />
      </div>
    );
  }

  let willDeleted = "";
  function handleOpenModalForTransaction(id) {
    willDeleted = id;
    open();
  }

  function handleOpenModalForCustomer(id) {
    open();
    willDeleted = id;
  }
  function handleDeleteCustomerAndTransaction() {
    if (willDeleted.startsWith("C")) {
      deleteCustomer(willDeleted);
    } else if (willDeleted.startsWith("T")) {
      deleteTransaction(willDeleted);
    }
    close();
  }

  return (
    <Wrapper>
      <Modal>
        <h1 className="text-2xl text-center mb-3">Are you sure?</h1>
        <p className="text-center">You Will delete this Customer forever!</p>
        <div className="flex justify-evenly mt-5">
          <button
            onClick={close}
            className="bg-white py-2 px-6 text-black rounded-2xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteCustomerAndTransaction}
            className="bg-white py-2 px-6 text-black rounded-2xl cursor-pointer"
          >
            Yes
          </button>
        </div>
      </Modal>
      <ul className="flex flex-col gap-5">
        <li>
          <h1 className="text-2xl font-bold">
            {data.customer_name} - {data.id}
          </h1>
        </li>
        <li className="flex gap-3">
          <button className="border py-1 px-2 rounded-md">
            purchases: {formatCurrency(Number(data.customer_purchases))}
          </button>
          <button className="border py-1 px-2 rounded-md">
            Orders: {data.customer_orders_QTY}
          </button>
        </li>
        <li>Address: {data.customer_address}</li>
        <li>Email: {data.customer_email}</li>
        <li>Phone Number: {data.customer_phone}</li>
        <li>Customer Type: {data.customer_type.toUpperCase()}</li>
      </ul>
      {transactions.length > 0 && (
        <>
          <h1 className="text-2xl my-5 font-bold">Your Transactions</h1>
          <Table>
            <Table.head>
              <Table.rowItem className="flex-1/4 max-md:hidden">
                id
              </Table.rowItem>
              <Table.rowItem className="flex-1/4 max-md:hidden">
                Price
              </Table.rowItem>
              <Table.rowItem className="flex-1/3 max-md:hidden">
                Date
              </Table.rowItem>
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
            {transactions.map((transaction) => {
              return (
                <Table.row id={transaction.id} key={transaction.id}>
                  <Table.rowItem
                    onClick={() => toggleItem(transaction.id)}
                    className="flex-1/4 max-md:flex max-md:justify-between max-md:cursor-pointer "
                  >
                    <span>{transaction.id}</span>
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
                      <Link to={`/transactions/edit/${transaction.id}`}>
                        <FaRegEdit className="h-6 w-6 " />
                      </Link>
                      <span>
                        <IoTrashOutline
                          className="h-6 w-6 cursor-pointer text-red-600"
                          onClick={() =>
                            handleOpenModalForTransaction(transaction.id)
                          }
                        />
                      </span>
                    </span>
                  </Table.rowItem>
                </Table.row>
              );
            })}
          </Table>
        </>
      )}
      <div className="mt-5 flex gap-4">
        <Link to={`/customers/edit/${customerId.toUpperCase()}`}>
          <button className="bg-[#E7E7E7] text-black py-1 px-5 rounded-xl cursor-pointer">
            Edit
          </button>
        </Link>
        <button
          onClick={() => handleOpenModalForCustomer(customerId)}
          className="bg-red-500 text-black py-1 px-5 rounded-xl cursor-pointer"
        >
          Delete
        </button>
      </div>
    </Wrapper>
  );
}
