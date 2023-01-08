/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
import updateAction from './updateAction';

const Step2 = () => {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState(null);

  const { state } = useStateMachine({ updateAction });

  const [mfastatus, setMfastatus] = useState(state.mfaStatus);
  const [username, setUsername] = useState(state.username);
  const [errorMessage, setErrormessage] = useState('');

  const navigate = useNavigate();

  const USER_AUTH = gql`
    mutation UserAuth($username: String!, $password: String!, $code: Int) {
      UserAuth(username: $username, password: $password, code: $code) {
        token
        payload {
          username
          origIat
          exp
        }
        refreshExpiresIn
      }
    }
  `;

  const [UserAuth, { loading, error, data }] = useMutation(USER_AUTH, {
    onCompleted: (queryData) => {
      // console.log('querylog' + queryData);
      navigate('/step3', { replace: true });
    },
    onError: (errorData) => {
      setErrormessage(errorData.message);
      // console.log('error :' + errorData);
    },
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request
  });
  if (loading) return <p>Loading ...</p>;

  return (
    <div className="form">
      <h2>Step 2 of 3</h2>
      <label>
        Password:
        <input
          name="password"
          type="password"
          onBlur={(e) => setPassword(e.target.value)}
        />
      </label>

      {mfastatus && (
        <label>
          Code:
          <input
            name="code"
            type="text"
            placeholder="code"
            onBlur={(e) => setCode(parseInt(e.target.value, 10))}
          />
        </label>
      )}

      {errorMessage && <p>{errorMessage}</p>}

      <div className="container">
        <button type="button" onClick={() => navigate('/step1')}>
          Back
        </button>
        <button
          type="button"
          onClick={() =>
            UserAuth({
              variables: {
                username,
                password,
                code,
              },
            })
          }
        >
          Next
        </button>
        |
      </div>
    </div>
  );
};

export default Step2;
