import Loader from "./Loader";

const variants = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-secondary text-white hover:bg-secondary/90",
  ghost: "border border-white/20 bg-transparent text-white hover:bg-white/10",
};

function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  fullWidth = false,
  className = "",
  ...props
}) {
  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70";
  const widthClass = fullWidth ? "w-full" : "";
  const variantClass = variants[variant] ?? variants.primary;

  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${widthClass} ${className}`.trim()}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader size="sm" text="" />}
      <span>{children}</span>
    </button>
  );
}

export default Button;
