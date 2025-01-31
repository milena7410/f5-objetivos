import * as React from "react";
import { Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

// Define o tipo para os dados da lista
type ItemType = string;

interface DraggableItemProps {
  item: ItemType;
  index: number;
  moveItem: (fromIndex: number, toOffset: number) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  item,
  index,
  moveItem,
}) => {
  const translateY = useSharedValue(0); // Valor compartilhado para a animação Y
  const offset = useSharedValue(0); // Offset para lembrar a posição

  const gestureHandler = (event: PanGestureHandlerGestureEvent) => {
    // Atualiza a posição do item durante o gesto
    translateY.value = event.nativeEvent.translationY + offset.value;
  };

  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === 5) {
      // 5 é o estado 'final' do gesto
      offset.value = translateY.value; // Atualiza o offset quando o gesto for finalizado
      runOnJS(moveItem)(index, translateY.value); // Atualiza a posição do item
      translateY.value = withSpring(0); // Reseta a animação após o gesto
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", gap: 8, margin: 20 }}>
      <PanGestureHandler
        onGestureEvent={gestureHandler}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={[styles.item, animatedStyle]}>
          <Text>{item}</Text>
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

const DragAndDropList: React.FC = () => {
  const [data, setData] = React.useState<ItemType[]>([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
  ]);

  const moveItem = (fromIndex: number, toOffset: number) => {
    const newData = [...data];
    const item = newData.splice(fromIndex, 1)[0]; // Remove o item de sua posição original
    // Calcula a nova posição do item
    const newIndex = newData.findIndex((_, index) => index * 70 > toOffset); // Assume 70px de altura para cada item
    newData.splice(newIndex === -1 ? newData.length : newIndex, 0, item); // Insere o item na nova posição
    setData(newData);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <DraggableItem item={item} index={index} moveItem={moveItem} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    width: 300,
    height: 60,
    backgroundColor: "skyblue",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default DragAndDropList;
