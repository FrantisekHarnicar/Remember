import * as React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Button, FlatList, Pressable, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen({ navigation }) {
    const { t, i18n } = useTranslation();
    let dataToStore = [];
    const [DATA, setDATA] =useState([]);
    const [name, setName] = useState("Name");
    const [number, onChangeNumber] = useState(null);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [defaultDate, setDefaultDate] = useState("1-1-2022");
    let outputDate = date.getDate();
    let outputMonth = date.getMonth()+1;
    let outputYear = date.getFullYear();
    let actualBirthday;
    console.log(name);
    console.log(outputDate)
    const [isModalVisible, setModalVisible] = useState(false);

    
    useEffect(() => {
        console.log("use")
        getData();
    },[]);
    
    console.log(DATA, "vonku");
    function writeToJson(){
        DATA.push(
            {
                id: name,
                day: outputDate,
                month: outputMonth,
                year: outputYear,
            });
            setDate(new Date());
            setName("Name");
    }
    function jsonStore(){
        dataToStore = (
            {
                id: name,
                day: outputDate,
                month: outputMonth,
                year: outputYear,
            });
    }
    
    function writeBirthday(){
        toggleModal();
        writeToJson();
        jsonStore();
        console.log(dataToStore, "na ulozenie");
        storeData(name, JSON.stringify(dataToStore));
    }

    async function storeData(key, value){
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error(error);
        }
    }

    async function getData(){
        try{
            //AsyncStorage.clear();
            let keys = await AsyncStorage.getAllKeys();
            let oneKey = [];
            console.log(keys.length)
            for(let i = 0; i < keys.length; i++){
                oneKey.push(JSON.parse(await AsyncStorage.getItem(keys[i])));
                actualBirthday = calculateAge(JSON.parse(await AsyncStorage.getItem(keys[i])).year);
            }
            setDATA(oneKey);

        }catch(error){
            console.error(error);
        }

        
    }

    function calculateAge(age){
        return new Date().getFullYear() - age;

    }
    async function zmazat(key){
        await AsyncStorage.removeItem(key);
        getData();
    }

    function deleteItem(key){
        Alert.alert(
            t("Delete"),
            t("After pressing OK, the entry will be deleted"),
            [
                {text: t("Cancel")},
              { text: "OK", onPress: () => zmazat(key)}
              
            ],
            {
              cancelable: true
            }
          );
          
    }


  const Item = ({ day, month, id, year, onPress }) => (
    <View>
        <View style={styles.container}>
            <View style={styles.items}>
                <Text style={{color: 'black', fontSize: 17, paddingBottom: 8}}>{id}</Text>
                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 19}}>{day} - {month} - {year}</Text>
            </View>

            <Pressable onPress={onPress} >
                    <Ionicons name='trash-bin' size={28} color='red'/>
                </Pressable>
            
        </View>
    </View>
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    };

    const renderItem = ({ item }) => (
        <Item id={item.id} day={item.day} month={item.month} year={item.year} 
        onPress = {() =>  deleteItem(item.id)}/>
        
      );
  
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'flex-end', backgroundColor: '#E6FFEF',}}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style= {{width: '100%'}}
            />
            <View style= {{marginHorizontal: 20}}>
                <View style={styles.add}>
                    
                    <Pressable onPress={toggleModal}>
                        <Ionicons name='add-circle' size={70} color='tomato'/>
                    </Pressable>
                </View>

                <Modal isVisible={isModalVisible}
                    style={styles.modal}>
                    <View  style={{ alignItems: 'center'}}>
                        <SafeAreaView style={{alignItems: 'center', width: '100%'}}>
                        <Ionicons style={{marginBottom: 80}} name='person' size={100} color='tomato'/>
                            <TextInput
                                style={styles.input}
                                onChangeText={setName}
                                placeholder={t("Add name")}
                                placeholderTextColor="gray"
                            />

                            <View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                    <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold', marginRight: 40}}>
                                        {outputDate} - {outputMonth} - {outputYear}
                                    </Text>
                                    <Pressable onPress= {() => setOpen(true)}>
                                        <Ionicons name='md-calendar-sharp' size={40} color='tomato'/>
                                    </Pressable>
                                </View>
                            </View>
                                <DatePicker
                                textColor= 'white'
                                    modal
                                    mode='date'
                                    open={open}
                                    date={date}
                                    onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                    }}
                                    onCancel={() => {
                                    setOpen(false)
                                    }}
                                />
                        </SafeAreaView>
                        <View style={{flexDirection: 'row-reverse', justifyContent: 'space-around', width: '100%'}} >
                            
                            <Button color="#5EDB5E" title={t("Save")} onPress={writeBirthday}/>
                            <Button color= "#DB312E" title={t("Cancel")} onPress={toggleModal}/>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginHorizontal: 10,
        borderWidth: 3,
        padding: 10,
        borderRadius: 15,
        borderColor: 'tomato',
        width: '95%',
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: 'white',
        marginBottom: 40
    },
    container: {
        alignItems: 'center',
        with: '100%',
        backgroundColor: 'white',
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

elevation: 5,
    },
    items: {
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'white',
        padding: 10,
        
    },
    add: {

        padding: 3,
        alignItems: 'center'
    },
    modal: {
        backgroundColor: 'rgba(250, 255,239, 0.8)', 
        borderRadius: 50,
    }
  });