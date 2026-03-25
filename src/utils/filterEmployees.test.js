import { describe, it, expect } from "vitest";
import { filterEmployeesByName } from "./filterEmployees.js";

const sample = [
  {
    id: 1,
    name: { first: "Janice", last: "Ramos" },
  },
  {
    id: 2,
    name: { first: "Soham", last: "Harvey" },
  },
];

describe("filterEmployeesByName", () => {
  it("returns all employees when query is shorter than 2 characters", () => {
    expect(filterEmployeesByName(sample, "")).toEqual(sample);
    expect(filterEmployeesByName(sample, "j")).toEqual(sample);
    expect(filterEmployeesByName(sample, "  j  ")).toEqual(sample);
  });

  it("filters by substring of concatenated first+last name", () => {
    expect(filterEmployeesByName(sample, "soham")).toEqual([sample[1]]);
    expect(filterEmployeesByName(sample, "amos")).toEqual([sample[0]]);
    expect(filterEmployeesByName(sample, "Jan")).toEqual([sample[0]]);
  });

  it("is case-insensitive", () => {
    expect(filterEmployeesByName(sample, "SOHAM")).toEqual([sample[1]]);
  });

  it("returns empty array when nothing matches", () => {
    expect(filterEmployeesByName(sample, "zzz")).toEqual([]);
  });
});
