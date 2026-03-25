import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";
import App from "./App.vue";

vi.mock("axios");

const employeeFixture = {
  id: 1,
  name: { title: "Mr", first: "Jane", last: "Smith" },
  headshot: { large: "https://example.com/photo.jpg" },
  is_manager: false,
  job_title: "Engineer",
  date_started: "1/1/2020",
  location: {
    street: "1 Main St",
    city: "Austin",
    state: "TX",
    postcode: "78701",
    coordinates: { latitude: "30.0", longitude: "-97.0" },
  },
  phone: "555-0100",
  skills: [{ id: "Vue" }],
};

beforeEach(() => {
  vi.mocked(axios.get).mockResolvedValue({
    data: { results: [employeeFixture] },
  });
});

describe("App", () => {
  it("loads employees via axios and shows the card grid", async () => {
    const wrapper = mount(App);
    await flushPromises();

    expect(axios.get).toHaveBeenCalled();
    expect(wrapper.text()).toContain("Jane");
    expect(wrapper.text()).toContain("Smith");
  });

  it("shows empty state when no rows match the search", async () => {
    const wrapper = mount(App);
    await flushPromises();

    const input = wrapper.get("#employee-search");
    await input.setValue("zz");

    expect(wrapper.text()).toContain("No employees match your search.");
  });
});
