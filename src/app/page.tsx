import FeaturedProducts from "@/components/FeaturedProduct";
import Hero from "@/components/Hero";
import ShopCategories from "@/components/ShopCategories";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <ShopCategories />
    </main>
  );
}
