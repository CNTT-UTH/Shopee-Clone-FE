import Product from "@uth/components/Product";
import Filter from "./components/Filter";
import SortProductList from "./components/SortProductList";
import useQueryParams from "@uth/hooks/useQueryParams";
import { useProductAll } from "@uth/queries/useProduct";
import { useState } from "react";

export default function ProductList() {
  const [sortPrice, setSortPrice] = useState<string>("")
  const queryParam: any = useQueryParams()
  const {data} = useProductAll(queryParam)
  
  const sortedProductsAscending = data?.result.data.sort((a, b) => {
    return (a.product_price?.price || 0) - (b.product_price?.price || 0);
  }); 

  return <div className="bg-gray-200 py-6">
    <div className="container">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Filter />
        </div>
         <div className="col-span-9">
           <SortProductList setSortPrice={setSortPrice} />
           <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {data?.result.data.map((product) => (
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
