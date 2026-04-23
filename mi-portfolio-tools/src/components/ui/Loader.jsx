function Loader({ text = "Generando tu imagen...", size = "md" }) {
  const sizeClass = size === "sm" ? "h-4 w-4 border-2" : "h-10 w-10 border-4";

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClass} animate-spin rounded-full border-primary border-t-transparent`}
        role="status"
        aria-label="Cargando"
      />
      {text ? <p className="text-sm text-gray-300">{text}</p> : null}
    </div>
  );
}

export default Loader;
