import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import { CREATE_REVIEW } from '../graphql/mutations';

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
  ownerName: Yup.string().required('Repository owner name is required'),
  repositoryName: Yup.string().required('Repository name is required'),
  rating: Yup.number()
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: Yup.string(),
});

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: parseInt(rating, 10),
            text,
          },
        },
      });
      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (e) {
        console.log('Error:', e.message);
        console.log('Network Error:', e.networkError);
        console.log('GraphQL Errors:', e.graphQLErrors);
    }
  };

  return (
    <Formik
      initialValues={{ ownerName: '', repositoryName: '', rating: '', text: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            style={[styles.input, touched.ownerName && errors.ownerName && styles.inputError]}
            placeholder="Repository owner name"
            onChangeText={handleChange('ownerName')}
            onBlur={handleBlur('ownerName')}
            value={values.ownerName}
          />
          {touched.ownerName && errors.ownerName && (
            <Text style={styles.errorText}>{errors.ownerName}</Text>
          )}
          <TextInput
            style={[styles.input, touched.repositoryName && errors.repositoryName && styles.inputError]}
            placeholder="Repository name"
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
            value={values.repositoryName}
          />
          {touched.repositoryName && errors.repositoryName && (
            <Text style={styles.errorText}>{errors.repositoryName}</Text>
          )}
          <TextInput
            style={[styles.input, touched.rating && errors.rating && styles.inputError]}
            placeholder="Rating between 0 and 100"
            keyboardType="numeric"
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            value={values.rating}
          />
          {touched.rating && errors.rating && (
            <Text style={styles.errorText}>{errors.rating}</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Review"
            multiline
            onChangeText={handleChange('text')}
            onBlur={handleBlur('text')}
            value={values.text}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create a review</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;
