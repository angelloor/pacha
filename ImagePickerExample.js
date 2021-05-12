import * as ImagePicker from 'expo-image-picker';
import mime from "mime";
import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import Http from './src/libs/http';

export default function ImagePickerExample() {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        console.log(result);

        if (!result.cancelled) {
            setImage(result);
        }
    };

    const createFormData = (photo, body) => {
        const data = new FormData()
        const newImageUri = "file:///" + photo.uri.split("file:/").join("")

        data.append('photoChallengue', {
            uri: newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split('/').pop(),
        })

        Object.keys(body).forEach((key) => {
            data.append(key, body[key]);
        });

        return data;
    }

    const saveImage = async (image) => {
        let match = /\.(\w+)$/.exec(image.uri.split('/').pop())
        const fileType = match[1]

        const data = createFormData(image, { idUser: '20', idChallenge: '70' })
        console.log(data)

        Http.instance.postFormData('/challenge/saveImage', data)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const deleteImage = async () => {
        setImage(null)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            <Button title="Enviar Imagen" onPress={() => saveImage(image)} />
            <Button title="Borrar Imagen" onPress={deleteImage} />
            {
                (image)
                    ?
                    <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />
                    :
                    <></>
            }
        </View>
    );
}