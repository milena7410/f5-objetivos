import * as Atoms from "../atoms";

type WelcomeProps = {
  isEmpty: boolean;
  title: string;
  subtitle: string;
  emptySubtitle: string;
};

const Welcome = ({ isEmpty, title, subtitle, emptySubtitle }: WelcomeProps) => (
  <Atoms.ThemedView className="p-4 gap-4">
    <Atoms.ThemedText fontStyle="bold" className="text-2xl font-bold">
      {title}
    </Atoms.ThemedText>
    {!isEmpty ? (
      <Atoms.ThemedText className="text-lg">{subtitle}</Atoms.ThemedText>
    ) : (
      <Atoms.ThemedText className="text-lg">{emptySubtitle}</Atoms.ThemedText>
    )}
  </Atoms.ThemedView>
);

export { Welcome };
