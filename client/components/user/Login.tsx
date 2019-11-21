import React from 'react';
import * as CountriesAndCodes from '../../utils/CountriesAndCodes.json';

export default function Login() {
  return (
    <View style={styles.container}>
      <Card wrapperStyle={styles.card}>
        <View>
          <Input
            disabled={loading}
            placeholder="+44 0000000"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => setNumber(text)}
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
            onChangeText={text => setPassword(text)}
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
                setLoginRequest(
                  <GetLogin number={number} password={password} />
                );
                return;
              }

              clickRegister(number, password);
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
