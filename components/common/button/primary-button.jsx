export default function Button({ children, className, ...props }) {
  return (
    <button
      className={`py-2.5 px-5 text-sm font-medium text-white bg-primary rounded-lg transition-colors duration-100 cursor-pointer border-gray-200 hover:bg-[#b42a6f] focus:z-10 focus:ring-2    inline-flex items-center  ${
        className ?? ""
      } `}
      {...props}
    >
      {children}
    </button>
  );
}
