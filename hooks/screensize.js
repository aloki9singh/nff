import { useMediaQuery } from "./mediaquery";

export const useIsMedium = () => useMediaQuery("(min-width: 768px)");
