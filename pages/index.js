import React, { useEffect, useState } from 'react';
import { gql, useSubscription } from "@apollo/client";
import client from '../gql/client';

const CLASS_SUBSCRIPTION = gql`
  subscription {
    subscribeToClassUpdate {
      id
      classState
    }
  }
`;

const renderMessages = (messages) => messages.map((message) => <li key={message}>{JSON.stringify(message, null, 2)}</li>);

export default function Home() {
  const [messages, setMessages] = useState([]);
  const { data, loading } = useSubscription(CLASS_SUBSCRIPTION, { client });
  useEffect(() => setMessages([...messages, data]), [data]);
  const loadingString = JSON.stringify(loading)

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <p>Loading: {loadingString}</p>
      <p>Response: <ul>{renderMessages(messages)}</ul></p>
    </div>
  )
}
