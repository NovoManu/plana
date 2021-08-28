export interface IProductBE {
  name: string
  product_variable: string
}

export interface IProductFE {
  name: string
  productVariable: string
}

export interface IProductAverage {
  average: number
  start: string
  end: string
}

export interface IProductDataRange {
  first: string
  last: string
}

export interface IProductQuery {
  geoframe?: number[]
  country?: string
  polygon?: number[]
  point?: number[]
  begin?: string
  end?: string
  limit?: number
  offset?: number
}
