import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { Input, Divider, Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../ui/colors';
import Loading from '../loading/Loading';
import GetLogin from './GetLogin';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const REGISTER = gql`
  mutation Register($name: String!, $password: String!) {
    createUser(name: $name, password: $password) {
      id
    }
  }
`;

export default function RegOrLogin() {
  const [register, { data, loading, error }] = useMutation(REGISTER);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // we will make the login query if we have the right conditions
  const makeLoginQuery = data && <GetLogin name={name} password={password} />;

  async function clickRegister(name: string, password: string) {
    await register({ variables: { name, password } });

    if (data) {
      console.log('we just registered!');

      return;
    }
  }

  return (
    <View style={styles.container}>
      <Card wrapperStyle={styles.card}>
        <View>
          <Text>Register / Login</Text>
          <Input
            disabled={loading}
            placeholder="username"
            autoCapitalize="none"
            autoCorrect={false}
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
            disabled={loading}
            placeholder="password"
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            secureTextEntry={true}
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
            // if we are loading or there is an error we disable the button
            disabled={loading}
            onPress={() => {
              clickRegister(name, password);
            }}
          >
            Register
          </Button>

          {makeLoginQuery}

          {error && <Text>Error registering please try again</Text>}
        </View>
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
