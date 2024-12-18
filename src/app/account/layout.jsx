import SideNavbar from "@/components/layout/SideNavbar";

export const metadata = {
  title: {
    default: "個人檔案",
    //%s切換網頁時會替換掉
    template: "%s - 個人檔案",
  },
};


function layout({ children }) {
  return (
    <div className="flex max-w-7xl mx-auto py-4  mt-16  mb-8">
      <SideNavbar />
      <div className="max-w-5xl w-full min-h-[800px]">{children}</div>
    </div>
  );
}

export default layout;
