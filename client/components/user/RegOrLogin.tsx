import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { Input, Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../ui/colors';
import { useMutation } from '@apollo/react-hooks';
import GetLogin from './GetLogin';
import register from '../../graph/mutations/register';

export default function RegOrLogin() {
  const [runRegisterMutation, { data, loading, error }] = useMutation(register);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // of we get data from the register, will return jsx for login
  const doLogin = data ? <GetLogin name={name} password={password} /> : null;

  async function clickRegister(name: string, password: string) {
    await runRegisterMutation({ variables: { name, password } });
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
          {/* @TODO have a nice error component here */}
          {error ? <Text>There was an error, please try again</Text> : null}

          {doLogin}
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
