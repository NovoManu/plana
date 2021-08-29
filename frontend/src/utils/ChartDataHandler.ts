import { IProductAverage } from '@/modules/dashboard/services/types'
import { ChartDataset } from 'chart.js'

export interface IChartDataHandler {
  getLabels(): string[]
  getBarChartDatasets(): ChartDataset[]
}

export class ChartDataHandler implements IChartDataHandler {
  private rawData
  private color = '76,119,191'

  constructor(rawData: IProductAverage[]) {
    this.rawData = rawData
  }

  getLabels(): string[] {
    return this.rawData.map((item: IProductAverage) => new Date(item.start).toLocaleDateString('de-DE'))
  }

  getBarChartDatasets(): ChartDataset[] {
    return [
      {
        label: 'Average',
        data: this.rawData.map((item: IProductAverage) => item.average),
        backgroundColor: Array(this.rawData.length).fill(`rgba(${this.color},0.7)`),
        borderColor: Array(this.rawData.length).fill(`rgba(${this.color},1)`),
        fill: false,
        showLine: true,
        spanGaps: true,
      },
    ]
  }
}
