import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HomeView from "@/views/HomeViewTest.vue";
import TodoTestList from "@/components/TestComponents/TodoTestList.vue";

describe("HomeView", () => {
  it("renders TodoTestList component", () => {
    const wrapper = mount(HomeView);

    // Überprüfe, ob die TodoTestList-Komponente vorhanden ist
    expect(wrapper.findComponent(TodoTestList).exists()).toBe(true);
  });
});
