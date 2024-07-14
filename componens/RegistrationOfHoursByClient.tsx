import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function RegistrationOfHoursByClient() {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [hours, setHours] = useState<string>('');
  const [clients, setClients] = useState([
    'Client 1',
    'Client 2',
    'Client 3',
    'Client 4',
    'Client 5',
  ]);
  const [workHours, setWorkHours] = useState<Record<string, number>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);  // מצב עריכה

  const handleRegisterHours = () => {
    if (selectedClient && hours) {
      setWorkHours((prevWorkHours) => {
        const newHours = prevWorkHours[selectedClient]
          ? prevWorkHours[selectedClient] + Number(hours)
          : Number(hours);
        return { ...prevWorkHours, [selectedClient]: newHours };
      });
      setHours('');
      Alert.alert('Success', `Added ${hours} hours for ${selectedClient}`);
    } else {
      Alert.alert('Error', 'Please select a client and enter hours');
    }
  };

  const handleEditHours = () => {
    if (selectedClient && hours) {
      setWorkHours((prevWorkHours) => {
        if (prevWorkHours[selectedClient] !== undefined) {
          const newHours = Number(hours);
          return { ...prevWorkHours, [selectedClient]: newHours };
        } else {
          Alert.alert('Error', 'Client not found.');
          return prevWorkHours;
        }
      });
      setHours('');
      Alert.alert('Success', `Updated hours for ${selectedClient}`);
    } else {
      Alert.alert('Error', 'Please select a client and enter hours');
    }
  };

  const handleDeleteHours = () => {
    if (selectedClient) {
      setWorkHours((prevWorkHours) => {
        const { [selectedClient]: deletedHours, ...rest } = prevWorkHours;
        Alert.alert('Success', `Deleted hours for ${selectedClient}`);
        return rest;
      });
      setSelectedClient(null);
    } else {
      Alert.alert('Error', 'Please select a client to delete hours');
    }
  };

  const getTotalHours = () => {
    if (selectedClient) {
      const total = workHours[selectedClient] || 0;
      return total.toFixed(2);
    }
    return '0.00';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Edit Hours' : 'Register Hours'}</Text>

      <Text style={styles.label}>Select Client:</Text>
      <Picker
        selectedValue={selectedClient}
        onValueChange={(itemValue) => setSelectedClient(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a client" value={null} />
        {clients.map((client, index) => (
          <Picker.Item key={index} label={client} value={client} />
        ))}
      </Picker>

      <Text style={styles.label}>Enter Hours:</Text>
      <TextInput
        style={styles.input}
        placeholder="Hours"
        value={hours}
        onChangeText={setHours}
        keyboardType="numeric"
      />

      {isEditing ? (
        <>
          <Button title="Save Changes" onPress={handleEditHours} />
          <Button title="Delete Hours" onPress={handleDeleteHours} color="red" />
        </>
      ) : (
        <Button title="Register Hours" onPress={handleRegisterHours} />
      )}

      <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={styles.editButton}>
        <Text style={styles.editButtonText}>{isEditing ? 'Cancel Editing' : 'Edit Hours'}</Text>
      </TouchableOpacity>

      {selectedClient && !isEditing && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            Total Hours for {selectedClient}: {getTotalHours()} hours
          </Text>
        </View>
      )}
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
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  editButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  summaryContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  summaryText: {
    fontSize: 18,
  },
});
