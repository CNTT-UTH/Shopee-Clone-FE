import Product from "@uth/components/Product";
import Filter from "./components/Filter";
import SortProductList from "./components/SortProductList";
import { useQueries } from "@tanstack/react-query";
import useQueryParams from "@uth/hooks/useQueryParams";
import { useProductAll } from "@uth/queries/useProduct";
import { ProductParams } from "@uth/types/product.type";

export default function ProductList() {
  const queryParam: any = useQueryParams()
  const {data} = useProductAll(queryParam)
  console.log(data)
  return <div className="bg-gray-200 py-6">
    <div className="container">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Filter />
        </div>
         <div className="col-span-9">
           <SortProductList />
           <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {Array(30).fill(0).map((_, index) => (
              <div className="col-span-1" key={index}>
                <Product />
              </div>
            ))}
           </div>
         </div>
      </div>
    </div>
  </div>
}
