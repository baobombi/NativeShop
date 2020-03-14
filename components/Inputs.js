import React, {useReducer, useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
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
    getHideErrorText(text);
    
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

  return (
    <>
      <TextInput
        {...props}
        onChangeText={text => textChangeHandler(text)}
        onBlur={lostFocusHandler}
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
  textInput: {
    paddingLeft: 10,
    flex: 1,
  },

  errorContainer: {
    marginVertical: 5,
  },
});

export default Inputs;
