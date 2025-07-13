import { atom } from "recoil";



export const currentCourseTitleAtom = atom<string | null>({
  key: "currentCourseTitle",
  default: null,
 // effects_UNSTABLE: [persistAtom],
});

export const currentModuleTitleAtom = atom<string | null>({
  key: "currentModuleTitle",
  default: null,
  //effects_UNSTABLE: [persistAtom],
});

export const currentLessonTitleAtom = atom<string | null>({
  key: "currentLessonTitle",
  default: null,
 // effects_UNSTABLE: [persistAtom],
});
