import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const lessonAtom = atom<string>({ 
    key: "lessonAtom", 
    default: "", 
   effects_UNSTABLE: [persistAtom]
});

