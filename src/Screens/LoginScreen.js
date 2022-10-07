import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import logo from '../../assets/images/logo.png';

import {Button, Image, Icon, Input} from 'react-native-elements';
import {blueColor, whitebg} from '../../assets/colors';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const emailRef = useRef(null);

  const [password, setPassword] = useState('');

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user) {
      navigation.replace('HomeScreen');
    }
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        });
        console.log(user);
      })
      .catch(error => {
        //@error —  auth/invalid-email Thrown if the email address is not valid.

        // @error — auth/user-disabled Thrown if the user corresponding to the given email has been disabled.

        // @error — auth/user-not-found Thrown if there is no user corresponding to the given email.

        // @error — auth/wrong-password Thrown if the password is invalid for the given email, or the account corresponding to the email does not have a password set.

        // @param email — The users email address.

        // @param password — The users password.

        console.log(error.message);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: whitebg,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={logo}
        style={{
          height: 200,
          width: 200,
          borderRadius: 10,
          marginBottom: 50,
        }}
      />
      <Input
        ref={emailRef}
        placeholder="Email"
        inputContainerStyle={styles.inputStyle}
        keyboardType="email-address"
        value={email}
        errorMessage={emailError}
        onChangeText={text => {
          setEmailError('');
          setEmail(text);
        }}
        leftIcon={<Icon name="mail-outline" type="ionicon" size={25} />}
      />
      <Input
        placeholder="Password"
        value={password}
        inputContainerStyle={styles.inputStyle}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        leftIcon={
          <Icon name="lock-outline" type="material-community" size={25} />
        }
      />
      <Button
        title="Login"
        buttonStyle={styles.buttonStyle}
        onPress={() => {
          // emailRef.current.shake();
          // setEmailError('hehehe');
          signIn();
        }}
      />
      <Button
        title="Register"
        buttonStyle={styles.buttonStyle}
        type="outline"
        onPress={() => {
          navigation.navigate('RegisterScreen');
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  buttonStyle: {width: 200, marginBottom: 10},
  inputStyle: {width: 300, alignSelf: 'center'},
});
