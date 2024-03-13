<template>
    <div>
        <Suspense>
        <CityView/>
        <template #fallback>
            <p>loading</p>
        </template>
        </Suspense>
    </div>
     
</template>

<script setup>
import CityView from "../components/CityView.vue"

</script>

