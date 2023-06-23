import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Appbar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  title: String;
  leftIcon?: any;
  rightIcon?: any;
  onRightIconPress?: () => void;
  onLeftIconPress?: () => void;
};
const MyHeader = ({
  title,
  leftIcon,
  rightIcon,
  onRightIconPress,
  onLeftIconPress,
}: Props) => {
  return (
    <Appbar.Header
      style={{
        borderBottomWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#4876AB',
      }}>
      <Appbar.Action icon={leftIcon} onPress={onLeftIconPress} color="white" />
      <Appbar.Content title={title} color="white" />
      <Appbar.Action icon={rightIcon} onPress={onRightIconPress} color="navy" />
    </Appbar.Header>
  );
};

export default MyHeader;
