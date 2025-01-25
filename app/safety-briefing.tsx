import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SafetyBriefing = () => {
    const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setExpandedSections((prev: number[]) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index) // Remove index if it exists
        : [...prev, index] // Add index if it doesn't exist
    );
  };

  const sections = [
    {
      title: 'General Safety Rules',
      content:
        'Learn the basic safety protocols, including fire safety, emergency exits, and equipment usage.',
    },
    {
      title: 'Behavioral Expectations',
      content:
        'Maintain discipline, follow site-specific rules, and avoid distractions during your visit.',
    },
    {
      title: 'Emergency Protocols',
      content:
        'Understand the emergency evacuation process and locate the first aid kits on-site.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="arrow-back" size={24} color="#000" />
        <Text style={styles.headerTitle}>Safety Briefing</Text>
        <Icon name="translate" size={24} color="#000" />
      </View>

      {/* Induction Video Placeholder */}
      <View style={styles.videoContainer}>
      <Image source={require('../assets/images/Vdio.png')} style={styles.videoPlaceholder} />

        <Text style={styles.videoText}>Induction Video</Text>
      </View>

      {/* Introduction */}
      <View style={styles.introContainer}>
        <Text style={styles.introHeader}>Introduction</Text>
        <Text style={styles.introText}>
          Welcome to Vedanta. We’re excited to have you visit our facility and
          gain insight into our operations. Your safety is our top priority.
          Before proceeding with the tour, it’s essential to familiarize
          yourself with our safety protocols. This briefing will guide you
          through key safety measures, including the use of protective
          equipment, restricted area guidelines, and emergency protocols.
        </Text>
        <TouchableOpacity>
          <Text style={styles.seeMoreText}>See More</Text>
        </TouchableOpacity>
      </View>

      {/* Key Points */}
      <View style={styles.keyPointsContainer}>
        <Text style={styles.keyPointsHeader}>Key Points</Text>
        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection(index)}
            >
              <View style={styles.sectionTitle}>
                <Icon name="check-circle" size={20} color="#1A5CFF" />
                <Text style={styles.sectionText}>{section.title}</Text>
              </View>
              <Icon
                name={expandedSections.includes(index) ? 'expand-less' : 'expand-more'}
                size={24}
                color="#000"
              />
            </TouchableOpacity>
            {expandedSections.includes(index) && (
              <Text style={styles.sectionContent}>{section.content}</Text>
            )}
          </View>
        ))}
      </View>

      {/* Start Button */}
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 64, 
    padding: 12, 
    gap: 8,
  },
  headerTitle: {
    fontFamily: 'DM_Sans',  // Correct font family
    fontSize: 20,           // Font size without 'px'
    fontWeight: '500',      // Font weight
    lineHeight: 28,         // Line height
    letterSpacing: 0.02,    // Letter spacing
    textAlign: 'center',    // Center alignment
    color: '#292927', 
  },
  videoContainer: {
    width: 329, // Fixed width
    height: 235, // Fixed height
    gap: 0,
    marginBottom: 16,
    alignItems: 'center',
  },
  videoPlaceholder: {
    width: 329, // For auto width, React Native uses 'auto' by default, so this line can be omitted
    height: 175, // Fixed height in pixels
    gap: 0, // Space between child components; only applies if using flex in React Native v0.71+
    borderRadius: 24, // Top-left corner radius
    
    backgroundColor: '#FFFFFF',
  },
  videoText: {
    width: 329,
    height: 60,
    fontFamily: 'DM_Sans', // Correct font family
    fontSize: 36,
    fontWeight: '500',
    lineHeight: 50.4,
    letterSpacing: 0.02,
    textAlign: 'left',
    color: '#292927',
    marginTop:9,
  },
  introContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  introHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    lineHeight: 22,
  },
  seeMoreText: {
    fontSize: 14,
    color: '#1A5CFF',
    fontWeight: '600',
  },
  keyPointsContainer: {
    marginBottom: 16,
  },
  keyPointsHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  section: {
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 1,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#000',
  },
  sectionContent: {
    padding: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginTop: 4,
    fontSize: 14,
    color: '#666666',
  },
  startButton: {
    backgroundColor: '#1A5CFF',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 16,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default SafetyBriefing;
