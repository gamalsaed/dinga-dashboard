import { useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import Select from "react-select";

import { fetchProducts, addProductApi, updateProductApi } from "../../http.js";
import { convertObjectToArray, queryClient } from "../../utilities.js";
import Input from "../../UI/Input.jsx";
import { useModal } from "../useModal.jsx";
import Loading from "../../UI/Loading.jsx";

const colors = [
  { value: "ocean", label: "Ocean", color: "#00B8D9" },
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

export default function ProductForm() {
  const { productId } = useParams();

  let productsData;
  let product;
  const { data: products } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const {
    mutate: addProduct,
    error,
    isPending: addProductIsPending,
  } = useMutation({
    mutationFn: addProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      navigate("/products");
    },
  });

  const { mutate: updateProduct, isPending: updateProductIsPending } =
    useMutation({
      mutationFn: updateProductApi,
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
        navigate("/products");
      },
    });

  const [errors, setErrors] = useState([]);
  const { open, close, Modal } = useModal();
  const navigate = useNavigate();
  const [category, setCategory] = useState(
    (products && productId && products[productId]?.type) || ""
  );
  const [status, setStatus] = useState(
    (products && productId && products[productId]?.product_status) || ""
  );
  const [editProduct, setEditProduct] = useState(
    (products && productId && products[productId]) || false
  );
  const [selectedColor, setSelectedColor] = useState(
    (products && productId && products[productId]?.product_color) || []
  );

  if (addProductIsPending || updateProductIsPending) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loading />
      </div>
    );
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }
  function handleStatusChange(e) {
    setStatus(e.target.value);
  }
  if (products) {
    product = products[productId];

    productsData = convertObjectToArray(products);
  }

  if (error) {
    console.log(error);
    return (
      <div>
        <h1 className="text-2xl text-center">Something Went wrong!</h1>
        <p className="text-sm text-center">Please try again later</p>
      </div>
    );
  }

  const handleCancelProduct = () => {
    navigate("/products");
    close();
  };

  const handleSaveProduct = (e) => {
    const data = new FormData(e.target);
    let id = "P_1";

    if (products && !editProduct) {
      id = `P_${
        Number(productsData[productsData.length - 1].id.split("_")[1]) + 1
      }`;
    } else if (editProduct) {
      id = editProduct.id;
    }

    const errors = [];
    // let colors = selectedColor.map((color) => color.value);
    const productData = {
      id: id,
      product_name: data.get("name"),
      size: data.get("size"),
      product_color: selectedColor,
      type: data.get("type"),
      product_price: data.get("product_price"),
      QTY: data.get("QTY"),
      product_status: data.get("status"),
      product_photo: data.getAll("img"),
      product_sales: 0,
    };

    if (
      productData.product_name &&
      productData.size &&
      productData.product_color.length > 0 &&
      productData.type &&
      productData.product_price &&
      productData.QTY &&
      productData.product_status
    ) {
      if (editProduct) {
        updateProduct(productData);

        window.scrollTo({
          top: 0,
        });
        return;
      } else {
        addProduct(productData);
        return;
      }
    }

    // Check for empty fields
    for (const [key, value] of data.entries()) {
      if (value === "" && key !== "img") {
        errors.push(key);
      }
    }
    setErrors(errors);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "none",
      border: "none ",
      "&:focus": {
        borderColor: "none ",
      },
      ...(state.isFocused && {
        borderColor: "transparent",
        boxShadow: "none",
      }),
    }),
  };

  return (
    <>
      {errors && (
        <div className="my-5">
          {errors.map((error) => (
            <p key={error} className="text-sm text-red-500">
              {error} is required
            </p>
          ))}
        </div>
      )}
      <Form className="mt-5" onSubmit={handleSaveProduct}>
        <Input
          name="name"
          placeholder="Product Name"
          defaultValue={product?.product_name}
        >
          Product Name
        </Input>
        <div className="flex w-full gap-4">
          <Input name="size" placeholder="Size" defaultValue={product?.size}>
            Size
          </Input>
        </div>
        <div className="flex w-full gap-2 flex-col mb-5">
          <label className="font-medium text-xl dark:text-white">Color</label>
          <div className="flex w-full gap-4 rounded-lg border-2 border-gray-300  ">
            <Select
              name="product_color"
              isMulti
              options={colors}
              className="basic-multi-select w-full text-black"
              classNamePrefix="select"
              styles={customStyles}
              placeholder="Chose Your Color"
              onChange={setSelectedColor}
              defaultValue={productId && products[productId]?.product_color}
              // ref={selectedRef}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-5 w-full">
          <label className="font-medium text-xl dark:text-white">
            Product Category
          </label>
          <select
            name="type"
            className="border-2 border-gray-300 rounded-lg p-2 w-full dark:text-white text-black"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value={undefined} className="!text-[#737373]">
              Select product category
            </option>
            <option value="sneakers" className="!text-black">
              Sneakers
            </option>
            <option value="jacket" className="!text-black">
              Jacket
            </option>
            <option value="tshirt" className="!text-black">
              T-Shirt
            </option>
            <option value="bag" className="!text-black">
              Bag
            </option>
          </select>
        </div>
        <Input
          name="product_price"
          type="number"
          placeholder="Price"
          defaultValue={product?.product_price}
        >
          Price
        </Input>
        <Input
          name="QTY"
          type="number"
          placeholder="QTY"
          defaultValue={product?.QTY}
        >
          Quantity
        </Input>
        <div className="flex flex-col gap-2 mb-5 w-full">
          <label className="font-medium text-xl dark:text-white">
            Status Product
          </label>
          <select
            name="status"
            areia_placeholder="Select status  product"
            className="border-2 border-gray-300 rounded-lg p-2 w-full dark:text-white text-black"
            value={status}
            onChange={handleStatusChange}
          >
            <option value={undefined} className="!text-[#737373]">
              Select status product
            </option>
            <option value="available" className="!text-black">
              available
            </option>
            <option value="out_of_stock" className="!text-black">
              out of stock
            </option>
          </select>
        </div>
        <div>
          <Input
            name="img"
            type="text"
            placeholder="Image URL ( Optional )"
            defaultValue={product?.product_photo[0]}
          >
            Iamge URL 1
          </Input>
          <Input
            name="img"
            type="text"
            placeholder="Image URL ( Optional )"
            defaultValue={product?.product_photo[1]}
          >
            Iamge URL 2
          </Input>
          <Input
            name="img"
            type="text"
            placeholder="Image URL ( Optional )"
            defaultValue={product?.product_photo[2]}
          >
            Iamge URL 3
          </Input>
          <Input
            name="img"
            type="text"
            placeholder="Image URL ( Optional )"
            defaultValue={product?.product_photo[3]}
          >
            Iamge URL 4
          </Input>
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
              {!productId ? "Save Product" : "Update Product"}
            </button>
          </div>
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
              onClick={handleCancelProduct}
              type="button"
            >
              Discard Changes
            </button>
          </div>
        </Modal>
      </Form>
    </>
  );
}
