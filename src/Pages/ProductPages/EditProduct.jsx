import ProductForm from "../../components/Products/ProductForm";
export default function EditProduct() {
  return (
    <div className="p-5 w-[70%] max-lg:w-full border-[#E7E7E7] dark:border-[#3D3D3D] mt-5 my-5 bg-white dark:bg-[#1A1A1B]  dark:text-white rounded-2xl">
      <h1 className="text-3xl font-medium">Product Information</h1>
      <ProductForm />
    </div>
  );
}
