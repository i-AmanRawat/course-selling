import { selector } from "recoil";
import { courseState } from "../atoms/course";

export const isCourseLoading = selector({
  key: "isCourseLoading",
  get: ({ get }) => {
    const state = get(courseState);

    return state.isLoading;
  },
});

export const courseInfo = selector({
  key: "courseInfo",
  get: ({ get }) => {
    const state = get(courseState);

    return state.course;
  },
});

export const courseTitle = selector({
  key: "courseTitle",
  get: ({ get }) => {
    const state = get(courseState);

    return state.course.title;
  },
});

export const courseDescription = selector({
  key: "courseDescription",
  get: ({ get }) => {
    const state = get(courseState);

    return state.course.detail;
  },
});

export const coursePrice = selector({
  key: "coursePrice",
  get: ({ get }) => {
    const state = get(courseState);

    return state.course.price;
  },
});

export const courseImageLink = selector({
  key: "courseImageLink",
  get: ({ get }) => {
    const state = get(courseState);

    return state.course.imageLink;
  },
});

export const coursePublished = selector({
  key: "coursePublished",
  get: ({ get }) => {
    const state = get(courseState);

    return state.course.published;
  },
});
