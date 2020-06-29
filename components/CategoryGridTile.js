import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback
} from 'react-native';

const CategoryGridTile = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
      <View style={styles.gridItem}>
        <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
          <View style={styles.touchable}>
            <TouchableCmp onPress={props.onSelect} useForeground>
              <View style={styles.infoContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>
                    {props.title}
                  </Text>
                </View>
              </View>
            </TouchableCmp>
          </View>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  gridItem:{
    flex: 1,
    marginTop: 20,
    paddingBottom: 5,
    height: 150,
  },
  container: {
    flex: 1,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 150,
    marginHorizontal: 10,
  },
  textContainer: {
    width: '100%',
    height: '60%',
    alignItems: 'center',
    padding: 10
  },
  infoContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchable: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'center',
    
  }
});

export default CategoryGridTile;
