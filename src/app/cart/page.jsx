import SectionHeader from "@/components/layout/SectionHeader";
import { getUserByEmail } from "@/action/user";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import getSession from "@/lib/getSession";

export const metadata = {
  title:"購物車"
}

async function page() {
  const session = await getSession()
  const user = await getUserByEmail(session?.user?.email);

  const initialAddressInfo = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    postalCode: user?.postalCode || "",
    city: user?.city || "",
    streetAddress: user?.streetAddress || "",
  };

  return (
    <section className="mt-16 text-zinc-100 min-h-screen sm:min-h-[920px]">
      <div>
        <SectionHeader subHeader="購物車" />
      </div>
      <CheckoutForm initialAddressInfo={initialAddressInfo} user={user} />
    </section>
  );
}

export default page;
