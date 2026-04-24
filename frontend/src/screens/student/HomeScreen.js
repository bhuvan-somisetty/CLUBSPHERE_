import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import { ThemeContext } from '../../context/ThemeContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const { clubs, events, notifications } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  
  const styles = useMemo(() => getStyles(theme), [theme]);

  const joinedClubs = clubs.filter(c => c.joined);
  const attendedEvents = events.filter(e => e.joined);
  const upcomingEvents = events.filter(e => !e.joined).slice(0, 3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      
      {/* Welcome Header */}
      <LinearGradient colors={[theme.colors.primary, '#3730A3']} style={styles.gradientHeader}>
        <View style={styles.headerTop}>
          <View style={styles.welcomeBox}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.name?.[0] || 'S'}</Text>
            </View>
            <View>
              <Text style={styles.levelText}>Level {user?.level || 1} Student</Text>
              <Text style={styles.welcomeName}>{user?.name}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bellIcon}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#FFFFFF" />
            {notifications.length > 0 && <View style={styles.bellBadge} />}
          </TouchableOpacity>
        </View>
        <ProgressBar current={user?.xp || 0} max={1000} inverted={true} />
      </LinearGradient>

      <View style={styles.contentContainer}>
        {/* Stats Section */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={[theme.typography.h2, { color: theme.colors.primary }]}>{joinedClubs.length}</Text>
            <Text style={theme.typography.caption}>Clubs Joined</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={[theme.typography.h2, { color: theme.colors.success }]}>{attendedEvents.length}</Text>
            <Text style={theme.typography.caption}>Events Attended</Text>
          </Card>
        </View>

        {/* Upcoming Events Horizontal Scroll */}
        <View style={styles.section}>
          <Text style={[theme.typography.h3, styles.sectionTitle]}>Upcoming Events</Text>
          <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={upcomingEvents}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.eventsList}
            renderItem={({item}) => (
              <Card style={styles.eventCard}>
                <Text style={theme.typography.h3} numberOfLines={1}>{item.title}</Text>
                <View style={styles.eventDateRow}>
                  <MaterialCommunityIcons name="calendar" size={14} color={theme.colors.textSecondary} />
                  <Text style={theme.typography.small}> {item.date}</Text>
                </View>
                <Button 
                  title="View Details" 
                  variant="secondary"
                  onPress={() => navigation.navigate('Events', { screen: 'EventDetails', params: { eventId: item.id }})} 
                />
              </Card>
            )}
            ListEmptyComponent={<Text style={theme.typography.body}>No upcoming events available.</Text>}
          />
        </View>

        {/* Notifications Vertical List */}
        <View style={styles.section}>
          <Text style={[theme.typography.h3, styles.sectionTitle]}>Recent Notifications</Text>
          {notifications.map(n => (
            <Card key={n.id} style={styles.notificationItem}>
              <View style={styles.notifIcon}>
                <MaterialCommunityIcons name="bell-ring" size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.notifContent}>
                <Text style={theme.typography.body} numberOfLines={1}>{n.title}</Text>
                <Text style={theme.typography.small}>{n.message}</Text>
              </View>
            </Card>
          ))}
        </View>
      </View>

    </ScrollView>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { paddingBottom: 64 },
  gradientHeader: {
    padding: 24,
    paddingTop: 48,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...theme.shadows.medium
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16
  },
  welcomeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.primary
  },
  levelText: {
    ...theme.typography.caption,
    color: 'rgba(255,255,255,0.8)'
  },
  welcomeName: {
    ...theme.typography.h2,
    color: '#FFFFFF',
    marginTop: 2
  },
  bellIcon: {
    padding: 4
  },
  bellBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error
  },
  contentContainer: {
    paddingTop: 24,
    gap: 24
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 16
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 0
  },
  section: {
    paddingHorizontal: 0
  },
  sectionTitle: {
    marginBottom: 12,
    paddingHorizontal: 16
  },
  eventsList: {
    paddingHorizontal: 16,
    gap: 16
  },
  eventCard: {
    width: 240,
    marginBottom: 0
  },
  eventDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginHorizontal: 16,
    marginBottom: 12
  },
  notifIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notifContent: {
    flex: 1
  }
});
