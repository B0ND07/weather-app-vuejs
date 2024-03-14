<template>
     <header class="sticky top-0 bg-rose-400 shadow-lg">
        <nav class="container flex flex-col justify-between sm:flex-row items-center gap-4 text-white py-6">
            <RouterLink :to="{name:'home'}">
            <div class="flex items-center gap-3 flex-1">
                <i class="fa-solid fa-sun text-2xl"></i>
                <p class="text-2xl">VueWeather</p>

            </div>
        </RouterLink>
        
        <div class="flex gap-3 flex-1 justify-end" v-if="route.params.city">
            <i
          v-if="isCitySaved"
          class="fa-solid fa-trash text-xl duration-150 cursor-pointer"
          @click="removeCity"
        ></i>
            <i v-else
          class="fa-solid fa-plus text-xl duration-150 cursor-pointer"
          @click="addCity"
         ></i>
        </div>
        <RouterLink to="/login">
        <button class="text-gray-50 bg-red-500 hover:text-white-50 hover:bg-red-600 border-solid border py-2 px-2 rounded-lg w-18 text-center transition duration-200 box-border font-medium">Login</button>
    </RouterLink>

        </nav>

     </header>
</template>

<script setup>
import {RouterLink, useRoute, useRouter } from "vue-router"
import { watch  } from '@vue/runtime-core';
import { uid } from "uid";
import { ref } from "vue";

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();
const isCitySaved = ref(false);

const loadSavedCities = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }
};

const checkCitySaved = () => {
  isCitySaved.value = savedCities.value.some(
    (city) => city.city === route.params.city
  );
  console.log("isCitySaved:", isCitySaved.value);
};


const addCity = () => {
    loadSavedCities();

  const locationObj = {
    id: uid(),
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  savedCities.value.push(locationObj);
  localStorage.setItem(
    "savedCities",
    JSON.stringify(savedCities.value)
  );

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
  checkCitySaved();
};

const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter(
    (city) => city.id !== route.query.id
  );
  localStorage.setItem(
    "savedCities",
    JSON.stringify(updatedCities)
  );
  router.push({
    name: "home",
  });
};


const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
loadSavedCities();
checkCitySaved();


watch(() => route.params.city, () => {
  loadSavedCities();
  checkCitySaved();
});
</script>
