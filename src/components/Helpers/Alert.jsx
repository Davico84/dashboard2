import { useState } from "react";
import Dialog from "react-native-dialog";
import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const AlertDialog = () => {
  const [isAlertVisible, setAlertVisible] = useState(false);

    const handleShowAlert = () => {
    setAlertVisible(true);
  };

  const handleCancel = () => {
    setAlertVisible(false);
  };

  const handleConfirm = () => {
    // Aquí puedes agregar la lógica que deseas realizar cuando el usuario confirma la alerta
    setAlertVisible(false);
  };

  const Error = ({title, message, onCancel, onConfirm }) => {


    return (
      <Dialog.Container styles={styles.container} visible={isAlertVisible}>
        <Dialog.Title styles={styles.title}>{title}</Dialog.Title>
        <Dialog.Description styles={styles.message}>{message}</Dialog.Description>
        <Dialog.Button styles={styles.cancelButton} label="Cancel" onPress={onCancel} />
        <Dialog.Button styles={styles.confirmButton} label="Ok" onPress={onConfirm} />
      </Dialog.Container>
    );
  };

  const Advertence = ({ isVisible, title, message, onCancel, onConfirm }) => {


    return (
      <Dialog.Container styles={styles.container} visible={isVisible}>
        <Dialog.Title styles={styles.title}>{title}</Dialog.Title>
        <Dialog.Description styles={styles.message}>{message}</Dialog.Description>
        <Dialog.Button styles={styles.cancelButton} label="Cancel" onPress={onCancel} />
        <Dialog.Button styles={styles.confirmButton} label="Ok" onPress={onConfirm} />
      </Dialog.Container>
    );
  };

  const GoToLogin = ({ isVisible, title, message, onCancel, onConfirm }) => {

    return (
      <Dialog.Container styles={styles.container} visible={isVisible}>
        <Dialog.Title styles={styles.title}>{title}</Dialog.Title>
        <Dialog.Description styles={styles.message}>{message}</Dialog.Description>
        <Dialog.Button styles={styles.cancelButton} label="Cancelar" onPress={onCancel} />
        <Dialog.Button styles={styles.confirmButton} label="Ok" onPress={onConfirm} />
      </Dialog.Container>
    );
  };

};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  cancelButton: {
    color: '#FF3D3D',
    fontSize: 16,
  },
  confirmButton: {
    color: '#52C41A',
    fontSize: 16,
  },
});


export default { AlertDialog };
