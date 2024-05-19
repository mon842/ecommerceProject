import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import Layout from "@/components/Layout";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <Layout>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </Layout>
  )
}

export async function getServerSideProps() {
  const featuredProductId = '64edf5d6b3a283d10b04a90d';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 6 });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts))

    },
  };
}