import {PressableOpacity} from 'components/PressableOpacity';
import {COLORS} from 'constants/colors';
import {LAYOUT} from 'constants/layout';
import {View, Modal, StyleSheet, ScrollView, Pressable} from 'react-native';

type TProps = {
  children: React.ReactNode;
  modalVisible: boolean;
  setModalVisible: (arg: boolean) => void;
};

export const ModalWindow = ({
  children,
  modalVisible,
  setModalVisible,
}: TProps) => (
  <Modal
    style={styles.modal}
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}
  >
    <PressableOpacity
      onPress={() => setModalVisible(false)}
      style={styles.pressable}
    >
      <Pressable>
        <View style={styles.contentWrapper}>
          <ScrollView
            contentContainerStyle={styles.contentContainerStyle}
            style={styles.scrollView}
          >
            {children}
          </ScrollView>
        </View>
      </Pressable>
    </PressableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  modal: {
    flexGrow: 1,
    padding: 50,
  },
  contentWrapper: {
    width: '100%',
    minHeight: '60%',
    padding: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.greyscaleWhite,
    borderRadius: 20,
  },
  pressable: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.greyscaleOpaqueGrey,
    paddingHorizontal: LAYOUT.paddingHorizontal,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  scrollView: {
    flex: 1,
  },
});
