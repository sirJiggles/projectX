import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { Input, Divider, Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../ui/colors';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import GetLogin from './GetLogin';

const REGISTER = gql`
  mutation Register($name: String!, $password: String!) {
    createUser(name: $name, password: $password) {
      id
    }
  }
`;

export default function RegOrLogin() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [register, { data, loading, error }] = useMutation(REGISTER);
  return (
    <View style={styles.container}>
      <Card wrapperStyle={styles.card}>
        <View>
          <Text>Register</Text>
          <Input
            placeholder="username"
            onChangeText={text => {
              setName(text);
            }}
            leftIcon={
              <Ionicons
                name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-body`}
                size={24}
                style={styles.icon}
              />
            }
          />
          <Input
            placeholder="password"
            onChangeText={text => {
              setPassword(text);
            }}
            leftIcon={
              <Ionicons
                name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-lock`}
                size={24}
                style={styles.icon}
              />
            }
          />

          <Button
            title="Register"
            onPress={async () => {
              await register({ variables: { name, password } });

              if (error) {
                // @TODO handle this better
                console.error('could not register!');
              }

              if (data) {
                <GetLogin name={name} password={password} />;
              }
            }}
          >
            Register
          </Button>
        </View>
      </Card>
      <Divider />
      <Card>
        <Text>This will be the login form!</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: 300
  },
  icon: {
    display: 'flex',
    width: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  regForm: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
    width: '70%'
  },
  messageInstructions: {
    color: colors.lightContext.hex
  }
});
