import {
  Calendar as CustomCalendar,
  LocaleConfig,
  CalendarProps,
} from 'react-native-calendars'
import {MarkingProps} from 'react-native-calendars/src/calendar/day/marking'
import {useTheme} from 'styled-components'
import {Feather} from '@expo/vector-icons'

import {ptBR} from './localeConfig'
import {generateInterval} from './generateInterval'

LocaleConfig.locales['pt-br'] = ptBR
LocaleConfig.defaultLocale = 'pt-br'

type MarkingDateProps = Pick<
  MarkingProps,
  'color' | 'textColor' | 'disabled' | 'disableTouchEvent'
>

interface MarkedDateProps {
  [date: string]: MarkingDateProps
  //versão professor
  // [date: string]: {
  //   color: string
  //   textColor: string
  //   disabled?: boolean
  //   disableTouchEvent?: boolean
  // }
}

interface DayProps {
  dateString: string
  day: Number
  month: number
  year: number
  timestamp: number
}

type CustomCalendarProps = Pick<CalendarProps, 'onDayPress'> & {
  markedDates: MarkedDateProps
}

function Calendar({markedDates, onDayPress}: CustomCalendarProps) {
  const theme = useTheme()

  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
          size={24}
          color={theme.colors.shape}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.secondary_500,
        textDayHeaderFontSize: 14,
        textDayFontSize: 15,
        textMonthFontFamily: theme.fonts.secondary_600,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={String(new Date())}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  )
}

export {Calendar, DayProps, MarkedDateProps, generateInterval}
