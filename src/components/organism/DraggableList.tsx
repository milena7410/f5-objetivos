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
  return <View className="h-m bg-primary-50" />;
};

type DraggableListProps = {
  list: Task[];
  setList: (list: Task[]) => void;
  showDeleteAll?: boolean;
};
const DraggableList = ({
  list,
  setList,
  showDeleteAll,
}: DraggableListProps) => {
  return (
    <DraggableFlatList
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={Molecules.EmptyList}
      contentContainerClassName="mt-4 ios:pb-safe-offset-56 pb-safe-offset-40"
      ListHeaderComponent={() => (
        <Molecules.DraggableListHeader showDeleteAll={showDeleteAll} />
      )}
      data={list}
      onDragEnd={({ data }) => setList(data)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={RenderITem}
      ItemSeparatorComponent={Separator}
    />
  );
};

export { DraggableList };
