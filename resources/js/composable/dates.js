import dayjs from 'dayjs';

export function useDate(dateStr) {
    const date = dayjs(dateStr);
    return date.format('D MMMM, YY H:m');
}
