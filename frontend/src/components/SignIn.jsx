// src/components/SignIn.jsx
import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Text from './Text';

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
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      alignSelf: 'center',
    },
  });

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Sign In</Text>
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
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
