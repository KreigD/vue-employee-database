<template>
  <div v-if="filter || !employees" id="loading_animation"></div>
  <div v-else-if="employees" class="flex flex-wrap items-stretch justify-center">
    <div
      v-for="employee in employees"
      :key="employee.id"
      class="card max-w-xs w-full mx-5 mt-16 mb-5 shadow-lg rounded relative"
    >
      <img
        class="mx-auto w-auto rounded-full shadow-md -mt-12"
        :src="employee.headshot.large"
        :alt="employee.name.title + '. ' + employee.name.first + ' ' + employee.name.last + ' Profile Picture'"
      >
      <div v-if="employee.is_manager" class="card-department absolute right-0 top-0 mt-3 mr-3">
        <p class="text-gray text-sm">Manager</p>
      </div>
      <div class="card-content px-1">
        <div class="px-6 py-4">
          <div
            class="font-bold text-xl text-blue mb-1"
          >{{ employee.name.title }}. {{ employee.name.first }} {{ employee.name.last }}</div>
          <p class="text-gray-700 text-base font-bold mb-2">{{ employee.job_title }}</p>
          <p class="text-gray-700 text-base font-light mt-3">
            Part of the family since:
            <strong>{{ employee.date_started }}</strong>
          </p>
        </div>
        <div class="flex py-2 card-about">
          <div class="w-1/2 px-1 card-about_left">
            <p class="font-bold text-blue-400 mb-1">Location</p>
            <a
              :href="'https://maps.google.com/?q=' + employee.location.coordinates.latitude + ',' + employee.location.coordinates.longitude"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-700 hover:text-gray text-base"
            >
              <p class="text-base font-light">
                {{ employee.location.street }}
                <br>
                {{ employee.location.city }}, {{ employee.location.state }} {{ employee.location.postcode }}
              </p>
            </a>
          </div>
          <div class="w-1/2 px-1 card-about_right">
            <p class="font-bold text-blue-400 mb-1">Phone</p>
            <a
              :href="'tel:' + employee.phone"
              class="text-gray-700 hover:text-gray text-base font-light"
            >{{ employee.phone }}</a>
          </div>
        </div>
        <div v-if="employee.skills.length > 0" class="py-4">
          <p class="font-bold text-blue-400">Skills</p>
          <hr class="my-2">
          <span
            v-for="value in employee.skills.slice(0, 4)"
            class="inline-block bg-gray-300 rounded-full px-3 py-1 my-1 mx-2 text-sm font-semibold text-gray-700"
            :key="value.index"
          >{{value.id}}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else id="loading_animation"></div>
</template>

<script>
export default {
  name: "Cards",
  props: ["filter", "employees"]
};
</script>

<style>
</style>
