<template>
  <div id="app" class="font-sans text-center">
    <h1 class="my-5 text-center text-5xl font-light text-gray-700">
      Employees
    </h1>

    <div class="mb-2 px-4">
      <label
        for="employee-search"
        class="sr-only"
      >Search by name</label>
      <input
        id="employee-search"
        v-model="searchQuery"
        type="search"
        autocomplete="off"
        class="search-box mx-auto w-full max-w-md rounded border border-gray-200 p-2 shadow"
        placeholder="Search by name"
        :disabled="loading || !!loadError"
        aria-describedby="search-hint results-status"
      >
      <p
        id="search-hint"
        class="mt-1 text-sm text-gray-500"
      >
        Enter at least 2 characters to filter by name.
      </p>
    </div>

    <div
      id="results-status"
      class="sr-only"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ resultsAnnouncement }}
    </div>

    <div class="container mx-auto">
      <hr>

      <div
        v-if="loading"
        id="loading_animation"
        role="status"
        aria-label="Loading employees"
      />

      <p
        v-else-if="loadError"
        class="mx-auto max-w-md rounded border border-red-200 bg-red-50 px-4 py-3 text-red-800"
        role="alert"
      >
        {{ loadError }}
      </p>

      <template v-else>
        <p
          v-if="filteredEmployees.length === 0"
          class="py-8 text-gray-600"
        >
          No employees match your search.
        </p>
        <EmployeeCards
          v-else
          :employees="filteredEmployees"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import EmployeeCards from "./components/EmployeeCards.vue";
import { filterEmployeesByName } from "./utils/filterEmployees.js";

/*
 * Dummy data: employees are loaded with axios from a static JSON file served by
 * Vite (public/employees.json). This demonstrates a typical GET + JSON parse flow
 * without a backend—useful for take-home scope that asks for axios. Swap
 * EMPLOYEES_JSON_URL for your real API when integrating.
 */
const EMPLOYEES_JSON_URL = `${import.meta.env.BASE_URL}employees.json`;

const employees = ref([]);
const loading = ref(true);
const loadError = ref(null);
const searchQuery = ref("");

const filteredEmployees = computed(() =>
  filterEmployeesByName(employees.value, searchQuery.value),
);

const resultsAnnouncement = computed(() => {
  if (loading.value) {
    return "Loading.";
  }
  if (loadError.value) {
    return loadError.value;
  }
  const n = filteredEmployees.value.length;
  return n === 1 ? "1 employee shown." : `${n} employees shown.`;
});

onMounted(async () => {
  loading.value = true;
  loadError.value = null;
  try {
    const { data } = await axios.get(EMPLOYEES_JSON_URL);
    employees.value = Array.isArray(data.results) ? data.results : [];
  } catch {
    loadError.value = "Could not load employees. Try again later.";
    employees.value = [];
  } finally {
    loading.value = false;
  }
});
</script>
