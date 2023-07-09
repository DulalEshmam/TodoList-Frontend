import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TodoTestList from "@/components/TestComponents/TodoTestList.vue";

describe("TodoTestList.vue", () => {
  it("renders the task list", () => {
    const wrapper = mount(TodoTestList);
    const taskList = wrapper.find("table");

    expect(taskList.exists()).toBe(true);
  });
});
