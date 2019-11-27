import React from 'react';
import { useMutation, ApolloConsumer } from '@apollo/react-hooks';
import getSMSCode from '../../graph/mutations/getSMSCode';
import LoginForm from './LoginForm';
import SMSCodeEntry from './SMSCodeEntry';

export default function Login() {
  const [getCode, { data, loading, error }] = useMutation(getSMSCode);

  async function sendSMS(number: string) {
    // get the SMS code
    await getCode({
      variables: {
        number
      }
    });
  }

  return !data ? (
    <LoginForm disabled={loading} sendSMS={sendSMS} error={error} />
  ) : (
    <ApolloConsumer>
      {client => <SMSCodeEntry userId={data.getSMSCode.id} client={client} />}
    </ApolloConsumer>
  );
}
