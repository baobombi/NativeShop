import React, { useReducer, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';


const inputReducer = (state, action) => {

  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

const Input = props => {

  const [hideErrorText, getHideErrorText] = useState('')


  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched && !props.Login) {
      onInputChange(id, inputState.value, inputState.isValid);
    } else {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
    getHideErrorText(text)
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };
  //console.log(text)
  return (
    <View style={styles.formControl}>
      {!props.Login && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        {...props}
        style={!props.Login ? styles.input : props.style}
        value={inputState.value}
        onChangeText={text => textChangeHandler(text)}
        onBlur={lostFocusHandler}
      />

      {hideErrorText.trim().length === 0 && !inputState.isValid && inputState.touched &&
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({

  errorContainer: {
    marginVertical: 5,

  },

  errorText: {

    fontSize: 14,
    color: 'red'
  },

  formControl: {
    width: '100%'
  },
  label: {
    //fontFamily: 'open-sans-bold',
    marginVertical: 8,
    fontSize: 30
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});

export default Input;