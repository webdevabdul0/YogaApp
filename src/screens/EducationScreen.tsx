import React, {useState, useEffect, useRef} from 'react';
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
import axios from 'axios';
import {EducationScreenProps} from '../navigation/StackParamList';

const EducationScreen: React.FC<EducationScreenProps> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [news, setNews] = useState<any[]>([]); // State to hold fetched news
  const inputRef = useRef<TextInput>(null);
  const [, setIsSearchActive] = useState(false);

  // Fetch news articles from the API
  const fetchNews = async (query: string) => {
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: query, // Search query
          apiKey: '8224b6169c724a1682e7116df282a487', // Replace with your API key
          searchIn: 'title,content', // Search in both title and content
          sortBy: 'relevancy', // Sort by relevancy
          pageSize: 10, // Number of articles per page
        },
      });
      setNews(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchNews('yoga-pose'); // Fetch yoga-related news when the component mounts
  }, []);

  const posts = [
    {
      id: 1,
      title: 'Introduction to MY YOGA Application',
      body: 'MY YOGA uses advanced technology to detect yoga postures and offer real-time feedback. The app helps improve your practice by guiding you through accurate body alignment and posture correction.',
      fullBody:
        'Incorporating technology into yoga, MY YOGA offers real-time feedback on your poses using a computer vision-based Yoga Posture Detection System. The system utilizes the  Mediapipe  library for accurate body keypoint detection, skeletonizing the human body to evaluate joint angles, body alignment, and movement patterns.\n\n' +
        'The Yoga Posture Detection System works by capturing images of the user performing various yoga poses using a camera or device. These images are then analyzed by the app, which uses the skeletonized data to assess the position of key body joints. The app evaluates whether your posture is correct and provides immediate feedback on how to adjust. Whether you’re performing basic poses like Downward Dog or more complex poses like Warrior II, MY YOGA offers real-time corrections to help you improve.\n\n' +
        ' How It Works: \n\n' +
        '1.  Pose Detection:  Using the Mediapipe library, the app captures and identifies the key points of your body as you move through different poses. This includes critical joints such as the elbows, shoulders, knees, and hips.\n' +
        '2.  Real-Time Feedback:  Once your pose is captured, MY YOGA immediately evaluates the alignment and provides specific feedback on how to adjust your posture. This can be anything from aligning your spine correctly to adjusting the angle of your hips.\n' +
        '3.  Corrective Suggestions:  If any misalignment is detected, the app gives specific suggestions on how to correct it. The feedback may include visual indicators or instructions to guide you into the correct position.\n\n' +
        'This system is designed to be used in a private setting, making it ideal for home practice. Whether you are just starting or looking to refine your skills, MY YOGA helps you practice with the guidance of a virtual instructor, without the need for a physical class.\n\n' +
        ' Benefits of Using MY YOGA: \n\n' +
        '-  Injury Prevention:  By receiving immediate feedback on your posture, you can prevent injuries caused by incorrect alignment.\n' +
        '-  Improved Flexibility:  The app helps you perform stretches correctly, improving your flexibility over time.\n' +
        '-  Personalized Guidance:  Every user is unique, and MY YOGA adapts its feedback based on your personal body movements.\n' +
        '-  Consistent Progress:  With real-time corrections, you can track your improvement and fine-tune your practice.\n\n' +
        'MY YOGA aims to not only guide you in each posture but also to provide a better understanding of the principles behind yoga poses, fostering a deeper connection with your practice.\n\n' +
        'Whether you are practicing yoga for the first time or you are an experienced practitioner, MY YOGA is your companion for a safer, more effective yoga experience.',
      tagline:
        'MY YOGA offers real-time feedback on yoga poses to improve posture, flexibility, and overall practice effectiveness.',
      imageSource: require('../assets/yoga-image-1.png'),
    },
    {
      id: 2,
      title: 'Best Yoga Poses for Beginners',
      body: 'If you are just starting yoga, these poses can help you build strength and flexibility over time.',
      fullBody:
        'Starting yoga can feel overwhelming, especially with so many different poses and styles. But you don’t need to worry about advanced poses right away. Begin with simple poses like Downward Dog, Child’s Pose, and Mountain Pose. These foundational poses are key to building strength, flexibility, and a solid mind-body connection.\n\n' +
        '•  Downward Dog : This pose helps lengthen the spine, stretch the hamstrings, and strengthen the arms and legs. It’s a great way to build core stability and improve overall flexibility.\n\n' +
        '•  Child’s Pose : A gentle resting pose that calms the mind, stretches the back, and promotes deep relaxation. It’s perfect for taking breaks between other poses.\n\n' +
        '•  Mountain Pose : While it looks simple, Mountain Pose helps you focus on posture and alignment. It teaches you to stand tall and engage your body properly.\n\n' +
        'As you grow more confident, you can add more challenging poses to your routine, such as Warrior Poses or Tree Pose. Yoga is about progress, not perfection. With regular practice, yoga will start feeling more natural, and you’ll begin to see improvements in both mind and body. Remember to listen to your body and take it one step at a time!',
      tagline:
        'Start with simple poses to build strength and flexibility over time.',
      imageSource: require('../assets/yoga-image-2.png'),
    },
    {
      id: 3,
      title: 'Yoga for Better Sleep',
      body: 'I tried some relaxation poses before bed, and my sleep quality improved significantly.',
      fullBody:
        'Quality sleep is vital for overall well-being, but it can be difficult to achieve with a busy mind. Incorporating yoga into my nighttime routine has drastically improved the quality of my sleep. I began practicing a few relaxation-focused poses to calm my mind and prepare my body for rest.\n\n' +
        '•  Forward Fold : This gentle stretch targets the lower back and hamstrings, encouraging relaxation by calming the nervous system. It also helps release tension built up throughout the day.\n\n' +
        '•  Legs Up the Wall : This restorative pose promotes circulation and relaxation by encouraging the flow of blood back to the heart. It’s incredibly calming and a great way to wind down before bed.\n\n' +
        '•  Reclining Butterfly Pose : With the soles of your feet together and knees out to the sides, this pose helps open up the hips and relaxes the lower body. It’s perfect for easing tension and calming the mind.\n\n' +
        'These poses help relieve stress and anxiety, promoting deep relaxation and preparing the body for sleep. The more I practiced these poses, the easier it became to fall asleep and stay asleep throughout the night. I wake up feeling more refreshed and energized every day, ready to start a new one.',
      tagline:
        'Relaxing yoga poses can improve sleep quality and help you rest better.',
      imageSource: require('../assets/yoga-image-3.png'),
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchNews(query); // Fetch filtered news based on search query
  };

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
            onChangeText={handleSearch} // Trigger search on text change
            onFocus={() => setIsSearchActive(true)}
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
                navigation.navigate('FeaturedContentScreen', {
                  Post: {
                    id: article.id, // Assuming you have an id in article
                    title: article.title,
                    body: article.body, // Assuming you have a short body in article
                    imageSource: article.imageSource, // Assuming image source is in article
                    fullBody: article.fullBody, // Full body content for the ContentScreen
                    tagline: article.tagline, // Assuming you have a tagline in article
                  },
                })
              }>
              <Image
                source={article.imageSource}
                style={styles.featuredImage}
              />
              <View style={styles.featuredTextContainer}>
                <Text style={styles.featuredTitle}>{article.title}</Text>

                <Text
                  style={styles.featuredDescription}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {article.tagline}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* News Section */}
      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Yoga Related Articles</Text>

        {news.length > 0 ? (
          news
            .filter(newsItem => newsItem.urlToImage) // Only display news with images
            .map((newsItem, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate('ContentScreen', {
                    Post: {
                      id: newsItem.id, // Ensure `id` exists in the newsItem
                      title: newsItem.title,
                      description: newsItem.description, // Short description
                      content: newsItem.content, // Full content of the article
                      publishedAt: newsItem.publishedAt, // Date of publication
                      author: newsItem.author, // Author of the article
                      urlToImage: newsItem.urlToImage, // Image URL
                      url: newsItem.url, // Full article URL
                      source: {
                        name: newsItem.source.name, // Source name (publisher)
                      },
                      imageSource: newsItem.urlToImage, // Image source URL (used for Image component)
                      fullBody: newsItem.content, // Full content of the article
                      tagline: newsItem.description, // Short tagline
                    },
                  })
                }>
                <View className="bg-white p-2 rounded-lg shadow-md mb-2">
                  {/* Container for image and text content */}
                  <View className="flex-col items-start">
                    {newsItem.urlToImage && (
                      <Image
                        source={{uri: newsItem.urlToImage}}
                        className="w-full h-32 rounded-lg mb-2" // Reduced image size
                      />
                    )}
                    <View className="flex-1">
                      <Text className="text-md mb-3 font-semibold text-gray-800">
                        {newsItem.title}
                      </Text>
                      <Text
                        className="text-sm text-gray-600"
                        numberOfLines={2}
                        ellipsizeMode="tail">
                        {newsItem.description}
                      </Text>

                      {/* Date Section */}
                      <View className="flex-row items-center mt-2">
                        <Icon
                          name="calendar-today"
                          size={16}
                          color="#ED706A"
                          className="mr-1"
                        />
                        <Text className="text-xs text-gray-600">
                          {new Date(
                            newsItem.publishedAt,
                          ).toLocaleDateString() || 'No date'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
        ) : (
          <Text>No news available.</Text>
        )}
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
    color: '#898989',
  },

  searchBarContainer: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    fontSize: 16,
    flex: 1,
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

  contentSection: {
    marginBottom: 30,
  },
  postCard: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  postContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  postImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
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
