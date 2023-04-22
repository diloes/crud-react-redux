import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Esto nos salvará la vida si tenemos que cambiar a otra herramienta como Zustand. Para no tener que
 * que hacer un final replace en todos los sitios.
 * También lo estamos tipando aquí para evitar tiparlo en todos los sitios donde lo vayamos a usar.
 */
