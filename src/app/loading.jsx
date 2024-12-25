import { Spinner } from "@nextui-org/spinner";

function loading() {
  return (
    <div className="flex justify-center items-center h-screen">
    <Spinner color="warning" label="載入中..." labelColor="warning"/>
  </div>
  );
}

export default loading;
