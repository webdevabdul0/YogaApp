import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const PrivacyPolicyScreen: React.FC = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SettingsScreen')}
        className="absolute top-8 left-2 bg-black/10 p-3 rounded-lg z-20">
        <Icon name="chevron-left" size={15} color="white" />
      </TouchableOpacity>
      <Text style={styles.title} className="mt-8">
        Privacy Policy
      </Text>
      <Text style={styles.sectionTitle} className="text-lg text-gray-700 ">
        Introduction
      </Text>
      <Text style={styles.text}>
        We value your privacy and are committed to protecting your personal
        information. This Privacy Policy explains how we collect, use, and
        disclose your data when you use our services.
      </Text>

      <Text style={styles.sectionTitle} className="text-lg text-gray-700 ">
        Information Collection
      </Text>
      <Text style={styles.text}>
        We collect information when you use our app, including but not limited
        to personal details, usage data, and device information. This data is
        collected to enhance your experience and improve the app.
      </Text>

      <Text style={styles.sectionTitle} className="text-lg text-gray-700 ">
        How We Use Your Information
      </Text>
      <Text style={styles.text}>
        We use the information collected to provide, personalize, and improve
        our services. Your data may also be used to communicate with you,
        respond to your inquiries, and send promotional materials.
      </Text>

      <Text style={styles.sectionTitle} className="text-lg text-gray-700 ">
        Data Security
      </Text>
      <Text style={styles.text}>
        We take reasonable steps to protect your personal data from unauthorized
        access, alteration, disclosure, or destruction. However, no method of
        transmission over the internet or electronic storage is 100% secure.
      </Text>

      <Text style={styles.sectionTitle} className="text-lg text-gray-700 ">
        Third-Party Services
      </Text>
      <Text style={styles.text}>
        Our app may contain links to third-party websites and services that are
        not operated by us. We are not responsible for the privacy practices or
        the content of these third-party sites.
      </Text>

      <Text style={styles.sectionTitle} className="text-lg text-gray-700 ">
        Your Choices
      </Text>
      <Text style={styles.text}>
        You have the right to access, update, or delete your personal
        information at any time. You may also opt-out of certain communications.
      </Text>

      <Text style={styles.sectionTitle} className="text-lg text-gray-700 ">
        Changes to This Policy
      </Text>
      <Text style={styles.text}>
        We may update our Privacy Policy from time to time. Any changes will be
        posted on this page, and we will notify you of significant updates.
      </Text>

      <Text style={styles.sectionTitle} className="text-lg text-gray-700 ">
        Contact Us
      </Text>
      <Text style={styles.text} className="pb-12">
        If you have any questions or concerns about this Privacy Policy, feel
        free to contact us at support@example.com.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#EB544D',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'justify',
  },
});

export default PrivacyPolicyScreen;
