import React, { useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';


export default function Signtaure() {
    const [clientSignature, setClientSignature] = useState(null);
    const [technicianSignature, setTechnicianSignature] = useState(null);

        const handleSaveClientSignature = (result :any ) => {
            setClientSignature(result.encoded);
        };
        
        const handleSaveTechnicianSignature = (result :any ) => {
            setTechnicianSignature(result.encoded);
        };
        
        const handleResetClientSignature = () => {
            setClientSignature(null);
        };
        
        const handleResetTechnicianSignature = () => {
            setTechnicianSignature(null);
        };
    

    return (
        <>
    
        </>
        );
    
}

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
      color: '#333',
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
      backgroundColor: 'transparent',
    },
    signature: {
      width: '100%',
      height: 150,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: '#fff',
    },
  });
  
