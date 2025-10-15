export default function Wrapper({ children, className }) {
  return (
    <div
      className={`p-5 border-[#E7E7E7] dark:border-[#3D3D3D] mt-5 my-5 bg-white dark:bg-[#1A1A1B]  dark:text-white rounded-2xl ${className}`}
    >
      {children}
    </div>
  );
}
