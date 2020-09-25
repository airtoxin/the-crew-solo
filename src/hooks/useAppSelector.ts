import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected => useSelector<RootState, TSelected>(selector, equalityFn);
