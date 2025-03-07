import { Product } from "@uth/types/product.type"

interface Props {
  productData: Product
  selectedOptions: Record<string,string>
}

export const getVariantId = ({productData, selectedOptions}: Props) => {
  if(!productData.options?.length) return null
  else if(productData.options.length === 1) {
    return productData.variants_mapping[selectedOptions[productData?.options?.[0]?.name!]]
  } else if (productData.options.length === 2) {
    const firstElement = selectedOptions[productData?.options?.[0]?.name as string] as string
    const secondElement = selectedOptions[productData?.options?.[1]?.name as string] as string
    if (firstElement && secondElement) {
      return ((productData.variants_mapping as any)[firstElement][secondElement] as number) || (productData.variants_mapping as any)[secondElement][firstElement]
    }
    return null
  }
}