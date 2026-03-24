<template>
  <div class="flex flex-wrap items-stretch justify-center">
    <div
      v-for="employee in employees"
      :key="employee.id"
      class="card relative mx-5 mb-5 mt-16 w-full max-w-xs rounded shadow-lg"
    >
      <img
        class="mx-auto -mt-12 w-auto rounded-full shadow-md"
        :src="employee.headshot.large"
        :alt="`${employee.name.title}. ${employee.name.first} ${employee.name.last} profile photo`"
      >
      <div
        v-if="employee.is_manager"
        class="card-department absolute right-0 top-0 mr-3 mt-3"
      >
        <p class="text-sm text-gray-500">
          Manager
        </p>
      </div>
      <div class="card-content px-1">
        <div class="px-6 py-4">
          <div class="mb-1 text-xl font-bold text-blue-600">
            {{ employee.name.title }}. {{ employee.name.first }}
            {{ employee.name.last }}
          </div>
          <p class="mb-2 text-base font-bold text-gray-700">
            {{ employee.job_title }}
          </p>
          <p class="mt-3 text-base font-light text-gray-700">
            Part of the family since:
            <strong>{{ employee.date_started }}</strong>
          </p>
        </div>
        <div class="card-about flex py-2">
          <div class="card-about_left w-1/2 px-1">
            <p class="mb-1 font-bold text-blue-400">
              Location
            </p>
            <a
              :href="`https://maps.google.com/?q=${employee.location.coordinates.latitude},${employee.location.coordinates.longitude}`"
              target="_blank"
              rel="noopener noreferrer"
              class="text-base text-gray-700 hover:text-gray-500"
            >
              <p class="text-base font-light">
                {{ employee.location.street }}
                <br>
                {{ employee.location.city }}, {{ employee.location.state }}
                {{ employee.location.postcode }}
              </p>
            </a>
          </div>
          <div class="w-1/2 px-1">
            <p class="mb-1 font-bold text-blue-400">
              Phone
            </p>
            <a
              :href="`tel:${employee.phone}`"
              class="text-base font-light text-gray-700 hover:text-gray-500"
            >{{ employee.phone }}</a>
          </div>
        </div>
        <div
          v-if="employee.skills.length > 0"
          class="py-4"
        >
          <p class="font-bold text-blue-400">
            Skills
          </p>
          <hr class="my-2">
          <span
            v-for="(skill, index) in employee.skills.slice(0, 4)"
            :key="`${employee.id}-${skill.id}-${index}`"
            class="mx-2 my-1 inline-block rounded-full bg-gray-300 px-3 py-1 text-sm font-semibold text-gray-700"
          >{{ skill.id }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  employees: {
    type: Array,
    required: true,
  },
});
</script>
