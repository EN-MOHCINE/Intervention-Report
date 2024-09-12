// import Signtaure from '@/components/signtaure';
import React, { useState } from 'react';  
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const InterventionForm = () => {
  const [clientName, setClientName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [interventionObject, setInterventionObject] = useState('');
  const [interventionType, setInterventionType] = useState('');
  const [equipment, setEquipment] = useState('');
  const [duration, setDuration] = useState('');
  const [observations, setObservations] = useState('');
  const [cost, setCost] = useState('');

  const handleSubmit = () => {
    // Logic for handling form submission
    console.log('Form submitted');
  };

  const handleClearClient = () => {
    setClientName('');
    setTelephone('');
    setDate('');
  };

  const handleClearTime = () => {
    setStartTime('');
    setEndTime('');
    setLocation('');
  };

  const handleClearIntervention = () => {
    setInterventionObject('');
    setInterventionType('');
    setEquipment('');
    setDuration('');
    setObservations('');
    setCost('');
  };

  return (<>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Intervention Report</Text>
      
      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Client Information</Text>
          <Button title="Clear" onPress={handleClearClient} color="#ff3f00" />
        </View>
        <TextInput
          style={styles.bigInput}
          placeholder="Client Name"
          value={clientName}
          onChangeText={setClientName}
        />
        <View style={styles.doubleInputContainer}>
          <TextInput
            style={styles.smallInput}
            placeholder="Telephone"
            value={telephone}
            onChangeText={setTelephone}
          />
          <TextInput
            style={styles.smallInput}
            placeholder="Date of Intervention"
            value={date}
            onChangeText={setDate}
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Time</Text>
          <Button title="Clear" onPress={handleClearTime} color="#ff3f00" />
        </View>
        <View style={styles.doubleInputContainer}>
          <TextInput
            style={styles.smallInput}
            placeholder="Start Time"
            value={startTime}
            onChangeText={setStartTime}
          />
          <TextInput
            style={styles.smallInput}
            placeholder="End Time"
            value={endTime}
            onChangeText={setEndTime}
          />
        </View>
        <TextInput
          style={styles.bigInput}
          placeholder="Location of Intervention"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Intervention Details</Text>
          <Button title="Clear" onPress={handleClearIntervention} color="#ff3f00" />
        </View>
        <TextInput
          style={styles.bigInput}
          placeholder="Intervention Object"
          value={interventionObject}
          onChangeText={setInterventionObject}
        />
        <TextInput
          style={styles.bigInput}
          placeholder="Type of Intervention"
          value={interventionType}
          onChangeText={setInterventionType}
        />
        <TextInput
          style={styles.bigInput}
          placeholder="Concerned Equipment"
          value={equipment}
          onChangeText={setEquipment}
        />
        <View style={styles.doubleInputContainer}>
          <TextInput
            style={styles.smallInput}
            placeholder="Total Duration"
            value={duration}
            onChangeText={setDuration}
          />
          <TextInput
            style={styles.smallInput}
            placeholder="Total Cost"
            value={cost}
            onChangeText={setCost}
            keyboardType="numeric"
          />
        </View>
        <TextInput
          style={styles.bigInput}
          placeholder="Observations"
          value={observations}
          onChangeText={setObservations}
        />
      </View>



      {/* /signature */}
      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Signatur client </Text>
          <Button title="Clear" onPress={handleClearIntervention} color="#ff3f00" />
        </View>
       {/* // component  for signature  client  */}
  
      </View>
      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Signatur Technicien </Text>
          <Button title="Clear" onPress={handleClearIntervention} color="#ff3f00" />
        </View>
       {/* // component  for signature  Technicien  */}
       {/* <Signtaure/> */}
      </View>

    </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} color="#00bfff" />
      </View>
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00bfff',
  },
  section: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  doubleInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  smallInput: {
    width: '48%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  bigInput: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  buttonContainer: {
    marginVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 8,
    backgroundColor: 'transparent', // Makes background transparent
    opacity: 2,    
  },
});

export default InterventionForm;
