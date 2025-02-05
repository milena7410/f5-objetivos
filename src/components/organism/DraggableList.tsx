import React from "react";
import { View } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";

import * as Molecules from "../molecules";
import { Task } from "~/core/domain/Task";
import { TodoListItem } from "../molecules";

const RenderITem = ({
  item,
  drag,
  isActive,
  getIndex,
}: RenderItemParams<Task>) => {
  return (
    <ScaleDecorator activeScale={1.3}>
      <TodoListItem
        index={getIndex()}
        task={item}
        onLongPress={drag}
        isActive={isActive}
      />
    </ScaleDecorator>
  );
};

const Separator = () => {
  return <View className="h-m" />;
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
    <DraggableFlatList
      contentContainerClassName="my-4 bg-white dark:bg-black"
      ListHeaderComponent={Molecules.DraggableListHeader}
      data={list}
      onDragEnd={({ data }) => setList(data)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={RenderITem}
      ItemSeparatorComponent={Separator}
    />
  );
};

export { DraggableList };
