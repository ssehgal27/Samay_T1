import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const AddTransactionScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('Expense');
  const [category, setCategory] = useState('');

  const handleNewTransaction = () => {
    if (!name || !amount || !location || !date || !category || !type) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid, positive number for the amount.');
      return;
    }
    
    const newTransaction = {
      id: Math.random().toString(),
      name,
      amount: parseFloat(amount),
      location,
      date,
      type,
      category,
    };

    navigation.navigate('Transactions', { newTransaction });
  };

  const radioOptions = ['Expense', 'Deposit'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>
      <TextInput
        style={styles.input}
        placeholder="Transaction Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <View style={styles.radioGroup}>
        {radioOptions.map(option => (
          <TouchableOpacity
            key={option}
            style={styles.radioContainer}
            onPress={() => setType(option)}
          >
            <View style={styles.radioCircle}>
              {type === option && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.radioLabel}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text>Selected Type: {type}</Text>
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TouchableOpacity style={styles.button} onPress={handleNewTransaction}>
        <Text style={styles.buttonText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#343a40',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 16,
    color: '#495057',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AddTransactionScreen; 