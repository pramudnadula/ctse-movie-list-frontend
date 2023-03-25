import React from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonCancel: {
    backgroundColor: '#ccc',
    marginRight: 170,
  },
  modalButtonDelete: {
    backgroundColor: '#fb5b5a',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

function PopupModal({ modalVisible, setModalVisible, handleRemoveUser }) {
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Are you sure you want to delete this user?</Text>
          <View style={styles.modalButtonsContainer}>
            <Pressable
              style={[styles.modalButton, styles.modalButtonCancel]}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </Pressable>
            <Pressable style={[styles.modalButton, styles.modalButtonDelete]} onPress={handleRemoveUser}>
              <Text style={styles.modalButtonText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default PopupModal