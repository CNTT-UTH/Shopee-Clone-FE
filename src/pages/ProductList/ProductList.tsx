import Product from "@uth/components/Product";
import Filter from "./components/Filter";
import SortProductList from "./components/SortProductList";
import useQueryParams from "@uth/hooks/useQueryParams";
import { useCateById, useProductAll } from "@uth/queries/useProduct";
import { useEffect, useState } from "react";
import { ProductParams, Product as ProductType } from "@uth/types/product.type";
import Pagination from "@uth/components/PaginationCustom";
import { useCategories } from "@uth/queries/useCategories" 
import Slider from "@uth/components/Slider";
import CategoryGrid from "@uth/components/CategoryGrid";
import { Category } from "@uth/types/category.type";
import Loading from "@uth/components/Loading";

export type QueryConfig = {
  [key in keyof ProductParams]: string
}

export default function ProductList() {
  const queryParam = useQueryParams() as QueryConfig
  const queryConfig: QueryConfig = {
    page: queryParam.page || '1',
    limit: queryParam.limit || '24',
    category: queryParam.category
  }
  const {data, isLoading} = useProductAll(queryConfig) 

  const {data: cateData} = useCategories()

  return <div className="bg-gray-200 relative">
        {isLoading ? <Loading />
        : <>
        <Slider />
        <div className="container">
          <CategoryGrid Categories={cateData?.result as Category[]}/>
          <div className="grid grid-cols-12 gap-6 pb-8 my-4">
            {/* <div className="col-span-3">
              <Filter categories={cateData?.result || []} queryConfig={queryConfig} />
            </div> */}
            <div className="col-span-12">
              {/* <SortProductList setSortPrice={setSortPrice} /> */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {(data?.result?.data)?.map((product) => (
                  <div className="col-span-1" key={product?.product_id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={data?.result?.pagination?.total_page as number} />
            </div>
          </div>
        </div>  
      </>}
      </div>
}
