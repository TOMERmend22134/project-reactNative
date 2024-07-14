import { Text, View, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [storedUser, setStoredUser] = useState<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await AsyncStorage.getItem('workerDetails');
        setStoredUser(user ? JSON.parse(user) : null);
      } catch (error) {
        console.error('Error reading user data:', error);
      }
    };

    loadUser();
  }, []);

  const handleLogin = () => {
    if (storedUser && userName === storedUser.email && password === storedUser.password) {
      console.log('Navigating to User');
      navigation.navigate('User');
    } else {
      Alert.alert('Invalid username or password');
    }
  };

  return (
    <View>
      <Text>LoginPage</Text>
      <TextInput
        placeholder="Username"
        value={userName}
        onChangeText={text => setUserName(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
