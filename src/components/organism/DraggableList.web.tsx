import React from "react";
import { View } from "react-native";

import { Task } from "~/core/domain/Task";
import { TodoListItem } from "../molecules";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";

const RenderITem = ({ item, index }: { item: Task; index: number }) => {
  return <TodoListItem index={index} task={item} />;
};

const Separator = () => {
  return <View className="h-1 bg-primary" />;
};

type DraggableListProps = {
  list: Task[];
  setList: (list: Task[]) => void;
};
const DraggableList = ({ list, setList }: DraggableListProps) => {
  if (!list.length) {
    return null;
  }
  return (
    <SafeAreaView className="flex-1 bg-primary dark:bg-black">
      <FlatList
        extraData={list.length}
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ index, item }) => RenderITem({ item, index })}
        ItemSeparatorComponent={Separator}
      />
    </SafeAreaView>
  );
};

export { DraggableList };
