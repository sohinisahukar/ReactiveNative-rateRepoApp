// src/components/Text.jsx
import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textPrimary,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  subheading: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  bold: {
    fontWeight: theme.fontWeights.bold,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorSecondary: {
    color: theme.colors.textSecondary,
  },
});

const Text = ({ children, style, color, fontSize, fontWeight, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'primary' && styles.colorPrimary,
    color === 'secondary' && styles.colorSecondary,
    fontSize === 'subheading' && styles.subheading,
    fontWeight === 'bold' && styles.bold,
    style,
  ];

  return (
    <NativeText style={textStyle} {...props}>
      {children}
    </NativeText>
  );
};

export default Text;
