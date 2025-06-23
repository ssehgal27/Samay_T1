import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionDetailsScreen = ({navigation, route }) => {
  const { transaction } = route.params;
  const isDeposit = transaction.type === 'Deposit';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.transactionName}>{transaction.name}</Text>
          <Text style={styles.transactionType}>{transaction.type}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Amount</Text>
            <Text style={[styles.value, { color: isDeposit ? '#2ecc71' : '#e74c3c' }]}>
              ${transaction.amount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{transaction.location}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{transaction.date}</Text>
          </View>
          <View style={[styles.row, { borderBottomWidth: 0 }]}>
            <Text style={styles.label}>Category</Text>
            <Text style={styles.value}>{transaction.category}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
    padding: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  transactionName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  transactionType: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  detailsContainer: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TransactionDetailsScreen; 