import { useState, useEffect } from "react";
import Input from "../UI/Input.jsx";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { Form, useLocation, useNavigate, useParams } from "react-router-dom";
import TransactionInput from "../UI/TransactionInput.jsx";
import Wrapper from "../UI/Wrapper.jsx";
import {
  formatCurrency,
  queryClient,
  convertObjectToArray,
  getDate,
} from "../utilities.js";
import {
  fetchProducts,
  fetchCustomersApi,
  fetchTransactionsApi,
  addTransactionApi,
} from "../http.js";
import Loading from "../UI/Loading.jsx";
export default function TransactionForm() {
  const { transactionId } = useParams();
  const location = useLocation();
  const isNew = location.pathname.toLocaleLowerCase().includes("new");
  const { data: transactionsData } = useSuspenseQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactionsApi,
  });
  const transactions = convertObjectToArray(transactionsData);
  const { data: customersData } = useSuspenseQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomersApi,
  });

  const {
    data: productsData,
    error,
    isPending,
    isSuccess,
  } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const navigate = useNavigate();
  const { mutate: addTransaction, isPending: addTransactionIsPending } =
    useMutation({
      mutationFn: addTransactionApi,
      onSuccess: () => {
        queryClient.invalidateQueries(["transactions"]);
        navigate("/transactions");
      },
    });

  const [selected, setSelected] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [ammount, setAmmount] = useState(0);
  const [errors, setErrors] = useState("");
  const [transactionType, setTransactionType] = useState(undefined);
  const [currentCount, setCurrentCount] = useState(1);
  const [ammountPaied, setAmmountPaied] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState(undefined);

  useEffect(() => {
    if (!isNew) {
      let id = transactionId.toLocaleUpperCase();
      const oldTransaction = transactionsData[id];

      setSelectedProducts(oldTransaction.transaction_products);
      const customer = {
        ...customersData[oldTransaction.customer_id],
        label: oldTransaction.customer_name,
        value: oldTransaction.customer_name,
      };
      setSelectedCustomer(customer);
      setTransactionType(oldTransaction.payment);
      setAmmountPaied(oldTransaction.amount_paid);
      customersData;
    }
  }, []);

  useEffect(() => {
    let coast = 0;
    if (selectedProducts.length > 0) {
      selectedProducts.forEach((item) => {
        coast += Number(item.product_price) * Number(item.count);
      });
    }
    setAmmount(coast);
    if (transactionType === "unpaied") {
      setRemainingAmount(coast - ammountPaied);
    }
  }, [selectedProducts, ammountPaied, transactionType]);

  useEffect(() => {
    setTimeout(() => {
      setErrors("");
    }, 3000);
  }, [errors]);

  const productsOptions = convertObjectToArray(productsData).map((item) => {
    return { ...item, value: item.product_name, label: item.product_name };
  });

  const customersOptions = convertObjectToArray(customersData).map((item) => {
    return { ...item, value: item.customer_name, label: item.customer_name };
  });

  function transactionTypeChange(e) {
    setTransactionType(e.target.value);
  }

  function handleMainCountChange(e) {
    const value = Number(e.target.value);
    setCurrentCount(value);
  }

  function handleAddProduct(e, add) {
    if (e.key === "Enter" || (add === "clicked" && selected !== null)) {
      e.preventDefault();
      for (let i = 0; i < selectedProducts.length; i++) {
        if (selected.id === selectedProducts[i].id) {
          setErrors("This Item is already exist!.");
          setSelected("");
          return;
        }
      }
      if (typeof selected !== "string") {
        const newProduct = { ...selected, count: currentCount };
        setSelectedProducts((prev) => {
          return [...prev, newProduct];
        });
        setCurrentCount(1);
        setSelected("");
      }
    }
  }

  function handleMainChange(product) {
    setSelected(product);
  }
  function handleCustomerChange(customer) {
    setSelectedCustomer(customer);
  }

  function handleProductChange(item, index) {
    let isDup = false;
    const prevItem = selectedProducts[index];

    selectedProducts.forEach((product, index) => {
      if (product.id === item.id) {
        isDup = true;
      }
    });
    if (isDup) {
      setErrors("This Item is already exist!.");
    } else {
      setSelectedProducts((prev) => {
        const newArray = [...prev];
        newArray[index] = { ...item, count: prevItem.count };

        return newArray;
      });
    }
  }

  function handleCountChange(e, index) {
    setSelectedProducts((prev) => {
      const newArray = [...prev];
      newArray[index] = { ...newArray[index], count: e.target.value };
      return newArray;
    });
  }

  function handleRemoveItem(index) {
    setSelectedProducts((prev) => {
      const newArray = [...prev.filter((item, i) => i !== index)];
      return newArray;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let dayTime = getDate();
    const data = new FormData(e.target);
    let id;
    if (transactions.length > 0 && isNew) {
      id = `T_${
        Number(transactions[transactions.length - 1].id.split("_")[1]) + 1
      }`;
    } else if (!isNew) {
      id = transactionId.toLocaleUpperCase();
    } else if (transactions.length === 0 && isNew) {
      id = "T_1";
    }
    let transaction_coast = 0;
    selectedProducts.map(
      (item) => (transaction_coast += item.product_price * item.count)
    );

    const transactionData = {
      id,
      customer_name: data.get("customer_name"),
      customer_id: selectedCustomer.id,
      payment: data.get("type"),
      remaining_amount: remainingAmount,
      transaction_products: selectedProducts,
      date: isNew ? dayTime : transactionsData[id].date,
      status: "Shipping",
      amount_paid: ammountPaied,
      edited_on: [0],
      transaction_coast,
    };
    if (!isNew) {
      if (transactionsData[id].edited_on[0] === 0) {
        transactionData.edited_on = [dayTime];
      } else {
        transactionData.edited_on = [
          ...transactionsData[id].edited_on,
          dayTime,
        ];
      }
    }

    if (
      selectedProducts.length > 0 &&
      transactionData.customer_name &&
      transactionData.payment &&
      transactionData.payment !== "Select..."
    ) {
      addTransaction(transactionData);
      return;
    } else {
      setErrors("You have to fill this form!");
    }
  }

  if (addTransactionIsPending) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Loading />
      </div>
    );
  }

  return (
    <Wrapper>
      <Form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {errors && <div className="text-red-400 w-fit mx-auto">{errors}</div>}

        <div className="flex flex-col gap-2 w-full">
          <label className="font-medium text-xl dark:text-white">
            Customer
          </label>
          <TransactionInput
            data={customersOptions}
            name="customer_name"
            placeholder="Customer Name"
            value={selectedCustomer}
            onChange={handleCustomerChange}
          />
        </div>
        <div className="flex flex-col gap-2  w-full">
          <label className="font-medium text-xl dark:text-white">
            Paied or Unpaied?
          </label>
          <select
            name="type"
            className="border-2 border-gray-300 rounded-lg p-2 w-full dark:text-white text-black"
            value={transactionType}
            onChange={transactionTypeChange}
          >
            <option className="!text-[#737373] italic">Select...</option>
            <option value="paied" className="!text-black">
              Paied
            </option>
            <option value="unpaied" className="!text-black">
              Unpaied
            </option>
          </select>
        </div>
        {transactionType === "unpaied" && (
          <Input
            value={ammountPaied}
            min={0}
            onChange={(e) => setAmmountPaied(e.target.value)}
            type="number"
          >
            Amount paid
          </Input>
        )}

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <div className="flex w-full gap-5 items-center justify-center">
              <TransactionInput
                data={productsOptions}
                name="product"
                className="w-full"
                onChange={handleMainChange}
                value={selected}
              />

              <span>
                <input
                  type="number"
                  name="product_count"
                  className={`border-2 border-gray-300 rounded-lg p-2 w-[40%] `}
                  min={1}
                  value={currentCount}
                  onChange={handleMainCountChange}
                  onKeyDown={(e) => handleAddProduct(e, "key")}
                />
              </span>
              <div className="hidden max-md:block">
                <button onClick={(e) => handleAddProduct(e, "clicked")}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            {selectedProducts.length > 0 &&
              selectedProducts.map((product, i) => {
                return (
                  <div className="flex w-full gap-5" key={product.id}>
                    <TransactionInput
                      data={productsOptions}
                      name="product"
                      className="w-full"
                      value={selectedProducts[i]}
                      onChange={(item) => handleProductChange(item, i)}
                    />

                    <span>
                      <input
                        type="number"
                        name="product_count"
                        className={`border-2 border-gray-300 rounded-lg p-2 w-[40%] `}
                        value={Number(product.count)}
                        onChange={(e) => handleCountChange(e, i)}
                      />
                    </span>
                    <button
                      onClick={() => handleRemoveItem(i)}
                      className="cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
          </div>
          <div className="flex flex-col gap-1 mt-5">
            <span className="font-semibold text-xl">
              Ammount: {formatCurrency(ammount)}
            </span>
            {transactionType === "unpaied" && (
              <span className="font-semibold text-xl">
                Remaining amount: {formatCurrency(remainingAmount)}
              </span>
            )}
          </div>
          <button
            className="px-6 py-3 mt-5 bg-[#1A71F6] text-white rounded-xl cursor-pointer"
            type="submit"
          >
            {isNew ? "Create Transaction" : "Update Transaction"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
}
