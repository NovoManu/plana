export interface ICountry {
  name: string
  code: string
  icon: string
}

export interface IChartConfiguration {
  [key: string]: string | null
  product: string | null
  begin: string | null
  end: string | null
  country: string
}
