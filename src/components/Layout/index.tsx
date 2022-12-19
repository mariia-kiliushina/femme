import { ScrollView, StyleSheet, View } from 'react-native';
import { FC, ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = { children: ReactNode };

const Layout: FC<Props> = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ScrollView>{children}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Layout;
