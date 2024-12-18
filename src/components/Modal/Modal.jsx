function Modal({ open, onClose, children }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex justify-center items-center transition-colors  ${
        open ? "visible bg-zinc-800/50 " : "invisible"
      }`}
    >
       <div
    onClick={(e) => e.stopPropagation()}
    className={`rounded-xl shadow w-[95%] sm:w-[500px] border border-brown-100 bg-food-300 overflow-y-auto transition-all relative ${
      open ? "opacity-100" : "opacity-0"
    } max-h-screen`}
  >
    {children}
  </div>
    </div>
  );
}

export default Modal;
