import React, {useReducer, useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const FIRST_INPUT_CHANGE = 'FIRST_INPUT_CHANGE';
const inputReducer = (state, action) => {
  switch (action.type) {
    case FIRST_INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
      };
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Inputs = props => {
  //console.log(props.initialValue)
  const [hideErrorText, getHideErrorText] = useState('');
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue.length > 0 ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false,
  });

  const {onInputChange, id} = props;
  //console.log('gia tri value: ', inputState.value);
  useEffect(() => {
    if (inputState.touched && !props.Login) {
      onInputChange(id, inputState.value, inputState.isValid);
    } else {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id, inputState.value]);

  const textChangeHandler = text => {
    //getHideErrorText(text);
    //console.log(text);
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    dispatch({type: INPUT_CHANGE, value: text, isValid: isValid});
  };

  const lostFocusHandler = () => {
    dispatch({type: INPUT_BLUR});
  };

  //console.log('gia tri props: ', props.initialValue);
  return (
    <>
      <TextInput
        {...props}
        onChangeText={text => textChangeHandler(text)}
        onBlur={lostFocusHandler}
        value={inputState.value}
      />

      {/* {hideErrorText.trim().length === 0 &&
        !inputState.isValid &&
        inputState.touched && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{props.errorText}</Text>
          </View>
        )} */}
    </>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    marginVertical: 5,
  },
});

export default Inputs;
