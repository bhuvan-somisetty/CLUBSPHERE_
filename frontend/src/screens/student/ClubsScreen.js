import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { DataContext } from '../../context/DataContext';
import { ThemeContext } from '../../context/ThemeContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Toast from 'react-native-toast-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ClubsScreen() {
  const { clubs, joinClub, leaveClub } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const [loadingId, setLoadingId] = useState(null);

  const handleJoin = async (id) => {
    setLoadingId(id);
    const res = await joinClub(id);
    setLoadingId(null);
    if (res.success) Toast.show({ type: 'success', text1: 'Joined!', text2: 'Successfully joined the club.' });
  };

  const handleLeave = (id) => {
    Alert.alert('Leave Club', 'Are you sure you want to leave this club?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Leave', style: 'destructive', onPress: async () => {
          setLoadingId(id);
          const res = await leaveClub(id);
          setLoadingId(null);
          if (res.success) Toast.show({ type: 'success', text1: 'Left club' });
      } }
    ]);
  };

  const getIconForClub = (name, iconProp) => {
    if (iconProp) return iconProp;
    const l = name.toLowerCase();
    if (l.includes('code') || l.includes('tech')) return 'laptop-code';
    if (l.includes('media') || l.includes('photo')) return 'camera-alt';
    if (l.includes('robot')) return 'robot';
    if (l.includes('art')) return 'palette';
    if (l.includes('sport')) return 'trophy';
    if (l.includes('entre')) return 'lightbulb';
    if (l.includes('student')) return 'users';
    if (l.includes('event')) return 'star';
    return 'account-group';
  };

  const renderItem = ({ item }) => (
    <Card>
      {/* Header with icon and title */}
      <View style={styles.cardHeader}>
        <View style={[styles.iconBox, { backgroundColor: theme.colors.primaryLight }]}>
          <MaterialCommunityIcons 
            name={getIconForClub(item.name, item.icon)} 
            size={24} 
            color={theme.colors.primary} 
          />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.clubName, { color: theme.colors.text }]}>{item.name}</Text>
          <View style={styles.memberBadge}>
            <MaterialCommunityIcons name="account-multiple" size={14} color={theme.colors.textSecondary} />
            <Text style={[styles.memberCount, { color: theme.colors.textSecondary }]}>
              {item.memberCount} members
            </Text>
          </View>
        </View>
      </View>

      {/* Description */}
      <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
        {item.description}
      </Text>

      {/* Action Button */}
      <View style={styles.buttonContainer}>
        {item.joined ? (
          <View style={{flexDirection: 'row', gap: 12}}>
            <View style={[styles.joinedBadge, { backgroundColor: theme.colors.successLight, flex: 1 }]}>
              <MaterialCommunityIcons name="check-circle" size={18} color={theme.colors.success} />
              <Text style={[styles.joinedText, { color: theme.colors.success }]}>Joined</Text>
            </View>
            <Button 
              title="Leave" 
              variant="outline" 
              onPress={() => handleLeave(item.id)} 
              loading={loadingId === item.id}
              style={{ flex: 1 }}
            />
          </View>
        ) : (
          <Button 
            title="Join Club" 
            onPress={() => handleJoin(item.id)} 
            loading={loadingId === item.id} 
            icon="account-plus"
          />
        )}
      </View>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={clubs}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <Text style={[styles.header, { color: theme.colors.text, marginBottom: 16 }]}>
            Discover Clubs
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBox: { 
    width: 48, 
    height: 48, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 16,
  },
  headerText: { 
    flex: 1, 
    justifyContent: 'center',
  },
  clubName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  memberCount: {
    fontSize: 13,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 4,
  },
  joinedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 6,
  },
  joinedText: {
    fontSize: 15,
    fontWeight: '600',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
  },
});
