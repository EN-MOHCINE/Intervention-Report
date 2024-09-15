import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { encode } from 'base-64'; // Import base-64 library

const SignaturePad = ({ title, onClear, onSave }) => {
  const [paths, setPaths] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');

  const handleGestureEvent = (event: any) => {
    const { x, y } = event.nativeEvent;
    setCurrentPath((prevPath) => `${prevPath} ${x},${y}`);
  };

  const handleStateChange = ({ nativeEvent }: { nativeEvent: any }) => {
    if (nativeEvent.state === State.BEGAN) {
      setCurrentPath(`M ${nativeEvent.x},${nativeEvent.y}`);
    } else if (nativeEvent.state === State.END) {
      setPaths((prevPaths) => [...prevPaths, currentPath]);
      setCurrentPath('');
    }
  };

  const handleClear = () => {
    setPaths([]);
    onClear();
  };

  const handleSave = () => {
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
        ${paths.map((path, index) => `<path key="${index}" d="${path}" stroke="black" stroke-width="0.5" fill="none" />`).join('')}
      </svg>
    `;
    onSave(svgContent);
  };

  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Button title="Clear" onPress={handleClear} color="#ff3f00" />
      </View>
      <View style={styles.signature}>
        <PanGestureHandler
          onGestureEvent={handleGestureEvent}
          onHandlerStateChange={handleStateChange}
        >
          <Svg height="100%" width="100%" viewBox="0 0 100 100">
            {paths.map((path, index) => (
              <Path
                key={index}
                d={path}
                stroke="black"
                strokeWidth="0.5"
                fill="none"
              />
            ))}
            <Path
              d={currentPath}
              stroke="black"
              strokeWidth="0.5"
              fill="none"
            />
          </Svg>
        </PanGestureHandler>
      </View>
      <Button title="Save Signature" onPress={handleSave} color="#4CAF50" />
    </View>
  );
};

const InterventionForm = () => {
  const [clientName, setClientName] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [interventionObject, setInterventionObject] = useState<string>('');
  const [interventionType, setInterventionType] = useState<string>('');
  const [equipment, setEquipment] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [observations, setObservations] = useState<string>('');
  const [cost, setCost] = useState<string>('');
  const [clientSignature, setClientSignature] = useState<string>('');
  const [technicianSignature, setTechnicianSignature] = useState<string>('');

  const handleSubmit = () => {
    console.log('Form submitted', {
      clientName,
      telephone,
      date,
      startTime,
      endTime,
      location,
      interventionObject,
      interventionType,
      equipment,
      duration,
      observations,
      cost,
      clientSignature,
      technicianSignature,
    });
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

  const handleSaveSignature = (setter: React.Dispatch<React.SetStateAction<string>>) => (svgContent: string) => {
    setter(svgContent);
    Alert.alert('Success', 'Signature saved successfully!');
  };

  const createPDF = async () => {
    const htmlContent = `
      <h1>Intervention Report</h1>
      <h2>Client Information</h2>
      <p><strong>Client Name:</strong> ${clientName}</p>
      <p><strong>Telephone:</strong> ${telephone}</p>
      <p><strong>Date:</strong> ${date}</p>
      <h2>Time</h2>
      <p><strong>Start Time:</strong> ${startTime}</p>
      <p><strong>End Time:</strong> ${endTime}</p>
      <p><strong>Location:</strong> ${location}</p>
      <h2>Intervention Details</h2>
      <p><strong>Intervention Object:</strong> ${interventionObject}</p>
      <p><strong>Intervention Type:</strong> ${interventionType}</p>
      <p><strong>Equipment:</strong> ${equipment}</p>
      <p><strong>Duration:</strong> ${duration}</p>
      <p><strong>Cost:</strong> ${cost}</p>
      <p><strong>Observations:</strong> ${observations}</p>
      <h2>Signatures</h2>
      <h3>Client Signature</h3>
      <img src="data:image/svg+xml;base64,${encode(clientSignature)}" />
      <h3>Technician Signature</h3>
      <img src="data:image/svg+xml;base64,${encode(technicianSignature)}" />
    `;

    try {
      const options = {
        html: htmlContent,
        fileName: 'InterventionReport',
        directory: 'Documents',
      };
      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert('Success', `PDF created at: ${file.filePath}`);
    } catch (error) {
      console.error('Error creating PDF:', error);
      Alert.alert('Error', 'Failed to create PDF.');
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Intervention Report</Text>

        {/* Client Information Section */}
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

        {/* Time Section */}
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

        {/* Intervention Details Section */}
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

        {/* Signature for Client */}
        <SignaturePad
          title="Signature Client"
          onClear={() => setClientSignature('')}
          onSave={handleSaveSignature(setClientSignature)}
        />

        {/* Signature for Technician */}
        <SignaturePad
          title="Signature Technician"
          onClear={() => setTechnicianSignature('')}
          onSave={handleSaveSignature(setTechnicianSignature)}
        />

      </ScrollView>
      <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} color="#00bfff" />
          <Button title="Export PDF" onPress={createPDF} color="#4CAF50" />
        </View>
    </GestureHandlerRootView>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  signature: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    height: 222,
  },
});

export default InterventionForm;