/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
import clearAction from './clearAction';
import updateAction from './updateAction';

const Step1 = () => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const { actions } = useStateMachine({ clearAction, updateAction });

  const GET_USER_MFASTATUS = gql`
    query getUser($username: String) {
      getUser(username: $username) {
        username
        mfaStatus
      }
    }
  `;

  const [getUsermfaStatus, { loading, error, data }] = useLazyQuery(
    GET_USER_MFASTATUS,
    {
      onCompleted: (queryData) => {
        // console.log(queryData);
        const queryDataM = queryData.getUser ?? {
          __typename: 'user',
          mfaStatus: false,
          username: user,
        };
        actions.clearAction();
        actions.updateAction(queryDataM);
        navigate('/step2', { replace: true });
      },
      // onError: (errorData) => {
      // console.log(`error :  ${errorData}`);
      // },
      fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    }
  );
  if (loading) return <p>Loading ...</p>;

  return (
    <div className="form">
      <h2>Step 1 of 3</h2>
      <label>
        Email:
        <input
          name="username"
          type="text"
          placeholder="Email"
          onChange={(e) => setUser(e.target.value)}
        />
      </label>

      <button
        type="button"
        onClick={() => getUsermfaStatus({ variables: { username: user } })}
      >
        Next
      </button>
    </div>
  );
};

export default Step1;
