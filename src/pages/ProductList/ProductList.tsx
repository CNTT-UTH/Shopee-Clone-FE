import Product from "@uth/components/Product";
import Filter from "./components/Filter";
import SortProductList from "./components/SortProductList";
import useQueryParams from "@uth/hooks/useQueryParams";
import { useProductAll } from "@uth/queries/useProduct";
import { useEffect, useState } from "react";
import { Product as ProductType } from "@uth/types/product.type";

export default function ProductList() {
  const [sortPrice, setSortPrice] = useState<string>("")
  const queryParam: any = useQueryParams()
  const {data} = useProductAll(queryParam)
  const [sortedProducts, setSortedProducts] = useState<ProductType[] | undefined>(data?.result.data)  

  useEffect(() => {
    if (data?.result?.data && sortPrice) { 
      const newSortedProducts = [...data.result.data];  

      // console.log('run', sortPrice)
      if (sortPrice === "price:asc") {
        newSortedProducts?.sort((a, b) => (a.product_price?.price || 0) - (b.product_price?.price || 0)) 
        setSortedProducts(newSortedProducts);
      } else if (sortPrice === "price:des") {
        newSortedProducts?.sort((a, b) => (b.product_price?.price || 0) - (a.product_price?.price || 0))
        setSortedProducts(newSortedProducts);
      }

    }
  }, [sortPrice, data]);

  return <div className="bg-gray-200 py-6">
    <div className="container">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Filter />
        </div>
         <div className="col-span-9">
           <SortProductList setSortPrice={setSortPrice} />
           <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {(sortedProducts || data?.result.data)?.map((product) => (
              <div className="col-span-1" key={product.product_id}>
                <Product product={product} />
              </div>
            ))}
           </div>
         </div>
      </div>
    </div>
  </div>
}
