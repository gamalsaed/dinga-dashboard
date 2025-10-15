import ProductNavItem from "../../UI/ProductNavItem";
export default function ProductsNav({ itemsCount }) {
  return (
    <>
      <div className="text-[#B0B0B0] text-md my-5 flex  items-center border rounded-2xl border-[#E7E7E7] dark:border-[#3D3D3D] p-2 bg-white dark:bg-[#1A1A1B]  dark:text-white w-full h-fit  ">
        <ProductNavItem search="sneakers" count={itemsCount.sneakers}>
          Sneakers
        </ProductNavItem>
        <ProductNavItem search="jacket" count={itemsCount.jacket}>
          Jacket
        </ProductNavItem>
        <ProductNavItem search="tshirt" count={itemsCount.tshirt}>
          T-Shirt
        </ProductNavItem>
        <ProductNavItem search="bag" count={itemsCount.bag}>
          Bag
        </ProductNavItem>
      </div>
    </>
  );
}
