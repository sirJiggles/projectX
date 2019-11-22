import React, { useState, useEffect } from 'react';
import CountriesAndCodes from '../../utils/CountriesAndCodes.json';
import { Picker, View, Button, StyleSheet, Text } from 'react-native';
import { Card, Input, SearchBar } from 'react-native-elements';

export default function Login() {
  // state for the login view
  const [country, setCountry] = useState(CountriesAndCodes[0]);
  const [number, setNumber] = useState('');
  const [search, setSearchTerm] = useState('');
  const [picker, setPicker] = useState(country.name);

  const processing = false;

  // @TODO this is where we will send the SMS
  function sendSMS() {
    alert('will now send the sms!');
  }

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
            mode="dropdown"
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
            disabled={processing}
            placeholder="7712345679"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => setNumber(text)}
          />
        </View>
        <View>
          <Button
            title="Send SMS"
            // if we are loading or there is an error we disable the button
            disabled={processing}
            onPress={() => {
              sendSMS();
            }}
          >
            Send SMS
          </Button>
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
