import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HelloWorld from "../HelloWorld.vue";

describe("HelloWorld Component", () => {
  it("renders properly", () => {
    const wrapper = mount(HelloWorld);
    expect(wrapper.find("h1").text()).toBe("Hello World!");
    expect(wrapper.find("p").text()).toBe(
      "This is a test component to check if Vue is working properly.",
    );
  });
});
