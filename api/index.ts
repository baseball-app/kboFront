import {Config} from '@/config/Config'
import {TUser} from '@/hooks/auth/useLogin'
import {MmkvStoreKeys} from '@/store/mmkv-store/constants'
import {getItem} from '@/store/mmkv-store/mmkvStore'
import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  /** Api Server url 적용  */
  baseURL: Config.API_URL,
})

/** 모든 Api 요청에 자동으로 헤더에 토큰을 추가하는 요청 인터셉터 */
axiosInstance.interceptors.request.use(
  async (req: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    try {
      /** 토큰 처리 로직 */
      const token = getItem<TUser>(MmkvStoreKeys.USER_LOGIN)
      if (token?.accessToken) req.headers['X-KBOAPP-TOKEN'] = `${token.accessToken}`
      // console.log(req.url, token?.accessToken)
      return req
    } catch (error) {
      return Promise.reject(error)
    }
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  },
)

let lock = false

/** Api 요청 결과값에 대한 응답 인터셉터 */
axiosInstance.interceptors.response.use(
  async (res: AxiosResponse): Promise<AxiosResponse> => {
    /** 토큰 처리 로직 */
    return res
  },
  async (err: AxiosError) => {
    console.error(
      'err',
      `
      URL :: ${err.request.responseURL}
      ERROR :: ${JSON.stringify(err.response?.data)}
      `,
    )

    return Promise.reject(err)
  },
)

/** Api 통신 객체 */
const ApiClient = {
  /**
   * @function get http GET 통신
   * @description 지정된 URL로 GET 요청을 보내고, 결과 데이터를 반환합니다.
   * @template T - 응답 데이터의 타입입니다.
   * @param {string} url - 요청을 보낼 엔드포인트 URL입니다.
   * @param {Object} [params={}] - 요청에 포함할 쿼리 파라미터 객체입니다. 기본값은 빈 객체입니다.
   * @returns {Promise<T>} - 응답 데이터의 Promise 객체로, 타입 T를 반환합니다.
   */
  get: async <T>(url: string, params?: any): Promise<T> => {
    try {
      const response = await axiosInstance.get<T>(url, {params})
      return response.data
    } catch (error) {
      console.error('Error occurred during GET request:', error, '\n URL :: ', url)
      return Promise.reject(error)
    }
  },

  /**
   * @function post - HTTP POST 통신
   * @description 지정된 URL로 POST 요청을 보내고, 결과 데이터를 반환합니다.
   * @template T - 응답 데이터의 타입입니다.
   * @param {string} url - 요청을 보낼 엔드포인트 URL입니다.
   * @param {any} data - 요청에 포함할 데이터입니다.
   * @returns {Promise<T>} - 응답 데이터의 Promise 객체로, 타입 T를 반환합니다.
   */
  post: async <T>(url: string, data: any): Promise<T> => {
    try {
      const response = await axiosInstance.post<T>(url, data)
      return response.data
    } catch (error) {
      console.error('Error occurred during POST request:', error)
      return Promise.reject(error)
    }
  },

  /**
   * @function put - HTTP PUT 통신
   * @description 지정된 URL로 PUT 요청을 보내고, 결과 데이터를 반환합니다.
   * @template T - 응답 데이터의 타입입니다.
   * @param {string} url - 요청을 보낼 엔드포인트 URL입니다.
   * @param {any} data - 요청에 포함할 데이터입니다.
   * @returns {Promise<T>} - 응답 데이터의 Promise 객체로, 타입 T를 반환합니다.
   */
  put: async <T>(url: string, data: any): Promise<T> => {
    try {
      const response = await axiosInstance.put<T>(url, data)
      return response.data
    } catch (error) {
      console.error('Error occurred during PUT request:', error)
      return Promise.reject(error)
    }
  },

  /**
   * @function patch - HTTP PATCH 통신
   * @description 지정된 URL로 PATCH 요청을 보내고, 결과 데이터를 반환합니다.
   * @template T - 응답 데이터의 타입입니다.
   * @param {string} url - 요청을 보낼 엔드포인트 URL입니다.
   * @param {any} data - 요청에 포함할 데이터입니다.
   * @returns {Promise<T>} - 응답 데이터의 Promise 객체로, 타입 T를 반환합니다.
   */
  patch: async <T>(url: string, data: any): Promise<T> => {
    try {
      const response = await axiosInstance.patch<T>(url, data)
      return response.data
    } catch (error) {
      console.error('Error occurred during PATCH request:', error)
      return Promise.reject(error)
    }
  },

  /**
   * @function delete - HTTP DELETE 통신
   * @description 지정된 URL로 DELETE 요청을 보내고, 결과 데이터를 반환합니다.
   * @template T - 응답 데이터의 타입입니다.
   * @param {string} url - 요청을 보낼 엔드포인트 URL입니다.
   * @returns {Promise<T>} - 응답 데이터의 Promise 객체로, 타입 T를 반환합니다.
   */
  delete: async <T>(url: string): Promise<T> => {
    try {
      const response = await axiosInstance.delete<T>(url)
      return response.data
    } catch (error) {
      console.error('Error occurred during DELETE request:', error)
      return Promise.reject(error)
    }
  },
}

export const uploadFile = async <T>(url: string, data: FormData): Promise<T> => {
  try {
    // const token = getItem<TUser>(MmkvStoreKeys.USER_LOGIN)
    // console.log(token)
    // const response = await fetch(url, {
    //   method: 'POST',
    //   body: data,
    //   headers: {
    //     'Content-Type': 'multipart/form-data;boundary="boundary"',
    //     'X-KBOAPP-TOKEN': token?.accessToken || '',
    //   },
    // })

    // const result = await response.json()

    // console.log('here', result, response)

    // return result.data
    const response = await axiosInstance.post<T>(url, data, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data;',
      },
      maxBodyLength: Infinity, // ✅ 큰 파일 허용
    })

    return response.data
  } catch (error) {
    console.log(JSON.stringify(error))
    console.error('Error occurred during upload file:', error)
    console.log((error as any)?.message)
    return Promise.reject(error)
  }
}

export default ApiClient
