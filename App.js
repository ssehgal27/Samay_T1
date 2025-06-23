import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import TransactionDetailsScreen from './screens/TransactionDetailsScreen';
import AddTransactionScreen from './screens/AddTransactionScreen';

const Stack = createNativeStackNavigator();

const transactionsScreenOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <Text style={styles.logoutButton}>Logout</Text>
    </TouchableOpacity>
  ),
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Group>
            <Stack.Screen
              name="Transactions"
              component={TransactionsScreen}
              options={transactionsScreenOptions}
            />
            <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
            <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    color: '#007bff',
    fontSize: 16,
    marginRight: 10,
  },
});

export default App; 