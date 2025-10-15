export default function TableItem({ children, className, ...props }) {
  return (
    <li {...props} className={className}>
      {children}
    </li>
  );
}
