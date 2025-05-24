"use client"
import MainCategoryList from "@/components/mainCategoryList";
import ProductsPage from "./products/page";

export default function Home() {
  return (
    <main>
      <MainCategoryList category='top'/>
      <MainCategoryList category='bottom'/>
      <ProductsPage/>
    </main>
    
  )
}
