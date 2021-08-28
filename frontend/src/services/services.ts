import { AxiosInstance } from 'axios'

interface IBaseApiService {
  axios: AxiosInstance
  resource: string
}

export interface IReadOnlyApiService {
  list(params?: { [key: string]: any }): Promise<unknown>
  get(id: string, params?: { [key: string]: any }): Promise<unknown>
}

export interface ICrudApiService extends IReadOnlyApiService {
  post(data: unknown, params?: { [key: string]: any }): Promise<unknown>
  put(id: string, data: unknown, params?: { [key: string]: any }): Promise<unknown>
  delete(id: string): Promise<void>
}

export class BaseApiService implements IBaseApiService {
  axios: AxiosInstance
  resource: string

  constructor(axiosInstance: AxiosInstance, resource: string) {
    if (!axiosInstance) {
      throw Error('Axios instance not found')
    }
    this.axios = axiosInstance
    this.resource = resource
  }
}

export class ReadOnlyApiService<Model> extends BaseApiService implements IReadOnlyApiService {
  async list(params = {}): Promise<Model[]> {
    const response = await this.axios.get(this.resource, params)
    return response.data
  }
  async get(id: string, params = {}): Promise<Model> {
    const response = await this.axios.get(`${this.resource}/${id}`, params)
    return response.data
  }
}

export class CrudApiService<Model> extends ReadOnlyApiService<Model> implements ICrudApiService {
  async post(data: unknown, params = {}): Promise<Model> {
    const response = await this.axios.post(this.resource, data, params)
    return response.data
  }
  async put(id: string, data: unknown, params = {}): Promise<Model> {
    const response = await this.axios.put(`${this.resource}/${id}`, data, params)
    return response.data
  }
  async delete(id: string): Promise<void> {
    const response = await this.axios.delete(`${this.resource}/${id}`)
    return response.data
  }
}
