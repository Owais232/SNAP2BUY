import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import Axios
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../Navigation/Types';
type SignupScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Signup'>;

const SignUpScreen = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Animation setup
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleSignUp = async () => {
    // Validate email domain
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com)$/; // Regex for Gmail and Outlook
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please use a Gmail or Outlook email address.');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please ensure your passwords match.');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:5000/api/auth/signup', {
        name,
        email,
        password,
      });
      
      // Handle response (e.g., navigate to another screen or show success message)
      if (response.status === 201) {
        Alert.alert('Success', 'User registered successfully!');
        navigation.navigate('Login'); // Navigate to login after successful signup
      } else {
        Alert.alert('Sign Up Failed', 'An error occurred while signing up. Please try again.');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      Alert.alert('Sign Up Failed', 'An error occurred while signing up. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require('../Assets/bg.jpg')} // Replace with your image path
      style={styles.background}
    >
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Create your new account</Text>
        <TextInput
          style={styles.input}
          placeholder="Your name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#aaa"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Already Have an Account? 
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInText}> Sign In</Text>
          </TouchableOpacity>
        </Text>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#eff1f4',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footerText: {
    color: '#333',
    marginTop: 15,
  },
  signInText: {
    color: '#007bff',
  },
});

export default SignUpScreen;
