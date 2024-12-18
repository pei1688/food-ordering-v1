import { EggFried } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-brown-50 bg-brown-900">
    <div className="bg-brown-100 w-full h-[1px] bg-opacity-30"></div>
    <div className="container mx-auto px-6 py-10">
      {/* 上方內容區域 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 第一部分：品牌資訊 */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-brown-150">
            <EggFried size={24} />
            DineEasy
          </h3>
          <p className="text-sm text-center md:text-left">
            提供最佳美食訂購體驗，滿足您的用餐需求。
          </p>
        </div>
  
        {/* 第二部分：快速連結 */}
        <div className="flex justify-center">
          <ul className="text-lg flex flex-col sm:flex-row sm:gap-8 gap-4">
            <li>
              <Link href="/menu" className="hover:text-brown-100 transition text-brown-150">
                商品一覽
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-brown-100 transition text-brown-150">
                關於我們
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brown-100 transition text-brown-150">
                聯絡我們
              </Link>
            </li>
          </ul>
        </div>
  
        {/* 第三部分：聯絡資訊 */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-lg font-semibold mb-4 text-brown-150">
            聯絡資訊
          </h3>
          <ul className="space-y-2 text-sm text-center md:text-right">
            <li>電話：+886-123-456-789</li>
            <li>電子郵件：support@foodordering.com</li>
            <li>地址：台北市中山區某某路 123 號</li>
          </ul>
        </div>
      </div>
  
      {/* 底部版權宣告 */}
      <div className="text-center mt-10">
        <p className="text-xs md:text-sm">
          © {new Date().getFullYear()} Food Ordering, All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
  
  );
};

export default Footer;
