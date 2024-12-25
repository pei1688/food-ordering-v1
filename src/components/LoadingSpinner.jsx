import { Spinner } from "@nextui-org/spinner";
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-[500px] ">
      <Spinner color="warning" label="載入中..." labelColor="warning" />
    </div>
  );
}

export default LoadingSpinner;
