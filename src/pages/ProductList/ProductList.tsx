import Product from "@uth/components/Product";
import Filter from "./components/Filter";
import SortProductList from "./components/SortProductList";
import useQueryParams from "@uth/hooks/useQueryParams";
import { useProductAll } from "@uth/queries/useProduct";
import { useEffect, useState } from "react";
import { ProductParams, Product as ProductType } from "@uth/types/product.type";
import Pagination from "@uth/components/PaginationCustom";
import { useCategories } from "@uth/queries/useCategories" 

export type QueryConfig = {
  [key in keyof ProductParams]: string
}

export default function ProductList() {
  const [sortPrice, setSortPrice] = useState<string>("")
  const queryParam = useQueryParams() as QueryConfig
  const queryConfig: QueryConfig = {
    page: queryParam.page || '1',
    limit: queryParam.limit || '24',
    category: queryParam.category
  }
  const {data} = useProductAll(queryConfig)
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

  const {data: cateData} = useCategories()

  return <div className="bg-gray-200 py-6">
    <div className="container">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Filter categories={cateData?.result || []} queryConfig={queryConfig} />
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
           <Pagination queryConfig={queryConfig} pageSize={data?.result.pagination.total_page} />
         </div>
      </div>
    </div>
  </div>
}
