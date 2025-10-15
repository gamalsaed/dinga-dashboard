export default function Badge({ children, className, ...props }) {
  const availableStyle = "bg-[#B2FFB4] text-[#04910C]";
  const outStyle = "bg-[#FFDCDC] text-[#FF0000]";
  const paied = "bg-[#E6FF96] text-[#00B809]";
  const unpaied = "bg-[#FFF5C5] text-[#E27D00]";
  const shipping = "bg-[#DCD2FF] text-[#7F27FF]";
  const cancelled = "bg-[#FEC6AA] text-[#EB2B0B]";
  let style;
  switch (children) {
    case "paied":
      style = paied;
      break;

    case "unpaied":
      style = unpaied;
      break;

    case "Shipping":
      style = shipping;
      break;

    case "Cancelled":
      style = cancelled;
      break;
    case "Cancel":
      style = cancelled;
      break;

    case "available":
      style = availableStyle;
      break;

    case "out of stock":
      style = outStyle;
      break;
    case "Delivered":
      style = paied;
      break;

    default:
      style = "";
  }
  return (
    <button
      className={`px-3 py-1 rounded-xl text-sm w-[97.5px] capitalize ${style} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
