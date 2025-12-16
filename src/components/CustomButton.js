const variantStyles = {
  primary: `
    bg-cyan-md
    text-white 
    border-cyan
    hover:bg-cyan 
    hover:border-cyan
  `,

  secondary: `
    bg-gray-100 
    text-gray-700 
    border-gray-300 
    hover:bg-gray-200 
    hover:border-gray-400
  `,

  danger: `
    bg-red-500 
    text-white 
    border-red-500 
    hover:bg-red-600 
    hover:border-red-600
  `,

  outline: `
    bg-white
    text-gray-700
    border-gray-500
    hover:bg-gray-100
    hover:border-gray-600
  `,

  ghost: `
    bg-transparent 
    text-gray-700 
    border-transparent 
    hover:bg-gray-100 
    hover:border-gray-200
  `,
};

const CustomButton = ({
  type = "button",
  variant = "secondary",
  className = "",
  children,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-2.5 py-1.5 text-sm font-medium rounded-md tracking-wide capitalize
        border cursor-pointer transition-all duration-150
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default CustomButton;
