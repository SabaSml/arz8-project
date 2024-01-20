<template>
  <div class="flex flex-wrap sm:justify-between filter-container items-left w-full mb-12">
    <!-- the search bar input -->
    <div class="relative inline-block m-2 md:mr-20 xl:mr-40 lg:ml-20">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for a country..."
        class="search-input p-4 pl-16 shadow-sm rounded text-sm"
      />
      <label for="search" class="absolute inset-y-0 left-0 pl-7 flex items-center">
        <font-awesome-icon :icon="['fas', 'search']" class="p-1 px-2 sm:px-1 text-gray-500" />
      </label>
    </div>
    <!-- the filter input -->
    <div class="relative inline-block m-2 md:ml-20 xl:ml-40 lg:mr-20">
      <button
        @click="toggleDropdown"
        type="button"
        class="flex w-48 gap-x-10 text-lg font-medium rounded-md bg-white text-sm p-4 shadow-md"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        Filter by Region
        <font-awesome-icon :icon="['fas', 'chevron-down']" class="icon-size" />
      </button>
      <div
        class="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
        v-if="isDropdownOpen"
      >
        <div class="py-1" role="none">
          <a
            href="#"
            v-for="region in uniqueRegions"
            :key="region"
            @click="selectRegion(region)"
            class="block px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
          >
            {{ region }}
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- list of countries -->
  <div class="flex justify-center items-center w-full">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 justify-items-center items-center mx-2"
    >
      <router-link
        v-for="country in filteredCountries"
        :key="country.alpha3Code"
        :to="{ name: 'detail', params: { alpha3Code: country.alpha3Code } }"
        class="max-w-xs rounded-lg overflow-hidden w-10/12 h-fit"
      >
        <div class="font-item max-w-xs rounded-lg overflow-hidden shadow-lg h-5/6 max-h-80">
          <img class="w-full h-36" :src="country.flags.png" alt="country" />
          <div class="px-6 py-4">
            <h2 class="font-item--title my-3">{{ country.name }}</h2>
            <p class="font-item--text font-bold my-0.5">
              Population: <span class="font-normal">{{ country.population }}</span>
            </p>
            <p class="font-item--text font-bold my-0.5">
              Region: <span class="font-normal">{{ country.region }}</span>
            </p>
            <p class="font-item--text font-bold mb-5">
              Capital: <span class="font-normal">{{ country.capital }}</span>
            </p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, onMounted, computed, Ref } from 'vue'

let countries = ref(null)
let searchQuery: Ref<string> = ref('')
let isDropdownOpen = ref(false)
let selectedRegion = ref<string | null>(null)

const uniqueRegions = computed<string[]>(() => {
  return Array.from(
    new Set(countries.value.map((countryRegion: { region: any }) => countryRegion.region))
  )
})

const filteredCountries = computed<string[]>(() => {
  let filteredData = selectedRegion.value
    ? countries.value.filter(
        (countryRegion: { region: string | null }) => countryRegion.region === selectedRegion.value
      )
    : countries.value

  if (searchQuery.value.trim() !== '') {
    const searchLowerCase = searchQuery.value.toLowerCase()
    filteredData = filteredData.filter((country: { name: string }) =>
      country.name.toLowerCase().includes(searchLowerCase)
    )
  }

  return filteredData
})

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectRegion = (region: string | null) => {
  selectedRegion.value = region
  isDropdownOpen.value = false
}

onMounted(() => {
  fetch('../public/data.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      countries.value = data
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
})
</script>

<style lang="scss">
.font-item {
  &--title {
    font-size: 18px;
    font-weight: 900;
  }
  &--text {
    font-size: 14px;
  }
}

.search-input {
  width: 30rem;
}

.filter-container {
  display: flex;
  justify-content: around;
}
.icon-size {
  font-size: 10px;
  padding-top: 5px;
}

@media (max-width: 466px) {
  .search-input {
    width: 22rem;

    .filter-container {
      justify-content: space-between !important;
      justify-items: flex-start;
      align-items: left;
    }
  }
}
</style>
