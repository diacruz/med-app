import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Alert, Button, Text, StyleSheet, Platform, NativeModules, processColor } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import { CalendarList, Agenda } from 'react-native-calendars';
import CalendarPicker from 'react-native-calendar-picker';
//import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import { FAB } from 'react-native-paper';

const CalendarScreen = props => {
    const [eventTitle, setEventTitle] = useState('Default event');
    const [selectedStartDate, setSelectedStartDate] = useState(null)

    const [date, setDate] = useState(moment().format("MMMM YYYY"));
    const [dateToRefresh, setDateToRefresh] = useState(moment().format("YYYY-MM-DD"));
    //const startDate = selectedStartDate ? selectedStartDate.toString() : '';

    const [items, setItems] = useState({});
    const [text, setText] = useState('')


    const loadItems = (day) => {
        setSelectedStartDate(day)
        const time = day.timestamp //+ i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
            items[strTime] = [];
        }
        //items[strTime] = []
    }

    const addEvents = () => {
        setTimeout(() => {
            const time = selectedStartDate.timestamp //+ i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);
            items[strTime] = [];
            items[strTime].push({
                name: 'New event created',
            });
            const newItems = {};
            Object.keys(items).forEach(key => { newItems[key] = items[key]; });
            setItems(newItems)
        })
    }

    const renderItem = (item) => {
        return (
            <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
        );
    }

    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                    <Text>No event</Text>
            </View>


        );
    }

    const rowHasChanged = (r1, r2) => {
        return r1.name !== r2.name;
    }

    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    return (
        <View style={{ height: '100%', width: '100%' }}>
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={selectedStartDate}
                renderItem={renderItem}
                renderEmptyDate={renderEmptyDate}
                rowHasChanged={rowHasChanged}>
            </Agenda>
            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={addEvents}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: 'lightskyblue'
    },

});

CalendarScreen.navigationOptions = navigationdata => {
    return {
        headerTitle: 'Profile',
    }
};

export default CalendarScreen;
