<template>
  <header class="sticky top-0 bg-rose-400 shadow-lg">
    <nav
      class="container flex flex-col justify-between sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3 flex-1">
          <p class="text-2xl font-bold">VueWeather</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end" v-if="route.params.city">
        <i
          v-if="isCitySaved"
          class="fa-solid fa-trash text-xl duration-150 cursor-pointer"
          @click="removeCity"
        ></i>
        <i
          v-else
          class="fa-solid fa-plus text-xl duration-150 cursor-pointer"
          @click="addCity"
        ></i>
      </div>

      <RouterLink v-if="isLoggedIn" to="/">
        <button
          @click="logout"
          class="text-gray-50 bg-red-500 hover:text-white-50 hover:bg-red-600 border-solid border py-2 px-2 rounded-lg w-18 text-center transition duration-200 box-border font-medium"
        >
          Logout
        </button>
      </RouterLink>

      <RouterLink v-else to="/login">
        <button
          class="text-gray-50 bg-red-500 hover:text-white-50 hover:bg-red-600 border-solid border py-2 px-2 rounded-lg w-18 text-center transition duration-200 box-border font-medium"
        >
          Login
        </button>
      </RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { watch } from "@vue/runtime-core";
import { uid } from "uid";
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const savedCities = ref([]);
const store = useStore();
const route = useRoute();
const router = useRouter();
const isCitySaved = ref(false);

const loadSavedCities = async () => {
  const email = store.state.user ? store.state.user : null;
  const token = localStorage.getItem("token");
  const response = await axios.get("/city/getcities", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  savedCities.value = response.data.savedCities;
};

const logout = () => {
  store.dispatch("logoutUser");
  router.push("/");
  window.location.reload();
};

const checkCitySaved = () => {
  isCitySaved.value =
    savedCities.value?.some((city) => city.city === route.params.city) ?? false;
};

const addCity = async () => {
  const email = store.state.user ? store.state.user : null;
  if (!email && email == null) {
    router.push("/login");
  }

  loadSavedCities();
  const locationObj = {
    id: uid(),
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  const response = await axios.post("/city/savecity", {
    email: email,
    cityData: locationObj,
  });
  alert("saved successfully");
  router.push("/");

  checkCitySaved();
};

const removeCity = async () => {
  const email = store.state.user ? store.state.user : null;

  const token = localStorage.getItem("token");
  const response = await axios.get("/city/getcities", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  savedCities.value = response.data.savedCities;

  const cities = response.data.savedCities;
  const updatedCities = cities.filter((city) => city.id !== route.query.id);
  await axios.put("/city/updatecities", {
    email: email,
    updatedCities: updatedCities,
  });
  router.push({ name: "home" });
};

loadSavedCities();
checkCitySaved();

const isLoggedIn = computed(() => store.getters.isLoggedIn);

watch(
  () => route.params.city,
  () => {
    loadSavedCities();
    checkCitySaved();
  }
);

const reFetchUser = async () => {
  await store.dispatch("reFetchUser");
};

onMounted(() => {
  reFetchUser();
});
</script>
