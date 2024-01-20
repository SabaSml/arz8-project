<template>
  <button @click="goBack" class="p-2 px-5 pr-10 rounded xl:ml-24 mt-7 mx-9">
    <font-awesome-icon :icon="['fas', 'arrow-left']" class="px-2" />
    Back
  </button>
  <div class="flex flex-wrap justify-around items-center my-10">
    <img
      :src="country.flag"
      alt="Country Flag"
      class="w-10/12 md:w-4/12 md:h-96 xl:w-4/12 xl:h-96 lg:w-5/12 lg:h-96 xl:ml-12 md:ml-12 lg:ml-12"
    />
    <div class="font-item my-8 md:my-20 xl:my-20 lg:my-20 mr-12">
      <h1 class="font-item--title font-bold mx-8">{{ country.name }}</h1>
      <div class="flex flex-wrap ustify-around sm:justify-between filter-container items-left">
        <div class="m-8 mt-5">
          <p class="font-item--text font-bold my-1">
            Native Name: <span class="font-normal">{{ country.nativeName }}</span>
          </p>
          <p class="font-item--text font-bold my-1">
            Population: <span class="font-normal">{{ country.population }}</span>
          </p>
          <p class="font-item--text font-bold my-1">
            Region:<span class="font-normal">{{ country.region }}</span>
          </p>
          <p class="font-item--text font-bold my-1">
            Sub Region:<span class="font-normal">{{ country.subregion }}</span>
          </p>
          <p class="font-item--text font-bold my-1">
            Capital:<span class="font-normal">{{ country.capital }}</span>
          </p>
        </div>
        <div class="m-8">
          <p class="font-item--text font-bold my-1">
            Top Level Domain:
            <span class="font-normal">{{ country?.topLevelDomain?.[0] ?? 'N/A' }}</span>
          </p>
          <p class="font-item--text font-bold my-1">
            Currencies:
            <span class="font-normal">{{
              country && country.currencies ? country.currencies[0].name : ''
            }}</span>
          </p>
          <p class="font-item--text font-bold my-1">
            Languages:
            <span v-if="country && country.languages">
              <span class="font-normal" v-for="(language, index) in country.languages" :key="index">
                {{ language.name }}
                <span v-if="index < country.languages.length - 1">, </span>
              </span>
            </span>
          </p>
        </div>
      </div>
      <div class="m-8 flex flex-wrap label-style block">
        <p class="font-item--text font-bold my-1 block">Border countries:</p>
        <label
          class="font-normal p-1 px-5 rounded m-2 font-item--smal-text block"
          v-for="border in country.borders"
          v-if="country && country.borders"
          :key="border"
        >
          {{ border }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const alpha3Code = ref(route.params.alpha3Code)
const country = ref<any>({})

onMounted(() => {
  fetch('/../public/data.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json()
    })
    .then((countries) => {
      country.value = countries.find(
        (country: { alpha3Code: string }) => country.alpha3Code == alpha3Code.value
      )
      if (country.value.borders)
        country.value.borders = country.value.borders.map(
          (border) => countries.find((c) => c.alpha3Code == border).name
        )
      else country.value.borders = []

      console.log(country.value.borders, 2)
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
})

const goBack = () => {
  router.push({ path: '/home' })
}
</script>

<style lang="scss" scoped>
.font-item {
  &--title {
    font-size: 32px;
    font-weight: 900;
    font-weight: 900;
  }
  &--text {
    font-size: 16px;
  }
  &--smal-text {
    font-size: 13px;
    box-shadow: 0px 0px 5px 1px rgba(184, 184, 184, 0.6);
  }
}

@media (max-width: 466px) {
  .font-item {
    &--title {
      font-size: 22px;
      font-weight: 900;
      font-weight: 900;
    }
    &--text {
      font-size: 14px;
    }
    &--smal-text {
      font-size: 12px;
      box-shadow: 0px 0px 5px 1px rgba(184, 184, 184, 0.6);
    }
  }
}
button {
  box-shadow: 0px 0px 5px 1px rgba(184, 184, 184, 0.6);
}
</style>
