import * as Atoms from "../atoms";

type WelcomeProps = {
  totalTasksTodo: number;
};

const Welcome = ({ totalTasksTodo }: WelcomeProps) => (
  <Atoms.ThemedView className="p-4 gap-4">
    <Atoms.ThemedText fontStyle="bold" className="text-2xl font-bold">
      Welcome!
    </Atoms.ThemedText>
    {totalTasksTodo ? (
      <Atoms.ThemedText className="text-lg">
        Você tem {totalTasksTodo} tarefas a fazer
      </Atoms.ThemedText>
    ) : (
      <Atoms.ThemedText>Você não tem tarefas em aberto</Atoms.ThemedText>
    )}
  </Atoms.ThemedView>
);

export { Welcome };
