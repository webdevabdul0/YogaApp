import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {EducationScreenProps} from '../navigation/StackParamList';

const EducationScreen: React.FC<EducationScreenProps> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<TextInput>(null);
  const [, setIsSearchActive] = useState(false); // Track if search is active
  const posts = [
    {
      id: 1,
      title: 'How Yoga Changed My Life',
      body: 'Yoga has helped me reduce stress and improve flexibility. I started with simple poses every morning.',
      fullBody:
        'I was going through a stressful phase in my life and found it hard to stay focused and positive. After incorporating yoga into my daily routine, I started noticing a difference in how I felt both mentally and physically. The breathing exercises helped calm my mind, and the stretching increased my flexibility, making me feel more energized throughout the day. Yoga has truly transformed my life, and I’m now more present and at peace with myself.',
      tagline:
        'Yoga has transformed my life by reducing stress and improving flexibility.',
      imageSource: require('../assets/yoga-image-1.png'),
    },
    {
      id: 2,
      title: 'Best Yoga Poses for Beginners',
      body: 'If you are just starting yoga, these poses can help you build strength and flexibility over time.',
      fullBody:
        'Starting yoga can feel overwhelming, especially with so many different poses and styles. But you don’t need to worry about advanced poses right away. Begin with simple poses like Downward Dog, Child’s Pose, and Mountain Pose. These help you build foundational strength and flexibility. As you grow more confident, you can add more challenging poses to your routine. With regular practice, yoga will start feeling more natural, and you’ll begin to see improvement in both mind and body.',
      tagline:
        'Start with simple poses to build strength and flexibility over time.',
      imageSource: require('../assets/yoga-image-2.png'),
    },
    {
      id: 3,
      title: 'Yoga for Better Sleep',
      body: 'I tried some relaxation poses before bed, and my sleep quality improved significantly.',
      fullBody:
        'Quality sleep is vital for overall well-being, but it can be difficult to achieve with a busy mind. I started incorporating some relaxation-focused yoga poses like Forward Fold and Legs Up the Wall into my nighttime routine, and the results have been amazing. These poses calm the nervous system and promote relaxation, which makes it easier to fall asleep and stay asleep through the night. Now, I wake up feeling refreshed and energized every day.',
      tagline:
        'Relaxing yoga poses can improve sleep quality and help you rest better.',
      imageSource: require('../assets/yoga-image-3.png'),
    },
    {
      id: 4,
      title: 'Yoga for Core Strength',
      body: 'Engage your core and build strength with these targeted poses.',
      fullBody:
        'Having a strong core is essential for balance, stability, and overall health. Yoga offers a variety of poses that target the core muscles, such as Boat Pose, Plank Pose, and Dolphin Pose. These poses engage your abdominal muscles and help build strength over time. Regular practice will not only improve your core strength but also enhance your posture, which can reduce back pain and improve your overall sense of well-being.',
      tagline:
        'Build a stronger core and improve your stability with yoga poses.',
      imageSource: require('../assets/yoga-image-3.png'),
    },
    {
      id: 5,
      title: 'Yoga for Anxiety Relief',
      body: 'These poses help calm the mind and alleviate feelings of anxiety.',
      fullBody:
        'Anxiety can be overwhelming, but yoga offers a powerful tool to manage it. Certain poses, like Child’s Pose, Cat-Cow, and Savasana, can activate the parasympathetic nervous system, helping the body relax and reducing feelings of anxiety. Deep breathing, combined with these poses, can ground you in the present moment and calm the mind. Over time, yoga can help you develop a stronger sense of self-awareness, making it easier to manage anxious thoughts when they arise.',
      tagline: 'Calm your mind and reduce anxiety with relaxing yoga poses.',
      imageSource: require('../assets/yoga-image-2.png'),
    },
    {
      id: 6,
      title: 'How to Build a Daily Yoga Routine',
      body: 'Consistency is key! Learn how to structure a daily practice to see maximum benefits.',
      fullBody:
        'Building a consistent yoga routine doesn’t have to be intimidating. Start by dedicating just 15-20 minutes a day to practice. Focus on a few key poses that target different areas of the body—such as Sun Salutations for warming up, Warrior poses for strength, and Forward Fold for flexibility. Over time, you can increase the duration and variety of your practice. The key is consistency, so even if you have a busy schedule, try to set aside time each day for yoga. Soon, it will become a natural part of your day.',
      tagline:
        'Dedicate just 15-20 minutes a day to see lasting benefits from yoga.',
      imageSource: require('../assets/yoga-image-1.png'),
    },
    {
      id: 7,
      title: 'Yoga Poses for Better Posture',
      body: 'Work on your alignment and posture with these simple yoga poses.',
      fullBody:
        'Good posture is not only about standing up straight—it’s about alignment and balance in the body. Yoga offers several poses that help improve posture by lengthening the spine and strengthening the muscles that support it. Poses like Mountain Pose, Cat-Cow, and Cobra Pose help promote good spinal alignment, which can reduce neck, shoulder, and back pain. By incorporating these poses into your routine, you can improve your posture and feel more confident and grounded.',
      tagline: 'Improve posture and reduce pain with yoga poses for alignment.',
      imageSource: require('../assets/yoga-image-3.png'),
    },
    {
      id: 8,
      title: 'The Benefits of Sun Salutations',
      body: 'A great warm-up sequence to start your yoga practice and boost energy.',
      fullBody:
        'Sun Salutations, or Surya Namaskar, is a sequence of poses that flows together to warm up the body and boost energy. This sequence stretches and strengthens nearly every muscle group, making it an excellent way to start your yoga practice. It also helps improve flexibility, circulation, and mental focus. As you move through the sequence, focus on syncing your breath with the movements to create a meditative, mindful experience. Over time, regular Sun Salutations can enhance your overall yoga practice.',
      tagline:
        'Sun Salutations warm up the body, improve flexibility, and boost energy.',
      imageSource: require('../assets/yoga-image-2.png'),
    },
    {
      id: 9,
      title: 'Yoga for Mental Clarity',
      body: 'Clear your mind and sharpen your focus with these yoga techniques.',
      fullBody:
        'Yoga is not just about physical poses—it’s also a powerful tool for mental clarity. Poses like Tree Pose and Warrior III help improve focus, balance, and concentration. In addition, incorporating meditation and pranayama (breathing techniques) into your practice can further enhance mental clarity by calming the mind and reducing mental clutter. A regular yoga practice trains the mind to stay present, which can sharpen focus and improve decision-making in daily life.',
      tagline:
        'Sharpen your focus and clear your mind with yoga and meditation.',
      imageSource: require('../assets/yoga-image-1.png'),
    },
    {
      id: 10,
      title: 'Partner Yoga for Connection',
      body: 'Explore connection and communication through partner yoga poses.',
      fullBody:
        'Partner yoga is a fun and intimate way to deepen your yoga practice with someone else. It encourages communication, trust, and cooperation as you move through poses together. Partner poses such as Double Downward Dog and Partner Forward Fold allow you to support each other while building strength and flexibility. It’s also a great way to bond with a friend, partner, or family member, as it fosters connection and mutual support.',
      tagline: 'Build trust and connection through partner yoga poses.',
      imageSource: require('../assets/yoga-image-3.png'),
    },
    {
      id: 11,
      title: 'Yoga for Runners',
      body: 'Enhance flexibility and prevent injury with these yoga poses for runners.',
      fullBody:
        'Runners often experience tight muscles and joint strain from repetitive motion. Yoga offers an effective way to prevent injury and enhance flexibility. Poses like Downward Dog, Pigeon Pose, and Forward Fold stretch and lengthen the muscles, relieving tightness and improving mobility. Incorporating yoga into your running routine can help prevent common injuries like IT band syndrome and runner’s knee, while also promoting faster recovery after long runs.',
      tagline:
        'Stretch, recover, and prevent injury with yoga poses for runners.',
      imageSource: require('../assets/yoga-image-2.png'),
    },
    {
      id: 12,
      title: 'Yoga for Strength and Toning',
      body: 'Build muscle tone and increase strength with these yoga poses.',
      fullBody:
        'Yoga can be a full-body workout, helping to build muscle strength and tone the body. Poses like Plank, Chaturanga, and Warrior I engage the muscles, helping to increase strength over time. The beauty of yoga for strength training is that it uses your own body weight to build muscle, so no equipment is required. Regular practice helps tone the arms, legs, and core while also improving flexibility and posture.',
      tagline: 'Build muscle and tone your body with yoga poses.',
      imageSource: require('../assets/yoga-image-1.png'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          My<Text style={styles.headerTextRed}>Yoga</Text>
        </Text>

        <Icon
          name="notifications"
          size={24}
          color="#333"
          style={styles.notificationIcon}
        />
      </View>

      {/* Search Bar */}
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <View style={styles.searchBarContainer}>
          <Icon
            name="search"
            size={24}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            ref={inputRef}
            placeholder="Search Yoga Topics"
            value={searchQuery}
            onChangeText={setSearchQuery} // Update the search query
            onFocus={() => setIsSearchActive(true)} // Set search to active when focused
            onBlur={() => setIsSearchActive(false)}
            style={styles.searchInput}
          />
        </View>
      </TouchableWithoutFeedback>

      {/* Featured Articles Section */}
      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Featured Content</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredScrollContainer}>
          {posts.map((article, index) => (
            <TouchableOpacity
              key={index}
              style={styles.featuredCard}
              onPress={() =>
                navigation.navigate('ContentScreen', {Post: article})
              }>
              <Image
                source={article.imageSource}
                style={styles.featuredImage}
              />
              <View style={styles.featuredTextContainer}>
                <Text style={styles.featuredTitle}>{article.title}</Text>
                <Text style={styles.featuredDescription}>
                  {article.tagline}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Yoga Related Articles</Text>
        {posts.map(post => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postContent}>
              <Image source={post.imageSource} style={styles.postImage} />
              <View style={styles.postTextContainer}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postBody}>{post.tagline}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerTextRed: {
    color: '#ED706A', // Red color for "Yoga"
  },
  notificationIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginTop: 5,
    color: '#898989', // Light gray color
  },

  searchBarContainer: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 0,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    fontSize: 16,
    flex: 1, // Ensure it takes the remaining space
  },
  featuredSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  featuredScrollContainer: {
    flexDirection: 'row',
  },
  featuredCard: {
    width: 250,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  featuredImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  featuredTextContainer: {
    padding: 10,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  featuredDescription: {
    fontSize: 13,
    color: '#848484',
  },

  // New Post Style with Image on the left
  contentSection: {
    marginBottom: 30,
  },
  postCard: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#999', // Light gray shadow color for iOS
    shadowOffset: {width: 0, height: 4}, // Slightly softer vertical spread
    shadowOpacity: 0.1, // Soft opacity for iOS
    shadowRadius: 10, // Smaller radius for a more defined shadow on iOS
    elevation: 5, // Lower elevation to make shadow less prominent on Android
  },

  postContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  postImage: {
    width: 80,
    height: 80,
    borderRadius: 10, // Rounded image
    marginRight: 15,
  },
  postTextContainer: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  postBody: {
    fontSize: 13,
    color: '#555',
  },
  commentSection: {
    marginTop: 5,
  },
  commentText: {
    fontSize: 14,
    color: '#007BFF',
  },
});

export default EducationScreen;
