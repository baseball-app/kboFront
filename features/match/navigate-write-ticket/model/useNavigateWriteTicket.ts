import {useCheckValidateTicket, useMonthlyTicket} from '@/entities/ticket'
import {ROUTES, useAppRouter} from '@/shared'
import useProfile from '@/hooks/my/useProfile'
import {usePopup} from '@/slice/commonSlice'
import dayjs from 'dayjs'

const useNavigateWriteTicket = () => {
  const router = useAppRouter()
  const {profile} = useProfile()
  const {getCachedTicketsByDate} = useMonthlyTicket({targetId: Number(profile?.id)})
  const {isCanNotWriteTicket} = useCheckValidateTicket()
  const {openCommonPopup} = usePopup()

  const moveToWriteTicket = async (params: {date: string; step: number; matchId?: number}, onSuccess?: () => void) => {
    const yearMonth = dayjs(params.date).format('YYYY-MM')
    const tickets = await getCachedTicketsByDate(yearMonth)
    if (isCanNotWriteTicket(tickets || [], params.date)) {
      openCommonPopup('오늘의 야구 티켓은 최대 2번까지만\n작성하실 수 있어요!')
    } else {
      onSuccess?.()
      router.push(ROUTES.WRITE, params)
    }
  }

  /**
   * 더블헤더 작성하기 버튼을 클릭하여 티켓을 작성하러 갈 때
   * @param date
   */
  const moveToDoubleHeaderWriteTicket = async (date: string) => {
    moveToWriteTicket({date, step: 2})
  }

  /**
   * 경기를 클릭하여 티켓을 작성하러 갈 때
   * @param date
   */
  const moveToMatchWriteTicket = async (date: string, matchId: number) => {
    moveToWriteTicket({date, step: 2, matchId})
  }

  return {
    moveToDoubleHeaderWriteTicket,
    moveToMatchWriteTicket,
    moveToWriteTicket,
  }
}

export {useNavigateWriteTicket}
