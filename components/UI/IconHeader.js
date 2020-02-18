import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'
import {
    View,
    StyleSheet,
    Platform,
} from 'react-native';

Icon.loadFont()

const IconHeader = (props) => {
    return (
        <View style={styles.viewButton}>
            <Icon.Button
                name={props.name}
                onPress={props.onTapped}
                size={30}
                color={Platform.OS === 'android' ? 'white' : 'white'}
                backgroundColor= {Colors.default}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewButton: {
        //backgroundColor: 'white',
        overflow: 'hidden',
    }
});
export default IconHeader;