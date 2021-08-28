import { IProductBE, IProductFE } from '@/modules/dashboard/services/types'

export const mapProductToFE = (products: IProductBE[]): IProductFE[] => {
  if (!products) return []
  return products.map(product => ({
    name: product.name,
    productVariable: product.product_variable,
  }))
}
