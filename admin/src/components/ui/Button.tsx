// src/components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const baseClasses = "inline-flex items-center justify-center border font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const variantClasses = {
    primary: "border-transparent shadow-sm text-white bg-[#317db4] hover:bg-[#3163b4] focus:ring-indigo-500",
    secondary: "border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500",
    danger: "border-transparent shadow-sm text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
  };

  const sizeClasses = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;