import { Flower } from "lucide-react";

function SectionHeader({ subHeader }) {
  return (
    <div className="text-center my-4">
      <h3 className="text-2xl  text-brown-150 flex items-center w-full justify-center gap-4">
        <Flower size={20} />
        {subHeader}
        <Flower size={20} />
      </h3>
    </div>
  );
}

export default SectionHeader;
