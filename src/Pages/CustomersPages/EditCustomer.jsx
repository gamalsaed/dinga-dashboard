import CustomerForm from "../../components/CustomerLayouts/CustomerForm.jsx";
export default function EditCustomer() {
  return (
    <div className="p-5 w-[70%] max-lg:w-full border-[#E7E7E7] dark:border-[#3D3D3D] mt-5 my-5 bg-white dark:bg-[#1A1A1B]  dark:text-white rounded-2xl">
      <h1 className="text-3xl font-medium">Customer Information</h1>
      <CustomerForm />
    </div>
  );
}
