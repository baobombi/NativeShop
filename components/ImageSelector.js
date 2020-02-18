import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button
} from 'react-native'
import Colors from '../constants/Colors'
import ImagePicker from 'react-native-image-picker';


const options = {
    title: 'Choose an option',
    //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};


const ImageSelector = (props) => {

    const [avatarSource, setAvatarSource] = useState()

    //console.log(avatarSource)
    const takeImageHandler = () => {

        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                setAvatarSource(source)
                props.onImageTake(source.uri)
            }
        });
    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!avatarSource && <Text>No image picked yet</Text>}
                <Image style={styles.image} source={avatarSource} />
            </View>
            <Button title='Take Image' color={Colors.primary} onPress={takeImageHandler} />
        </View>
    )
}


const styles = StyleSheet.create({

    imagePicker: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
})

export default ImageSelector