<template>
  <div id="app">
    <h1 class="text-center text-gray-700 font-light text-5xl my-5">Employees</h1>
    <input
      type="text"
      ref="searchBox"
      class="search-box shadow p-2 rounded"
      placeholder="Search by name"
      v-on:input="inputChange"
    >
    <div class="container mx-auto">
      <hr>
      <cards :filter="filter" :employees="filteredData"/>
    </div>
  </div>
</template>

<script>
import * as json from "./assets/data.json";
import axios from "axios";
import Cards from "./components/Cards";

export default {
  name: "App",
  components: {
    cards: Cards
  },
  data() {
    return {
      data: Object,
      query: String,
      filter: true,
      filteredData: Object
    };
  },
  methods: {
    inputChange: function() {
      let input = this.$refs.searchBox;

      input.addEventListener("input", event => {
        event.preventDefault();
        this.query = input.value;

        if (this.query.length > 1) {
          this.searchEmployees(this.query);
        } else {
          this.searchEmployees(null);
        }
      });
    },
    searchEmployees: function(query) {
      let data = this.data;

      if (query && data) {
        let search = data.filter(employee => {
          let fullName = employee.name.first.concat(employee.name.last);
          fullName = fullName.toLowerCase();
          let searchString = query.toLowerCase();

          if (fullName.includes(searchString)) {
            return employee;
          } else {
            return null;
          }
        });

        console.log(search);

        if (search.length > 0) {
          this.filteredData = search;
        } else {
          this.filteredData = null;
        }
      } else {
        this.filteredData = this.data;
      }
    }
  },
  created() {
    this.data = json.results;
    this.filteredData = this.data;
    this.filter = false;
  }
};
</script>

<style>
#app {
  font-family: sans-serif;
  text-align: center;
}
</style>
