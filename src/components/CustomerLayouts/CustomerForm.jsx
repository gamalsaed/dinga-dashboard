import { useState } from "react";
import { Form, useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  addCustomerApi,
  fetchCustomersApi,
  updateCustomerApi,
} from "../../http.js";
import { convertObjectToArray, queryClient } from "../../utilities.js";
import Loading from "../../UI/Loading.jsx";
import Wrapper from "../../UI/Wrapper.jsx";
import Input from "../../UI/Input.jsx";
import { useModal } from "../useModal.jsx";
export default function CustomerForm() {
  const { data: customersData } = useSuspenseQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomersApi,
  });
  const { open, close, Modal } = useModal();
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const isNew = location.pathname.toLocaleLowerCase().includes("new");
  const [customerType, setCustomerType] = useState(
    (customersData && customerId && customersData[customerId]?.customer_type) ||
      ""
  );

  function handleCustomerTypeChange(e) {
    setCustomerType(e.target.value);
  }

  let customers = customersData ? convertObjectToArray(customersData) : false;


  const {
    mutate: updateCustomer,
    error: updateIsError,
    isPending: updateIsPending,
  } = useMutation({
    mutationFn: updateCustomerApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
      navigate("/customers");
    },
  });

  const {
    mutate: addCustomer,
    error,
    isIdle,
    isPending,
  } = useMutation({
    mutationFn: addCustomerApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
      navigate("/customers");
    },
  });

  const handleSaveProduct = (e) => {
    const data = new FormData(e.target);
    let cId = "C_1";
    let customer = (!isNew && customersData[cId]) || "";
    if (customers && isNew) {
      cId = `C_${Number(customers[customers.length - 1].id.split("_")[1]) + 1}`;
    } else if (!isNew) {
      cId = customer.id;
    }

    const errors = [];

    const customerInfo = {
      id: cId,
      customer_name: data.get("name"),
      customer_email: data.get("email"),
      customer_phone: data.get("phone"),
      customer_address: data.get("address"),
      customer_type: data.get("type"),
      customer_orders_QTY: !isNew ? customer.customer_orders : 0,
      customer_purchases: !isNew ? customer.customer_purchases : 0,
      customer_orders: !isNew ? customer.customer_purchases : [],
    };

    if (
      customerInfo.customer_name &&
      customerInfo.customer_email &&
      customerInfo.customer_phone &&
      customerInfo.customer_address &&
      customerInfo.customer_type
    ) {
      if (!isNew) {
        const updatedCustomer = { ...customer, ...customerInfo };
        updateCustomer(updatedCustomer);
        return;
      } else {
        console.log(isNew);
        addCustomer(customerInfo);
        return;
      }
    }
    // Check for empty fields
    for (const [key, value] of data.entries()) {
      if (value === "") {
        errors.push(key);
      }
    }
    setErrors(errors);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancelCustomer = () => {
    navigate("/customers");
    close();
  };

  if (isPending || updateIsPending) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Loading />
      </div>
    );
  }

  return (
    <Wrapper className="w-[70%]">
      {customerId === undefined && (
        <h1 className="text-3xl font-medium">Create a New Customer</h1>
      )}

      {errors && (
        <div className="my-5">
          {errors.map((error) => (
            <p key={error} className="text-sm text-red-500">
              {error} is required
            </p>
          ))}
        </div>
      )}
      <Form onSubmit={handleSaveProduct}>
        <Input
          name="name"
          type="text"
          placeholder="Enter Your Name"
          defaultValue={!isNew ? customersData[customerId]?.customer_name : ""}
        >
          Full Name
        </Input>
        <Input
          name="email"
          type="text"
          placeholder="Enter Your Email"
          defaultValue={!isNew ? customersData[customerId]?.customer_email : ""}
        >
          Email Address
        </Input>
        <Input
          name="phone"
          type="number"
          placeholder="Phone Number"
          defaultValue={!isNew ? customersData[customerId]?.customer_phone : ""}
        >
          Phone Number
        </Input>
        <Input
          name="address"
          type="legand"
          placeholder="Physical Address"
          defaultValue={
            !isNew ? customersData[customerId]?.customer_address : ""
          }
        >
          Full Address
        </Input>
        <div className="flex flex-col gap-2 mb-5 w-full">
          <label className="font-medium text-xl dark:text-white">
            Customer Type
          </label>
          <select
            name="type"
            className="border-2 border-gray-300 rounded-lg p-2 w-full dark:text-white text-black"
            value={customerType}
            onChange={handleCustomerTypeChange}
          >
            <option value={undefined} className="!text-[#737373]">
              Select Customer Type
            </option>
            <option value="b2b" className="!text-black">
              B2B
            </option>
            <option value="b2c" className="!text-black">
              B2C
            </option>
          </select>
        </div>
        <div className="flex justify-between">
          <button
            className="px-6 py-3 mt-5 bg-white text-[#1A71F6] rounded-xl cursor-pointer"
            type="button"
            onClick={open}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 mt-5 bg-[#1A71F6] text-white rounded-xl cursor-pointer"
            type="submit"
          >
            {isNew ? "Create Customer" : "Save Info"}
          </button>
        </div>
        <Modal>
          <div>
            <h1 className="text-2xl font-medium text-center">
              Are you sure you want to discard the changes?
            </h1>
            <p className="text-center text-[#737373] mt-2">
              All changes will be lost if you leave this page.
            </p>
          </div>
          <div className="flex justify-evenly mt-5">
            <button
              className="px-6 py-3  bg-[#1A71F6] text-white rounded-xl cursor-pointer"
              type="button"
              onClick={close}
            >
              No
            </button>
            <button
              className="px-6 py-3  bg-white text-[#1A71F6] rounded-xl cursor-pointer"
              onClick={handleCancelCustomer}
              type="button"
            >
              Discard Changes
            </button>
          </div>
        </Modal>
      </Form>
    </Wrapper>
  );
}
