import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const initialTransactions = [
  {
    id: '1',
    name: 'Coffee Run',
    amount: 5.75,
    location: 'Tim Hortons',
    date: '2024-07-20',
    type: 'Expense',
    category: 'Food & Drink',
  },
  {
    id: '2',
    name: 'Monthly Salary',
    amount: 3200,
    location: 'My Employer Inc.',
    date: '2024-07-19',
    type: 'Deposit',
    category: 'Payroll',
  },
  {
    id: '3',
    name: 'Internet Bill',
    amount: 89.99,
    location: 'Rogers',
    date: '2024-07-18',
    type: 'Expense',
    category: 'Utilities',
  },
  {
    id: '4',
    name: 'Movie Tickets',
    amount: 32.50,
    location: 'Cineplex',
    date: '2024-07-17',
    type: 'Expense',
    category: 'Entertainment',
  },
  {
    id: '5',
    name: 'Uber Ride',
    amount: 21.15,
    location: 'Uber',
    date: '2024-07-16',
    type: 'Expense',
    category: 'Transportations',
  },
 
];

const TransactionsScreen = ({ navigation, route }) => {
  const [transactions, setTransactions] = useState(initialTransactions);

  useEffect(() => {
    if (route.params?.newTransaction) {
      setTransactions([...transactions, route.params.newTransaction]);
    }
  }, [route.params?.newTransaction]);

  const calculateTotal = () => {
    let total = 0;
    for (const transaction of transactions) {
      if (transaction.type === 'Deposit') {
        total += transaction.amount;
      } else {
        total -= transaction.amount;
      }
    }
    return total;
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            setTransactions(transactions.filter((t) => t.id !== id));
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TransactionDetails', { transaction: item })}>
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={item.type === 'Deposit' ? styles.deposit : styles.expense}>{item.type}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.itemAmount}>${item.amount.toFixed(2)}</Text>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalAmount}>${calculateTotal().toFixed(2)}</Text>
      </View>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTransaction')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#ffffff',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    color: '#6c757d',
  },
  totalAmount: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#212529',
    marginTop: 5,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#343a40',
  },
  deposit: {
    color: '#28a745',
    fontSize: 14,
    marginTop: 4,
  },
  expense: {
    color: '#dc3545',
    fontSize: 14,
    marginTop: 4,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  itemAmount: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#343a40',
  },
  deleteButton: {
    marginTop: 6,
    backgroundColor: '#dc3545',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 30,
  },
  logoutButton: {
    color: '#007AFF',
    fontSize: 16,
    marginRight: 10,
  },
});

export default TransactionsScreen; 