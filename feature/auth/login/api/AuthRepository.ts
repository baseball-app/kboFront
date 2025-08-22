import * as schemas from '../types'
import ApiClient from '@/api'

interface IAuthRepository {
  login: (req: schemas.LoginRequest) => Promise<schemas.LoginServerResponse>
  checkIsMember: () => Promise<boolean>
}

class AuthRepository implements IAuthRepository {
  constructor(private readonly apiClient: typeof ApiClient) {}

  login = async ({channel, code, id_token, native}: schemas.LoginRequest) => {
    try {
      const response = await this.apiClient.post<schemas.LoginServerResponse>(`/auths/${channel}/`, {
        code,
        state: 'string',
        // id_token은 애플 로그인에만 씀
        id_token: id_token || '',
        // 애플 로그인 여부로 사용 중임(의도는 네이티브 로그인 여부인듯)
        native,
      })

      return response
    } catch (error) {
      console.error('로그인 에러 :: ', error)
      throw error
    }
  }

  checkIsMember = async (): Promise<boolean> => {
    const profile = await this.apiClient.get<{my_team: {id: number}}>('/users/me/')
    const myTeamId = profile?.my_team?.id

    return Boolean(myTeamId)
  }
}

export {AuthRepository, type IAuthRepository}
