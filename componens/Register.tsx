import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  const handleRegister = () => {
    if (!workerName || !address || !city || !mobileNumber || !jobCode || !workStartDate || !personalId || !password) {
      Alert.alert('Error', 'All fields except Zip Code are required!');
      return;
    }

    // Add your registration logic here
    Alert.alert('Registered successfully!');
  };

  const handleLogin = () => {
    navigation.navigate('Login') // Assumes there's a 'Login' screen in your navigator
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
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Worker Name"
        value={workerName}
        onChangeText={setWorkerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Zip Code"
        value={zipCode}
        onChangeText={setZipCode}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Job Code"
        value={jobCode}
        onChangeText={setJobCode}
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
        onChangeText={setPersonalId}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Go to Login" onPress={handleLogin} />
    </View>
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
});
