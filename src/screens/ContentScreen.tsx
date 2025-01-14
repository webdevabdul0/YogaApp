import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackParamList} from '../navigation/StackParamList'; // Adjust path if necessary

// Define the route prop for ContentScreen
type ContentScreenRouteProp = RouteProp<StackParamList, 'ContentScreen'>;

interface ContentScreenProps {
  route: ContentScreenRouteProp;
}

const ContentScreen: React.FC<ContentScreenProps> = ({route}) => {
  const {Post} = route.params; // Destructure the Post object from params

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>{Post.title}</Text>

        {/* Image */}
        <Image
          source={Post.imageSource}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Full Body */}
        <Text style={styles.body}>{Post.fullBody}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    margin: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    lineHeight: 38,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 20,
  },
  body: {
    fontSize: 18,
    color: '#555',
    lineHeight: 26,
    textAlign: 'justify',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
});

export default ContentScreen;
