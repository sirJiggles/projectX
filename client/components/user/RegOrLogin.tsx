import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Platform, Picker } from 'react-native';
import { Input, Card, ButtonGroup } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../ui/colors';
import { useMutation } from '@apollo/react-hooks';
import GetLogin from './GetLogin';
import register from '../../graph/mutations/register';

export default function RegOrLogin() {
  const [runRegisterMutation, { data, loading, error }] = useMutation(register);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loginView, setLoginView] = useState(true);
  const [loginRequest, setLoginRequest] = useState(null);

  // of we get data from the register, will return jsx for login
  const doLoginAfterRegister = data ? (
    <GetLogin name={name} password={password} />
  ) : null;

  async function clickRegister(name: string, password: string) {
    await runRegisterMutation({ variables: { name, password } });
  }

  function setView(index) {
    setLoginView(index === 0);
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <ButtonGroup
          onPress={setView}
          selectedIndex={loginView ? 0 : 1}
          buttons={['Login', 'Register']}
          containerStyle={{ height: 30 }}
        />
      </View>
      <Card wrapperStyle={styles.card}>
        <View>
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
            title={loginView ? 'Login' : 'Register'}
            // if we are loading or there is an error we disable the button
            disabled={loading}
            onPress={() => {
              if (loginView) {
                setLoginRequest(<GetLogin name={name} password={password} />);
                return;
              }

              clickRegister(name, password);
            }}
          >
            {loginView ? 'Login' : 'Register'}
          </Button>

          {/* @TODO have a nice error component here */}
          {error ? <Text>There was an error, please try again</Text> : null}

          {/* some queries to login at various points */}
          {loginRequest}
          {doLoginAfterRegister}
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    width: 300,
    marginBottom: 40
  },
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
