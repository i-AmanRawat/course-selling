import { selector } from "recoil";
import { adminState } from "../atoms/admin";

export const adminEmail = selector({
  key: "adminEmail",
  get: ({ get }) => {
    const state = get(adminState);

    return state.username;
  },
});

export const isAdminLoading = selector({
  key: "isAdminLoading",
  get: ({ get }) => {
    const state = get(adminState);

    return state.isLoading;
  },
});
