
import Bottombar from "@/components/Bottombar";
import Footer from "@/components/Footer";
import Products from "@/components/Products";
import './globals.css'

const index = () => {
  return (
    <>

      <div className="bg-gray-100">
        <main className="max-w-7xl mx-auto p-5">
          <Products />
          <Footer />
        </main>
        <Bottombar />
      </div>
    </>
  );
};

export default index;
