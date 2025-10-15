import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { queryClient, formatCurrency } from "../../utilities.js";
import {
  fetchTransactionApi,
  updateTransactionStatus,
  deleteTransactionApi,
} from "../../http.js";
import Loading from "../../UI/Loading.jsx";
import Wrapper from "../../UI/Wrapper.jsx";
import Badge from "../../UI/Badge.jsx";
import { useTableAccordian } from "../../Contexts/AccordianTableCtx.jsx";
import { useModal } from "../../components/useModal.jsx";
import Table from "../../UI/Table.jsx";
import accordianDrop from "../../assets/icons/accordianDrop.svg";
import accordianDropDark from "../../assets/icons/accordianDropDark.svg";
export default function ShowTransaction() {
  const { transactionId } = useParams();
  const { close, open, Modal } = useModal();
  const { toggleItem, openId } = useTableAccordian();

  const navigate = useNavigate();
  const { data, isPending } = useSuspenseQuery({
    queryFn: () => fetchTransactionApi(transactionId),
    queryKey: [transactionId],
  });
  const { mutate: mutateStatus, isPending: statusIsPending } = useMutation({
    mutationKey: [`update status ${transactionId}`],
    mutationFn: updateTransactionStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      navigate("/transactions");
    },
  });
  const { mutate: deletingMutate, isPending: deleteIsPending } = useMutation({
    mutationKey: [`delete ${transactionId}`],
    mutationFn: deleteTransactionApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      navigate("/transactions");
    },
  });

  if (isPending || statusIsPending || deleteIsPending) {
    return (
      <div className="flex justify-center items-center h-screen z-50">
        <Loading />
      </div>
    );
  }

  function handleStatusChange(e) {
    let status = e.target.innerText;
    if (status !== data.status) {
      mutateStatus({ id: transactionId, status });
    }
  }

  return (
    <Wrapper>
      <Modal>
        <h1 className="text-2xl text-center mb-3">Are you sure?</h1>
        <p className="text-center">You Will delete this Transaction forever!</p>
        <div className="flex justify-evenly mt-5">
          <button
            onClick={close}
            className="bg-white py-2 px-6 text-black rounded-2xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => deletingMutate(transactionId)}
            className="bg-white py-2 px-6 text-black rounded-2xl cursor-pointer"
          >
            Yes
          </button>
        </div>
      </Modal>
      <div className="mb-5 flex justify-between max-sm:flex-col gap-5">
        <div className="flex gap-2 max-sm:flex-col">
          <Badge className="cursor-pointer" onClick={handleStatusChange}>
            Cancelled
          </Badge>
          <Badge className="cursor-pointer" onClick={handleStatusChange}>
            Delivered
          </Badge>
          <Badge className="cursor-pointer" onClick={handleStatusChange}>
            Shipping
          </Badge>
        </div>
        <div className="flex gap-3">
          <span>Current Status:</span>
          <Badge>{data.status}</Badge>
        </div>
      </div>
      <ul className="flex flex-col gap-5">
        <li className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold ">
            Customer: {data.customer_name} - {data.customer_id}
          </h1>
          <h1 className="text-2xl font-bold">Transaction ID: {data.id}</h1>
        </li>
        <li>Created on: {data.date.split(" ")[0]}</li>
        <li>Time: At {data.date.split(" ")[1]} O'Clock</li>
        {data.edited_on[0] !== 0 && (
          <li>
            <div className="mb-3 text-2xl font-bold">Editing History</div>
            <div>
              on {data.date.split(" ")[0]} at {data.date.split(" ")[1]} O'Clock
            </div>
          </li>
        )}
        <li>
          Payment: <Badge>{data.payment}</Badge>
        </li>
      </ul>

      <h1 className="text-2xl my-5 font-bold">Your Invoiuce</h1>
      <Table>
        <Table.head>
          <Table.rowItem className="flex-1/4 max-md:hidden">
            Product Name
          </Table.rowItem>
          <Table.rowItem className="flex-1/4 max-md:hidden">
            Price
          </Table.rowItem>
          <Table.rowItem className="flex-1/3 max-md:hidden">
            Count
          </Table.rowItem>
          <Table.rowItem className="flex-1/3 max-md:hidden">QTY</Table.rowItem>
          <Table.rowItem className="flex-1/3 max-md:hidden">
            Total
          </Table.rowItem>
        </Table.head>
        {data.transaction_products.map((product) => {
          return (
            <Table.row id={product.id} key={product.id}>
              <Table.rowItem
                onClick={() => toggleItem(product.id)}
                className="flex-1/4 max-md:flex max-md:justify-between max-md:cursor-pointer "
              >
                <span className="capitalize">{product.product_name}</span>
                <span
                  className={`md:hidden cursor-pointer duration-150 ease-in-out transition-all ${
                    openId === product.id ? "rotate-180" : ""
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
              <Table.rowItem className="flex-1/4">
                <span className="mr-2 md:hidden">Price : </span>
                <span>{formatCurrency(Number(product.product_price))}</span>
              </Table.rowItem>
              <Table.rowItem className="flex-1/3">
                <span className="mr-2 md:hidden">Count : </span>
                <span>{product.count}</span>
              </Table.rowItem>
              <Table.rowItem className="flex-1/3">
                <span className="mr-2 md:hidden">QTY : </span>
                <span>{product.QTY}</span>
              </Table.rowItem>
              <Table.rowItem className="flex-1/3">
                <span className="mr-2 md:hidden">Total : </span>
                <span>
                  {formatCurrency(
                    Number(product.count) * Number(product.product_price)
                  )}
                </span>
              </Table.rowItem>
            </Table.row>
          );
        })}
      </Table>
      <h1 className="text-2xl font-bold my-5">
        TOTAL: {formatCurrency(Number(data.transaction_coast))}{" "}
      </h1>
      <div className="mt-5 flex gap-4">
        <Link to={`/transactions/edit/${transactionId.toUpperCase()}`}>
          <button className="bg-[#E7E7E7] text-black py-1 px-5 rounded-xl cursor-pointer">
            Edit
          </button>
        </Link>
        <button
          onClick={open}
          className="bg-red-500 text-black py-1 px-5 rounded-xl cursor-pointer"
        >
          Delete
        </button>
      </div>
    </Wrapper>
  );
}
