import {eachDayOfInterval, format} from 'date-fns'
import {getPlatformDate} from '../../utils/getPlatformDate'
import theme from '../../styles/theme'

import {MarkedDateProps, DayProps} from './'

export function generateInterval({
  start,
  end,
}: {
  start: DayProps
  end: DayProps
}) {
  let interval: MarkedDateProps = {}

  eachDayOfInterval({
    start: getPlatformDate(new Date(start.timestamp)),
    end: getPlatformDate(new Date(end.timestamp)),
  }).forEach((currentDate) => {
    const date = format(currentDate, 'yyyy-MM-dd')

    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.main
            : theme.colors.main_light,

        textColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.main_light
            : theme.colors.main,
      },
    }
  })

  return interval
}
