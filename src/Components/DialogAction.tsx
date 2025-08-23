import { StyleSheet, Text } from "react-native";
import React from "react";
import { Button, Dialog, Portal } from "react-native-paper";
import { useMainCtx } from "../Context/MainContext";
import { deletePlaylist } from "../Services/deletePlaylist";
import { useAuthCtx } from "../Context/AuthContext";
const DialogAction = () => {
  const { user, setError } = useAuthCtx();
  const {
    dialogAction,
    setDialogAction,
    selectedPlaylist,
    setSelectedPlaylist,
  } = useMainCtx();
  const hideDialog = () => setDialogAction("");
  const deletePlaylistHandler = () => {
    deletePlaylist(selectedPlaylist, user?.uid, setError);
    setDialogAction("");
    setSelectedPlaylist(null);
  };
  return (
    <Portal>
      <Dialog
        visible={dialogAction.trim().length !== 0}
        onDismiss={hideDialog}
      >
        <Dialog.Content>
          <Text>{dialogAction}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>No</Button>
          <Button onPress={deletePlaylistHandler}>
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogAction;

const styles = StyleSheet.create({});
