import * as React from 'react';
import { View, Text, Button, Image, Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

// Screens
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import PeopleScreen from './screens/PeopleScreen';
import SearchScreen from './screens/SearchScreen';




function MainContainer({navigation}) {
  const { t, i18n } = useTranslation();

//Screen names
const homeName = t("Nameday");
const calendarName = t("Calendar");
const peopleName = t("Birthday");
const inspirationName = t("Inspiration");

const Tab = createBottomTabNavigator();
  return (
    
    <NavigationContainer>
      <Tab.Navigator

      
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'gift' : 'gift-outline';

            } else if (rn === calendarName) {
              iconName = focused ? 'calendar' : 'calendar-outline';

            } else if (rn === peopleName) {
              iconName = focused ? 'people' : 'people-outline';
              
            } else if (rn === inspirationName) {
              iconName = focused ? 'bulb' : 'bulb-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          

          /*headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Calendar')}>
              <Ionicons name='search' size={30} color='tomato' />
            </Pressable>
          ),*/
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
          
        }}
        
        >
            

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={calendarName} component={CalendarScreen} />
        <Tab.Screen name={peopleName} component={PeopleScreen} />
        
        
        <Tab.Screen name={inspirationName} component={SearchScreen}  />
        
        
      </Tab.Navigator>
      
    </NavigationContainer>
  );
}

export default MainContainer;