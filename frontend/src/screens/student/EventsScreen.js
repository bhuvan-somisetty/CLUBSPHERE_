import React, { useContext, useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { DataContext } from '../../context/DataContext';
import { ThemeContext } from '../../context/ThemeContext';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Toast from 'react-native-toast-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function EventsScreen({ navigation }) {
  const { events, clubs, joinEvent } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const [loadingId, setLoadingId] = useState(null);

  const styles = useMemo(() => getStyles(theme), [theme]);

  const getClubName = (clubId) => clubs.find(c => c.id === clubId)?.name || 'Unknown Club';

  const handleJoinInline = async (id) => {
    setLoadingId(id);
    const res = await joinEvent(id);
    setLoadingId(null);
    if (res.success) Toast.show({ type: 'success', text1: 'Success', text2: 'Joined the event!' });
  };

  const renderItem = ({ item }) => (
    <Card onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}>
      <View style={styles.headerRow}>
        <Text style={[theme.typography.h3, { flex: 1, marginRight: 8 }]} numberOfLines={1}>{item.title}</Text>
        <Badge label={item.joined ? "Joined" : "Upcoming"} status={item.joined ? "success" : "primary"} />
      </View>
      <Text style={[theme.typography.caption, { color: theme.colors.primary, marginBottom: 16 }]}>Hosted by {getClubName(item.clubId)}</Text>
      
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
           <MaterialCommunityIcons name="calendar" size={16} color={theme.colors.textSecondary} />
           <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailItem}>
           <MaterialCommunityIcons name="clock-outline" size={16} color={theme.colors.textSecondary} />
           <Text style={styles.detailText}>{item.time}</Text>
        </View>
      </View>
      
      <View style={styles.venueRow}>
        <MaterialCommunityIcons name="map-marker-outline" size={16} color={theme.colors.textSecondary} />
        <Text style={styles.detailText}>{item.venue}</Text>
      </View>

      <View style={styles.actionContainer}>
        {item.joined ? (
          <View style={styles.joinedBadge}>
            <MaterialCommunityIcons name="check-circle" size={18} color={theme.colors.success} />
            <Text style={styles.joinedText}>You're Going</Text>
          </View>
        ) : (
          <Button 
            title="Join Event" 
            onPress={() => handleJoinInline(item.id)} 
            loading={loadingId === item.id} 
            icon="ticket-confirmation"
          />
        )}
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={<Text style={[theme.typography.h2, { marginBottom: 16 }]}>Discover Events</Text>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  detailsRow: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  venueRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6, 
    backgroundColor: theme.colors.background, 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 16 
  },
  detailText: { ...theme.typography.small, color: theme.colors.textSecondary },
  actionContainer: { marginTop: 4 },
  joinedBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 12, 
    paddingHorizontal: 16, 
    backgroundColor: theme.colors.successLight, 
    borderRadius: 10, 
    gap: 6 
  },
  joinedText: { ...theme.typography.body, color: theme.colors.success, fontWeight: '600' }
});
