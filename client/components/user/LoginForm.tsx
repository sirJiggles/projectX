import React, { useState, SFC } from 'react';
import CountriesAndCodes from '../../utils/CountriesAndCodes.json';
import { Picker, View, Button, StyleSheet, Text } from 'react-native';
import { Card, Input, SearchBar } from 'react-native-elements';

export interface LoginFormProps {
  sendSMS: (number: string) => void;
  disabled: boolean;
  error?: any;
}

const LoginForm: SFC<LoginFormProps> = props => {
  const [country, setCountry] = useState(CountriesAndCodes[0]);
  const [number, setNumber] = useState('');
  const [search, setSearchTerm] = useState('');

  // search on countries functionality
  let filteredCountries = [];
  if (search !== '') {
    const searchPattern = new RegExp(`(?=.*${search})`, 'i');
    filteredCountries = CountriesAndCodes.filter(country =>
      country.name.match(searchPattern)
    );
  } else {
    filteredCountries = CountriesAndCodes;
  }

  return (
    <View style={styles.container}>
      <Card wrapperStyle={styles.card}>
        <View>
          <SearchBar
            placeholder="Country..."
            lightTheme
            onChangeText={term => {
              setSearchTerm(term);
            }}
            value={search}
          />
        </View>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={filteredCountries.indexOf(country)}
            onValueChange={index => {
              setCountry(filteredCountries[index]);
            }}
          >
            {filteredCountries.map((countryItem, index) => {
              return (
                <Picker.Item
                  label={countryItem.name}
                  value={index}
                  key={index}
                />
              );
            })}
          </Picker>
        </View>
        <View style={styles.inputsWrapper}>
          <Input
            disabled
            value={country.dial_code}
            containerStyle={styles.codeInput}
          />
          <Input
            containerStyle={styles.phoneInput}
            disabled={props.disabled}
            placeholder="7712345679"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => setNumber(text)}
          />
        </View>
        <View>
          <Button
            disabled={number === '' || props.disabled}
            title="Send SMS"
            // if we are loading or there is an error we disable the button
            onPress={() => {
              props.sendSMS(`${country.dial_code}${number}`);
            }}
          >
            Send SMS
          </Button>
          {props.error ? (
            <Text>
              There was an error with the login request
              {JSON.stringify(props.error)}
            </Text>
          ) : null}
        </View>
      </Card>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  card: {
    width: 300
  },
  pickerWrapper: {
    marginBottom: 20
  },
  inputsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginBottom: 20
  },
  codeInput: {
    // maxWidth: 100,
    width: 80
  },
  phoneInput: {
    width: 220
  }
});
