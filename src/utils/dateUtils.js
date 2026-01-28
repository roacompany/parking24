import { format, differenceInCalendarDays, parse } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDate = (date) => {
  return format(date, 'yyyy-MM-dd');
};

export const formatDateKorean = (date) => {
  return format(date, 'MM월 dd일 (eee)', { locale: ko });
};

export const formatTime = (date) => {
  return format(date, 'HH:mm');
};

// 일 단위 계산 (시작일과 종료일 모두 포함)
// 예: 10월 1일 ~ 10월 3일 = 3일
export const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // 시간을 무시하고 날짜만 비교
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  
  // +1을 해서 시작일과 종료일 모두 포함
  return differenceInCalendarDays(end, start) + 1;
};

export const parseDate = (dateString) => {
  return parse(dateString, 'yyyy-MM-dd', new Date());
};

export const generateReservationNumber = () => {
  const now = new Date();
  return `P24${format(now, 'yyyyMMddHHmmss')}`;
};