import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { Input, Divider, Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../ui/colors';

export default class RegOrLogin extends Component {
  state: {
    username: '';
    password: '';
  };

  // @TODO make this send a mutation on up to register a user with apollo
  register() {
    console.log('will register with ');
    console.log(this.state);
  }

  render() {
    return (
      <View style={styles.container}>
        <Card>
          <Text>Register</Text>
          <Input
            placeholder="username"
            onChangeText={text => {
              this.setState({ ...this.state, username: text });
            }}
            leftIcon={
              <Ionicons
                name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-body`}
                size={24}
              />
            }
          />
          <Input
            placeholder="password"
            onChangeText={text => {
              this.setState({ ...this.state, password: text });
            }}
            leftIcon={
              <Ionicons
                name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-lock`}
                size={24}
              />
            }
          />

          <Button
            title="Register"
            onPress={() => {
              this.register();
            }}
          >
            Register
          </Button>
        </Card>
        <Divider />
        <Card>
          <Text>This will be the login form!</Text>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  messageInput: {
    height: 50,
    borderColor: colors.lightContext.hex,
    borderWidth: 2,
    borderRadius: 3,
    paddingLeft: 20,
    paddingRight: 20
  }
});
