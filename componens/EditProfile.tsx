import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfile({ navigation }: any) {
  const [workerDetails, setWorkerDetails] = useState<any>(null);
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

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      try {
        const userDetails = await AsyncStorage.getItem('workerDetails');
        if (userDetails) {
          const details = JSON.parse(userDetails);
          setWorkerDetails(details);
          setWorkerName(details.workerName);
          setAddress(details.address);
          setCity(details.city);
          setZipCode(details.zipCode);
          setMobileNumber(details.mobileNumber);
          setJobCode(details.jobCode);
          setWorkStartDate(new Date(details.workStartDate));
          setPersonalId(details.personalId);
          setPassword(details.password);
          setEmail(details.email);
        }
      } catch (error) {
        console.error('Failed to load worker details:', error);
      }
    };

    fetchWorkerDetails();
  }, []);

  const handleSave = async () => {
    const updatedDetails = {
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
      await AsyncStorage.setItem('workerDetails', JSON.stringify(updatedDetails));
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save worker details:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Work Start Date"
        value={workStartDate ? workStartDate.toDateString() : ''}
        editable={false}
      />
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
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
});
