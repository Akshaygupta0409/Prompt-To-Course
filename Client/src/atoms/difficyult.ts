import { atom } from "recoil";
 import { recoilPersist } from "recoil-persist";
 const { persistAtom } = recoilPersist();
export const difficultyAtom = atom<string>({
      key: "difficultyAtom",
     default: "", 
      effects_UNSTABLE: [persistAtom] 
});