<script setup>
</script>

<template>
  <main class="container text-white">
    <div class=" pt-4 mb-8 relative ">
      <div class="flex gap-2">
    <input type="text" @input="getSearchResults" v-model="searchQuery" placeholder="Search for city" class="py-2 px-3 w-full rounded-lg text-black">
   
  </div>
  <ul
        class="absolute bg-rose-300 text-black w-full rounded-lg py-2 px-3 top-[65px]"
        v-if="apiSearchResult"
      >
        <p class="py-2" v-if="searchError">
          Sorry, something went wrong, please try again.
        </p>
        <p
          class="my-2"
          v-if="!searchError && apiSearchResult.length === 0"
        >
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="searchResult in apiSearchResult"
            :key="searchResult.iat"
            class="py-2 cursor-pointer hover:bg-rose-200 rounded-lg px-2"
            @click="previewCity(searchResult)"
           >
            {{ searchResult.name }} {{ searchResult.country }}
          </li>
        </template>
      </ul>
</div>
<div class="flex flex-col gap-4">
      <Suspense>
        <SavedList />
      </Suspense>
    </div>

  </main>
</template>

<script setup>
import {ref} from "vue"
import {useRouter} from "vue-router"
import axios from "axios"
import SavedList from "../components/SavedList.vue"

const router=useRouter()

const previewCity = (searchResult) => {

  router.push({
    name: "city",
    params: { city: searchResult.name },
    query: {
      lat: searchResult.lat,
      lng: searchResult.lon,
      preview: true,
    },
  });
};

const searchQuery = ref("");
const queryTimeout = ref(null);
const apiSearchResult = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
       
        const result = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=5&appid=${import.meta.env.VITE_APP_API_KEY}`
        );
        console.log(result);
        apiSearchResult.value = result.data;
      } catch {
        searchError.value = true;
      }

      return;
    }
    apiSearchResult.value = null;
  }, 300);
};

</script>
