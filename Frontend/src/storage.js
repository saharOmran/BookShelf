import { create } from "zustand";

export const useClientInfoStorage = create((set) => ({
    userName: "",
    isAdmin: false,
    setClientInfo: (data) => set(() => ({ userName: data.userName, isAdmin: data.isAdmin })),
  }));