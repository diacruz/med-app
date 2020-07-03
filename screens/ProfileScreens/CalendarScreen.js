import React from 'react';
import { View, Button, Text, StyleSheet, Platform, NativeModules, processColor } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import { CalendarList, Agenda} from 'react-native-calendars';

const CalendarScreen = props => {
    return (
        <View style={styles.screen}>
            
            <CalendarList
                // Callback which gets executed when visible months change in scroll view. Default = undefined
                onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}

                onDayPress={(day) => { console.log('selected day', day) }}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CalendarScreen;
