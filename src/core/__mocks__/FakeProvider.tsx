import * as React from "react";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { store } from "./fakeStore";
import { AppDispatch, RootState } from "../../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const FakeReduxProvider = ({ children }: React.PropsWithChildren) => {
  return <Provider store={store()}>{children}</Provider>;
};
