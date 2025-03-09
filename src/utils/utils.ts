import { Product } from "@uth/types/product.type"

interface Props {
  productData?: Product
  selectedOptions: Record<string,string>
}

export const getVariantId = ({productData, selectedOptions}: Props) => {
  if(!productData) return
  // console.log(productData.options?.length)
  if(!productData.options?.length) return null
  else if(productData.options.length === 1) {
    return productData.variants_mapping[selectedOptions[productData?.options?.[0]?.name!]]
  } else if (productData.options.length === 2) {
    const firstElement = selectedOptions[productData?.options?.[0]?.name as string] as string
    const secondElement = selectedOptions[productData?.options?.[1]?.name as string] as string
    if (firstElement && secondElement) {
      if((productData.variants_mapping as any)[firstElement]) return ((productData.variants_mapping as any)[firstElement][secondElement] as number)
      return (productData.variants_mapping as any)[secondElement][firstElement]
    }
    return null
  }
}

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string | number }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
} 

export const getIdFromNameId = (nameId: string) => {
  if(!nameId) return
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}