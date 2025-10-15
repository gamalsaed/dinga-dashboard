import { useParams, Link, useNavigate } from "react-router-dom";
import { queryClient } from "../../utilities.js";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { deleteProductApi, fetchProductApi } from "../../http.js";
import { formatCurrency } from "../../utilities.js";
import Wrapper from "../../UI/Wrapper.jsx";
import Badge from "../../UI/Badge.jsx";
import { useModal } from "../../components/useModal.jsx";
import Loading from "../../UI/Loading.jsx";
export default function ShowProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { Modal, open, close } = useModal();
  const { data: product, isPending: productIsPending } = useSuspenseQuery({
    queryKey: [`${productId.toUpperCase()}`],
    queryFn: () => fetchProductApi(productId.toUpperCase()),
  });

  const { mutate: deleteProduct, isPending } = useMutation({
    mutationKey: [`delete ${productId}`],
    mutationFn: deleteProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      navigate("/products");
    },
  });

  function handleDeleteProduct() {
    deleteProduct(productId);
  }

  if (isPending || productIsPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (product === null) {
    throw new Error("Sorry the product you are looking for is not defiend");
  }

  return (
    <Wrapper>
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
      <ul className="flex flex-col gap-4">
        <li className="text-2xl mb-5">
          {product.product_name} - {product.id}
        </li>
        <li className="flex gap-3">
          <button className="border py-1 px-2 rounded-md">
            Price: {formatCurrency(Number(product.product_price))}
          </button>
          <button className="border py-1 px-2 rounded-md">
            QTY: {product.QTY}
          </button>
        </li>
        <li className="flex gap-10">
          <span>Size: {product.size}</span>
          <span>Type: {product.type}</span>
        </li>
        <li>
          Status: <Badge className={`ml-3`}>{product.product_status}</Badge>
        </li>
        <li>
          Colors:
          {product.product_color.map((color) => {
            return (
              <Badge
                className="ml-2 w-fit"
                style={{ backgroundColor: color.color }}
                key={color.label}
              >
                {color.label}
              </Badge>
            );
          })}
        </li>
        <li>Sales: {formatCurrency(product.product_sales)}</li>
      </ul>
      <div className="mt-5 flex gap-4">
        <Link to={`/products/edit/${productId.toUpperCase()}`}>
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
