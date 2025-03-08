import useQueryParams from '@uth/hooks/useQueryParams'
import { motion } from "framer-motion"; 
import { QueryConfig } from '../ProductList/ProductList'
import useSearch from '@uth/queries/useSearch'
import Loading from '@uth/components/Loading'
import Product from '@uth/components/Product'
import Pagination from '@uth/components/PaginationCustom'
import Filter from '../ProductList/components/Filter'
import { useCategories } from '@uth/queries/useCategories'

export default function SearchPage() {
  const queryParam = useQueryParams() as QueryConfig
  const queryConfig: QueryConfig = {
      page: queryParam.page || '1',
      limit: queryParam.limit || '24',
      keyword: queryParam.keyword || 'Quần'
  }

  const {data, isLoading} = useSearch(queryConfig)
  const {data: cateData} = useCategories() 

  return <div className="bg-gray-200">
          {isLoading ? <Loading />
        : data?.result.data.length
            ? <div className="container">
              <div className="grid grid-cols-12 gap-6 pb-8 py-8">
                <div className="col-span-3">
                  <Filter categories={cateData?.result || []} queryConfig={queryConfig} />
                </div>
                <div className="col-span-9">
                  <p className='text-lg ml-1 text-gray-600'>Kết quả tìm kiếm cho từ khoá '{queryConfig.keyword}'</p>
                  {/* <SortProductList setSortPrice={setSortPrice} /> */}
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {(data?.result.data)?.map((product) => (
                      <div className="col-span-1" key={product.product_id}>
                        <Product product={product} />
                      </div>
                    ))}
                  </div>
                  <Pagination search={true} queryConfig={queryConfig} pageSize={data?.result?.pagination?.total_page as number} />
                </div>
              </div>
            </div> 
            : <div className="flex flex-col items-center justify-center h-[80vh] bg-gray-100 text-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1 }}
                className="w-24 h-24 flex items-center justify-center bg-red-500 text-white text-5xl font-bold rounded-full"
              >
                !
              </motion.div>
              <h1 className="text-4xl font-bold text-red-500 mt-4">Product Not Found</h1>
              <p className="text-lg text-gray-700 mt-2">Sorry, the product you are looking for does not exist.</p>
              <motion.a
                href="/"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
              >
                Go Back to Home
              </motion.a>
            </motion.div>
          </div>
         }
        </div>
}
