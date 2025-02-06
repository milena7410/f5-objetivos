import * as Atoms from "../atoms";
import * as Organism from "../organism";
type WelcomeProps = {
  isEmpty: boolean;
  title: string;
  subtitle: string;
  emptySubtitle: string;
};

const Welcome = ({ isEmpty, title, subtitle, emptySubtitle }: WelcomeProps) => (
  <Atoms.ThemedView className=" p-4 gap-4">
    <Atoms.ThemedText fontStyle="bold" className="text-2xl font-bold">
      {title}
    </Atoms.ThemedText>
    <Atoms.ThemedView className="gap-2 flex-row items-center">
      <Atoms.ThemedText className="flex-1 text-lg">
        {!isEmpty ? subtitle : emptySubtitle}
      </Atoms.ThemedText>
      <Organism.CreateTaskModal />
    </Atoms.ThemedView>
  </Atoms.ThemedView>
);

export { Welcome };
