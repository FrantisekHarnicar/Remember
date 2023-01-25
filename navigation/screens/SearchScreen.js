import { t } from 'i18next';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {ActivityIndicator, FlatList, View, Text, Button, SafeAreaView, TextInput, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

export default function HomeScreen({ navigation, route }) {
    const { t, i18n } = useTranslation();
    return (
        
        <SafeAreaView style={{width: '100%', alignSelf: 'center', backgroundColor: '#E6FFEF', flex: 1}}>
            <ScrollView>
                <Text selectable={true} style={styles.textStyle}>
                    {t("I guess it's pretty clear to you that I wish you all the best, good health, happy birthday, sweet kisses on the cheeks.")}
                </Text>

                <Text selectable={true} style={styles.textStyle}>
                    {t("Always have the happiness of the whole mountain, health like the waters in the sea, may as much love belong to you as the shields of the Tatras.")}
                </Text>

                <Text selectable={true} style={styles.textStyle}>
                    {t("I wish you on your birthday, as usual, to fulfill what Your heart hides.")}
                </Text>

                <Text selectable={true} style={styles.textStyle}>
                    {t("Wish you joy? That would not be enough. Wish you beauty? You don't have much of her. Wish you luck? What for? You will find him yourself. So I wish you all that you miss, let life give you what it contains! Happy Birthday.")}
                </Text>

                <Text selectable={true} style={styles.textStyle}>
                    {t("All the best for your holiday, accept my wish, may happiness, health, love always stay close to you!")}
                </Text>

                <Text selectable={true} style={styles.textStyle}>
                    {t("Let the sun still shine in the windows of your home, even if the cloud covers it, it will shine again. May your life fulfill you, all your hopes, may happiness smile on you every day, may you never know pain or delusion, we wish you all this birthday today.")}
                </Text>

                <Text selectable={true} style={styles.textStyle}>
                    {t("I wish you health for your birthday, because it is rare, happiness, because it is beautiful and love, because it is not enough.")}
                </Text>

                <Text selectable={true} style={styles.textStyle}>
                    {t("Today is your big day, so celebrate it great. Rejoice, have fun, dance, go crazy! It's great to know a person like you, I wish you all the best! ...")}
                </Text>

                <Text selectable={true} style={styles.textStyle}>
                    {t("All the best for your beautiful holiday, lots of sincere love, good health and may the days come that will fulfill all your secret dreams. From the bottom of my heart ...")}
                </Text>

                <Text selectable={true} style={styles.textStyle}>
                    {t("May the sun of happiness shine on you, may the love of your heart warm you, may you never be sad and may the heavens grant you good health.")}
                </Text>
            </ScrollView>
                
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'white',
        color: '#212136',
        padding: 16,
        borderRadius: 20,
        marginTop: 5,
        margin: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
  });