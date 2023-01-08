/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useStateMachine } from 'little-state-machine';

import updateAction from './updateAction';

const Step3 = () => {
  const { state } = useStateMachine({ updateAction });
  const [username, setUsername] = useState(state.username);

  const GET_LOGGEDIN_USER = gql`
    query {
      getLoggedInUser {
        id
        lastLogin
        username
        email
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_LOGGEDIN_USER, {
    onCompleted: (queryData) => {
      // console.log(queryData);
    },
    onError: (errorData) => {
      // console.log(`error :  ${errorData}`);
    },
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request
  });

  if (loading) return <p>Loading ...</p>;

  return <div className="form">{JSON.stringify(data)}</div>;
};

export default Step3;
