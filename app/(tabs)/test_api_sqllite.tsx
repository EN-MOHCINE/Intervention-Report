import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const TestApiSqlLite = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const initializeDatabase = async () => {
      const db = await SQLite.openDatabaseAsync('test_sqllite.db');

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(255),
          email VARCHAR(255) UNIQUE,
          email_verified_at TIMESTAMP NULL,
          password VARCHAR(255),
          remember_token VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('----------------------------------');
      console.log('Table `users` created successfully');
      console.log('----------------------------------');

      await db.execAsync(`
        INSERT INTO users (name, email, password) VALUES
        ('John Doe', 'john.doe@example.com', 'password123'),
        ('Jane Smith', 'jane.smitdsh@example.com', 'securepass456');
      `);
      console.log('----------------------------------');
      console.log('Users inserted successfully');
      console.log('----------------------------------');
      // Query all users from the database
      const data  = await db.execAsync(`SELECT * FROM users`);
      console.log('Table users' + data)
    };

    initializeDatabase();
  }, []);

  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <Text>Name: {item.name}</Text>
      <Text>Email: {item.email}</Text>
    </View>
  );

  return (
    <View>
      <Text>Test SQLite connection and creation of the `users` table</Text>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userCard: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
});

export default TestApiSqlLite;