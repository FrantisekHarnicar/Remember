import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { useTranslation } from 'react-i18next';

export default function DetailsScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  LocaleConfig.locales['sk'] = {
        monthNames: [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Août',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre'
          ],
        monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
        dayNames: [t("Sunday"), 'Pondelok', 'Utorok', 'Streda', 'Stvrok', 'Piatok', 'Sobota'],
        dayNamesShort: [t("Sun."), t("Mon."), t("Tue."), t("Wed."), t("Thu."), t("Fri."), t("Sat.")],
        today: "Aujourd'hui"
      };
      LocaleConfig.defaultLocale = 'sk';
      let name;
      async function getName(day) {
        try {
            const data = {
                "country": "sk",
                "day": day.day,
                "month": day.month
              };
              
            let headers = {
                "Content-Type": "application/json",
            }
              
              const byDate = await fetch("https://nameday.abalin.net/namedays", {
                headers,
                method: "POST",
                body: JSON.stringify(data),
              });


              const jsonByDate = await byDate.json();
              name = jsonByDate.data.namedays.sk;
              createAlert(day);
              

        } catch (error) {
        console.error(error);
        }
    }


      function createAlert(day) {


        Alert.alert(
          day.dateString,
          t("On this day celebrate ")+ name,
          [
            
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          {
            cancelable: true
          }
        );
      }


    return (
        <View >
            <CalendarList
            // Callback which gets executed when visible months change in scroll view. Default = undefined
            //onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={50}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={50}
            // Enable or disable scrolling of calendar list
            scrollEnabled={true}
            // Enable or disable vertical scroll indicator. Default = false
            showScrollIndicator={false}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              getName(day)
              //console.log('selected day', day);
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day => {
                console.log('selected day', day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
                console.log('month changed', month);
            }}
            // Hide month navigation arrows. Default = false
            hideArrows={true}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            renderArrow={direction => <Text>left</Text>}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={false}
            // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={false}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={subtractMonth => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            // Disable left arrow. Default = false
            disableArrowLeft={true}
            // Disable right arrow. Default = false
            disableArrowRight={true}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={false}
            // Replace default month and year title with custom one. the function receive a date as parameter
            //renderHeader={date => {
                /*Return JSX*/
            //}}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={false}
            
            theme={{
                monthTextColor: 'tomato',
                'stylesheet.calendar.header': {
                  dayTextAtIndex6: {
                    color: 'red'
                  }
                }
              }}

            />
            
        </View>
    );
}