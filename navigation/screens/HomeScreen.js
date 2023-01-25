import { placeholder } from '@babel/types';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {ActivityIndicator, FlatList, View, Text, Button, Pressable, SafeAreaView, TextInput, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
const deviceLanguage = RNLocalize.getLocales()[0].languageCode;



export default function HomeScreen({ navigation, route }) {
    const { t, i18n } = useTranslation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <View style={{display:'flex',flexDirection:'row'}}>
            <Pressable style={[ { marginRight: 10 }]} onPress={() => {if(search){
                setSearch(false)
            }else{
                setSearch(true)
            }}}>
                <Ionicons name='search' size={30} color='tomato' />
            </Pressable>
            </View>
          ),
        });
      },);

    
    const [corectDay, setCorectDay] = useState();
    const [day, setDay] = useState(0);
    const [search, setSearch] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const url = new URL(
        "https://nameday.abalin.net/"
    );
    console.log(search)
    let timestamp;
    let rightDay;
    let rightMonth;
    let rightYear;
    actualDay();
    
    useEffect(() => {
        getNameByDate();
    }, );
if(route.params != undefined){
    const calendarJson = route.params.calendarJso;
    //console.log(calendarJson.timestamp);
    timestamp = calendarJson.timestamp;
    calendarDays = timestamp - new Date().getTime();
    //setDays(calendarDays+1);
}
function actualDay(){
    let millisec = (day * 86000000) + new Date().getTime();
    const actualDate = new Date(millisec);
    rightDay = actualDate.getDate();
    rightMonth = actualDate.getMonth()+1;
    rightYear = actualDate.getFullYear();
}
function plus(){
    setDay(day+1);
}
function minus(){
    setDay(day-1);
}
console.log(RNLocalize.getLocales()[0].languageCode);

    
   
    async function getNameByDate() {
        try {
            const data = {
                "country": "sk",
                "day": rightDay,
                "month": rightMonth
              };
              console.log(rightDay,'date')
            let headers = {
                "Content-Type": "application/json",
            }
              
              const today = await fetch(url+"namedays", {
                headers,
                method: "POST",
                body: JSON.stringify(data),
              });

              const jsonToday = await today.json();
              setCorectDay(jsonToday.data.namedays.sk);

        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }



// druha obrazovka


    const [name, setName] = useState();
    const [result, setResult] = useState();
    const [DATA, setDATA] = useState([]);

    useEffect(() => {
        if(name !== null){
        getDateByName();
        }
    },[name]);

    async function getDateByName() {
        try {
            setResult(false);
            const data = {
                "country": "sk",
                "name": name
              }
            let headers = {
                "Content-Type": "application/json",
            }
              
              const today = await fetch("https://nameday.abalin.net/getdate", {
                headers,
                method: "POST",
                body: JSON.stringify(data),
              });

              const jsonToday = await today.json();
              setDATA(jsonToday.data.namedays);
              if(DATA.length == 0){
                  setResult(true);
              }
              

        } catch (error) {
        //console.error(error);
            setResult(true);
            setDATA([]);
        } finally {
        //setLoading(false);
        }
    }

    const Item = ({ countryCode, day, month, name }) => (
        <View style={styles.items}>
            <View style={styles.itemText}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>{name}</Text>

                <Text style={{color: 'black'}}>{day} - {month}</Text>
            </View>
        </View>
      );

    const renderItem = ({ item }) => (
        <Item name={item.name} countryCode={item.countryCode} day={item.day} month={item.month} />
      );
    
    console.log(name)





    return (
        
        <View style={{ flex: 1}}>
        {search ?
            
            <View style={{flex: 1, backgroundColor: '#E6FFEF', justifyContent: 'space-around', flexDirection: 'row'}}>
                
                <Pressable onPress={() =>minus()} style={{alignSelf: 'center'}}>
                    <Ionicons name='chevron-back-sharp' size={50} color='tomato' />
                </Pressable>
                <View style={{alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 20}}>
                <View>
                        <Text style={{fontSize: 30, color: '#212136'}}>
                           {t("On this day celebrate")}
                        </Text>
                    </View>
                    <View >
                        <Text style={styles.dateText}>
                            {rightDay}-{rightMonth}-{rightYear}
                        </Text>
                    </View>
                        
                    
                    <Text style={{ fontSize: 60, fontWeight: 'bold', color: 'tomato' }}>
                        {isLoading ? <ActivityIndicator/> : (
                            <Text> {corectDay} </Text>
                        )}
                    </Text>
                </View>
                <Pressable onPress={() =>plus()} style={{alignSelf: 'center'}}>
                    <Ionicons name='chevron-forward-sharp' size={50} color='tomato' />
                </Pressable>
            </View>
            

            : 
            <SafeAreaView style={{flex: 1, backgroundColor: '#E6FFEF', alignItems: 'center'}}>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder={t("Enter a name")}
                    placeholderTextColor= 'grey'
                    
                    
                />
                {result ? <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', paddingTop: 40}}>
                    {t("No results found")}
                    </Text>:
                 <FlatList
                 style={styles.flatlist}
                 data={DATA}
                 renderItem={renderItem}
                 keyExtractor={item => item.id}
               />
                }
            </SafeAreaView>

            }
        </View>
        
        
    );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 3,
      padding: 10,
      borderRadius: 15,
      borderColor: 'tomato',
      width: 300,
      color: 'black',
      fontWeight: 'bold',
      backgroundColor: 'white'
    },
    dateText: {
        fontSize: 40, 
        fontWeight: 'bold', 
        color: '#212136',
    },
    flatlist:{
        color: 'black'
    },
    items: {
        
        width: '100%',
        alignSelf: 'center',
    },
    itemText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'white',
        margin: 8,
        padding: 8,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
  });