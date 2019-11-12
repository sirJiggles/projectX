import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  AsyncStorage
} from 'react-native';
import { Input, Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../ui/colors';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../entry-point/EntryPoint';

const REGISTER = gql`
  mutation Register($name: String!, $password: String!) {
    createUser(name: $name, password: $password) {
      id
    }
  }
`;

const LOGIN = gql`
  mutation Login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
    }
  }
`;

export default function RegOrLogin() {
  const [register, { data, loading, error }] = useMutation(REGISTER);
  const [login, { loading: loadingLogin, error: errorLogin }] = useMutation(
    LOGIN,
    {
      refetchQueries: [
        {
          query: CURRENT_USER_QUERY
        }
      ]
    }
  );
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  async function clickRegister(name: string, password: string) {
    await register({ variables: { name, password } });
    login({ variables: { name, password } }).then(res => {
      // set the token now that we logged in
      if (!res.data.login.token) {
        console.error('we could not get the token from the login');
      }
      AsyncStorage.setItem('@token', res.data.login.token);
    });
  }

  return (
    <View style={styles.container}>
      <Card wrapperStyle={styles.card}>
        <View>
          <Text>Register / Login</Text>
          <Input
            disabled={loading || loadingLogin}
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
            disabled={loading || loadingLogin}
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
            disabled={loading || loadingLogin}
            onPress={() => {
              clickRegister(name, password);
            }}
          >
            Register
          </Button>
          {/* @TODO have a nice error component here */}
          {error || errorLogin ? (
            <Text>There was an error, please try again</Text>
          ) : null}
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
