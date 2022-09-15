import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import logo from './assets/logo.png';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  const { setSelectedImage } = React.useContext(ImageContext);
  const openImagePickerAsync = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>

      <Button
        title="See photo"
        onPress={() => navigation.navigate('Details')}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  const { selectedImage } = React.useContext(ImageContext);

  return (
    <View style={styles.container}>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
      )}
      <Button title="Go back" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const ImageContext = React.createContext(null);
const Stack = createNativeStackNavigator();

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  return (
    <ImageContext.Provider value={{ selectedImage, setSelectedImage }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ImageContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 12,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: 'gray',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
