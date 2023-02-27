import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";

export const useDispatchEx = () => useDispatch<AppDispatch>();
export const useSelectorEx: TypedUseSelectorHook<RootState> = useSelector;