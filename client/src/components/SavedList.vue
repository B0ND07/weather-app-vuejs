<template>
  <div v-for="city in savedCities" :key="city.id">
    <SavedCard :city="city" @click="goToCityView(city)" />
  </div>

  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import SavedCard from "./SavedCard.vue";
import { useStore } from "vuex";

const savedCities = ref([]);
const store = useStore();
const getCities = async () => {
  const email = store.state.user ? store.state.user : null;
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:5000/api/city/getcities", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.data.savedCities) {
    savedCities.value = response.data.savedCities;

    const requests = [];
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
        )
      );
    });

    const weatherData = await Promise.all(requests);

    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });
  }
};

await getCities();

const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "city",
    params: { city: city.city },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};
</script>
