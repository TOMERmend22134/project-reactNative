import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ navigation }: any) {
  const [workerDetails, setWorkerDetails] = useState<any>(null);

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      try {
        const userDetails = await AsyncStorage.getItem('workerDetails');
        if (userDetails) {
          setWorkerDetails(JSON.parse(userDetails));
        }
      } catch (error) {
        console.error('Failed to load worker details:', error);
      }
    };

    fetchWorkerDetails();
  }, []);

  if (!workerDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.detail}>Worker Name: {workerDetails.workerName}</Text>
      <Text style={styles.detail}>Address: {workerDetails.address}</Text>
      <Text style={styles.detail}>City: {workerDetails.city}</Text>
      <Text style={styles.detail}>Zip Code: {workerDetails.zipCode}</Text>
      <Text style={styles.detail}>Mobile Number: {workerDetails.mobileNumber}</Text>
      <Text style={styles.detail}>Job Code: {workerDetails.jobCode}</Text>
      <Text style={styles.detail}>Work Start Date: {workerDetails.workStartDate ? new Date(workerDetails.workStartDate).toDateString() : 'Not set'}</Text>
      <Text style={styles.detail}>Personal ID: {workerDetails.personalId}</Text>
      <Text style={styles.detail}>Email: {workerDetails.email}</Text>
      <Button
        title="Edit Profile"
        onPress={() => navigation.navigate('EditProfile')}
      />
    </ScrollView>
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
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
});
