import axios, { AxiosInstance, AxiosError } from 'axios'
import { EMISSIONS_URL } from '@/services/config'

type ErrorFunction = (error: any) => any

export const errorHandler = (): ErrorFunction => {
  return (error: AxiosError): void => {
    if (error.request) {
      // The request was made but no response was received
      console.log('Uncertain error due to no response received', error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Unknown Error', error.message)
    }
    throw error
  }
}

const emissionsAxiosInstance: AxiosInstance = axios.create({
  baseURL: EMISSIONS_URL,
})

emissionsAxiosInstance.interceptors.request.use(config => {
  config.headers = {
    accept: 'application/json',
  }
  return config
})

emissionsAxiosInstance.interceptors.response.use(config => {
  // Add response interceptors here
  return config
}, errorHandler)

export default emissionsAxiosInstance
