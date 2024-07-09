import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
  const [workerName, setWorkerName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [jobCode, setJobCode] = useState('');
  const [workStartDate, setWorkStartDate] = useState<Date | undefined>(undefined);
  const [personalId, setPersonalId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!workerName || !address || !city || !mobileNumber || !jobCode || !workStartDate || !personalId || !password || !email) {
      Alert.alert('Error', 'All fields except Zip Code are required!');
      return;
    }

    const workerDetails = {
      workerName,
      address,
      city,
      zipCode,
      mobileNumber,
      jobCode,
      workStartDate,
      personalId,
      password,
      email,
    };

    try {
      await AsyncStorage.setItem('workerDetails', JSON.stringify(workerDetails));
      console.log('Worker Details saved');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error saving worker details:', error);
      Alert.alert('Error', 'There was an error saving your details. Please try again.');
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setWorkStartDate(selectedDate);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Worker Name"
          value={workerName}
          onChangeText={(text) => setWorkerName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Zip Code"
          value={zipCode}
          onChangeText={(text) => setZipCode(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          value={mobileNumber}
          onChangeText={(text) => setMobileNumber(text)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Job Code"
          value={jobCode}
          onChangeText={(text) => setJobCode(text)}
          keyboardType="numeric"
        />
        <View style={styles.datePickerContainer}>
          <Button title="Work Start Date" onPress={showDatepicker} />
          <Text>{workStartDate ? workStartDate.toDateString() : 'No date selected'}</Text>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={workStartDate || new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Personal ID"
          value={personalId}
          onChangeText={(text) => setPersonalId(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
  datePickerContainer: {
    marginBottom: 12,
  },
  registerButton: {
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
