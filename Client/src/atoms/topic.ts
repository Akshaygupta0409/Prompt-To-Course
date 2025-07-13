import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
export const topicAtom = atom<string>({ key: "topicAtom", 
    default: "", 
    effects_UNSTABLE: [persistAtom] });
