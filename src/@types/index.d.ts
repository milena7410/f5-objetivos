import { ReactotronConfig } from "~/config/reactotron";
import { ReactotronConfigWeb } from "~/config/reactotron.web";

declare global {
  interface Console {
    tron: ReactotronConfig | ReactotronConfigWeb;
  }
}

type MakeOptionalField<T, K extends keyof T> = Omit<T, K> & { [P in K]?: T[P] };
