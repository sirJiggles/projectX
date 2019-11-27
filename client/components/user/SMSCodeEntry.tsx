import React, { useState, SFC } from 'react';
import { View, Button, Text, AsyncStorage } from 'react-native';
import { Card, Input, Divider } from 'react-native-elements';
import authenticate from '../../graph/queries/authenticate';
import currentUser from '../../graph/queries/currentUser';

import { ApolloProviderProps } from '@apollo/react-common/lib/context/ApolloProvider';

interface SMSCodeEntryProps extends ApolloProviderProps<any> {
  userId: string;
}

const SMSCodeEntry: SFC<SMSCodeEntryProps> = props => {
  const [code, setCode] = useState('');

  let result, error;

  async function authenticateCode() {
    try {
      result = await props.client.query({
        query: authenticate,
        variables: {
          code,
          userId: props.userId
        }
      });
      if (result?.data?.authenticate) {
        AsyncStorage.setItem('@token', result.data.authenticate.token);

        // now we set the token we need to login, again with client query
        props.client.query({
          query: currentUser,
          fetchPolicy: 'network-only'
        });
      }
    } catch (err) {
      console.error(err);
      error = err;
    }
  }

  return (
    <View>
      <Card>
        <Input onChangeText={text => setCode(text)} />
        <Divider />
        <Button
          title="Authenticate"
          disabled={result?.data?.loading}
          onPress={() => {
            authenticateCode();
          }}
        />
        {error ? <Text>There was an error</Text> : null}
      </Card>
    </View>
  );
};

export default SMSCodeEntry;
