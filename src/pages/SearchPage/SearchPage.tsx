import useQueryParams from '@uth/hooks/useQueryParams'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { QueryConfig } from '../ProductList/ProductList'
import useSearch from '@uth/queries/useSearch'
import Loading from '@uth/components/Loading'
import Product from '@uth/components/Product'
import Pagination from '@uth/components/PaginationCustom'

export default function SearchPage() {
  const queryParam = useQueryParams() as QueryConfig
  const queryConfig: QueryConfig = {
      page: queryParam.page || '1',
      limit: queryParam.limit || '24',
      keyword: queryParam.keyword || 'Quần'
  }

  const {data, isLoading} = useSearch(queryConfig)

  

  return <div className="bg-gray-200">
          {isLoading ? <Loading />
        : <div className="container">
            <div className="grid grid-cols-12 gap-6 pb-8 my-4">
              {/* <div className="col-span-3">
                <Filter categories={cateData?.result || []} queryConfig={queryConfig} />
              </div> */}
              <div className="col-span-12">
                {/* <SortProductList setSortPrice={setSortPrice} /> */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {(data?.result.data)?.map((product) => (
                    <div className="col-span-1" key={product.product_id}>
                      <Product product={product} />
                    </div>
                  ))}
                </div>
                <Pagination queryConfig={queryConfig} pageSize={data?.result.pagination.total_page} />
              </div>
            </div>
          </div>  
         }
        </div>
}
