import { atom } from "recoil";

export const adminState = atom({
  key: "adminState", // unique ID (with respect to other atoms/selectors)
  default: {
    // default value (aka initial value)
    isLoading: true,
    username: null,
  },
});
