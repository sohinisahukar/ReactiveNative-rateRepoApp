import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import Text from './Text';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';
import * as Yup from 'yup';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#d73a4a',
    marginBottom: 10,
  },
});

const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, 'Username must be at least 5 characters long')
      .max(30, 'Username must be at most 30 characters long')
      .required('Username is required'),
    password: Yup.string()
      .min(5, 'Password must be at least 5 characters long')
      .max(50, 'Password must be at most 50 characters long')
      .required('Password is required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required'),
  });

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await createUser({ variables: { user: { username, password } } });
      if (data.createUser) {
        await signIn({ username, password });
        navigate('/repositories');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            style={[styles.input, touched.username && errors.username && styles.inputError]}
            placeholder="Username"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
          />
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}
          <TextInput
            style={[styles.input, touched.password && errors.password && styles.inputError]}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <TextInput
            style={[styles.input, touched.passwordConfirmation && errors.passwordConfirmation && styles.inputError]}
            placeholder="Password confirmation"
            secureTextEntry
            onChangeText={handleChange('passwordConfirmation')}
            onBlur={handleBlur('passwordConfirmation')}
            value={values.passwordConfirmation}
          />
          {touched.passwordConfirmation && errors.passwordConfirmation && (
            <Text style={styles.errorText}>{errors.passwordConfirmation}</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;
