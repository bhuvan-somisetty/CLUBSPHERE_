import React, { useContext, useState, useMemo } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ScrollView, Modal, Alert, Platform } from 'react-native';
import { DataContext } from '../../context/DataContext';
import { ThemeContext } from '../../context/ThemeContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Toast from 'react-native-toast-message';

export default function AdminEventsScreen({ navigation }) {
  const { events, createEvent, editEvent, deleteEvent, clubs } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  
  const styles = useMemo(() => getStyles(theme), [theme]);

  // Form State
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [clubId, setClubId] = useState(clubs.length > 0 ? clubs[0].id : '');
  const [loading, setLoading] = useState(false);

  const openCreateModal = () => {
    setEditingEvent(null);
    setTitle(''); setDesc(''); setDate(''); setTime(''); setVenue('');
    setModalVisible(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDesc(event.description);
    setDate(event.date);
    setTime(event.time);
    setVenue(event.venue);
    setClubId(event.clubId || (clubs.length > 0 ? clubs[0].id : ''));
    setModalVisible(true);
  };

  const handleDelete = (eventId) => {
    const performDelete = async () => {
      const res = await deleteEvent(eventId);
      if (res.success) Toast.show({ type: 'success', text1: 'Event deleted' });
      else Toast.show({ type: 'error', text1: 'Deletion failed' });
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to delete this event?')) {
        performDelete();
      }
    } else {
      Alert.alert('Delete Event', 'Are you sure you want to delete this event?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: performDelete }
      ]);
    }
  };

  const handleSave = async () => {
    if (!title || !desc || !date) {
        Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Please provide all details' });
        return;
    }
    setLoading(true);
    let res;
    if (editingEvent) {
      res = await editEvent(editingEvent.id, { ...editingEvent, title, description: desc, date, time, venue, clubId });
    } else {
      res = await createEvent({ title, description: desc, date, time, venue, maxParticipants: 100, clubId });
    }
    setLoading(false);
    
    if (res.success) {
      setModalVisible(false);
      setTitle(''); setDesc(''); setDate(''); setTime(''); setVenue(''); setEditingEvent(null);
      Toast.show({ type: 'success', text1: editingEvent ? 'Event Updated' : 'Event Created' });
    } else {
        Toast.show({ type: 'error', text1: editingEvent ? 'Failed to update' : 'Failed to create event' });
    }
  };

  const renderItem = ({ item }) => (
    <Card>
      <View style={styles.cardHeader}>
        <Text style={[theme.typography.h3, { color: theme.colors.text }]} numberOfLines={1}>{item.title}</Text>
        <Badge label={item.date} status="primary" />
      </View>
      <Text style={[theme.typography.caption, { color: theme.colors.textSecondary, marginBottom: 8 }]}>📍 {item.venue} | 🕒 {item.time}</Text>
      <Text style={[theme.typography.body, { color: theme.colors.textSecondary }]} numberOfLines={2}>{item.description}</Text>
      
      <View style={styles.cardActionsContainer}>
        <Button title="Attendance" size="small" variant="outline" onPress={() => navigation.navigate('EventAttendance', { eventId: item.id })} />
        <View style={styles.cardActions}>
          <Button title="Edit" variant="outline" size="small" onPress={() => openEditModal(item)} />
          <Button title="Delete" variant="danger" size="small" onPress={() => handleDelete(item.id)} />
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={events} 
        keyExtractor={c => c.id} 
        renderItem={renderItem} 
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={styles.fabContainer}>
         <Button title="Create Event" onPress={openCreateModal} icon="plus" style={styles.fabButton} />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
             <Text style={[theme.typography.h2, { marginBottom: 24, color: theme.colors.text }]}>{editingEvent ? 'Edit Event' : 'Schedule Event'}</Text>
             
             <TextInput 
                style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]} 
                placeholder="Event Title" 
                placeholderTextColor={theme.colors.inactive}
                value={title} 
                onChangeText={setTitle} 
             />
             <TextInput 
                style={[styles.input, { height: 100, backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]} 
                placeholder="Event Description..." 
                placeholderTextColor={theme.colors.inactive}
                value={desc} 
                onChangeText={setDesc} 
                multiline 
             />
             <View style={styles.rowInputs}>
                <TextInput 
                   style={[styles.input, {flex: 1, backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text}]} 
                   placeholder="Date (MM-DD)" 
                   placeholderTextColor={theme.colors.inactive}
                   value={date} 
                   onChangeText={setDate} 
                />
                <TextInput 
                   style={[styles.input, {flex: 1, backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text}]} 
                   placeholder="Time (10AM)" 
                   placeholderTextColor={theme.colors.inactive}
                   value={time} 
                   onChangeText={setTime} 
                />
             </View>
             <TextInput 
                style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]} 
                placeholder="Venue or Virtual Link" 
                placeholderTextColor={theme.colors.inactive}
                value={venue} 
                onChangeText={setVenue} 
             />
             
             <TextInput 
                style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.inactive }]} 
                placeholder="Club ID Selection" 
                value={clubId} 
                onChangeText={setClubId} 
                editable={false} 
             />
             <Text style={[theme.typography.caption, { color: theme.colors.textSecondary, marginBottom: 16 }]}>Mocked defaults to your admin club</Text>

             <View style={styles.modalActions}>
               <Button title="Cancel" variant="ghost" style={{flex: 1}} onPress={() => { setModalVisible(false); setEditingEvent(null); }} />
               <Button title={editingEvent ? 'Save Event' : 'Create Event'} style={{flex: 1}} onPress={handleSave} loading={loading} />
             </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  listContent: { padding: 16, paddingBottom: 100 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardActionsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 },
  cardActions: { flexDirection: 'row', gap: 8 },
  fabContainer: { position: 'absolute', bottom: 24, right: 24, zIndex: 10 },
  fabButton: { borderRadius: 100, paddingHorizontal: 24, paddingVertical: 14 },
  modalBg: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 },
  modalContent: { backgroundColor: theme.colors.surface, padding: 24, paddingTop: 32, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  input: { borderWidth: 1, padding: 16, borderRadius: 10, fontSize: 15, marginBottom: 16 },
  rowInputs: { flexDirection: 'row', gap: 16 },
  modalActions: { flexDirection: 'row', gap: 16, marginTop: 8 }
});
