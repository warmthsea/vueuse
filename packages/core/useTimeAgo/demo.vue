<script setup lang="ts">
import { timestamp, useTimeAgo } from '@vueuse/core'
import { computed, shallowRef } from 'vue'

const slider = shallowRef(0)
const value = computed(() => timestamp() + slider.value ** 3)
const timeAgo = useTimeAgo(value)
</script>

<template>
  <div class="text-primary text-center">
    {{ timeAgo }}
  </div>
  <input v-model="slider" class="slider" type="range" min="-3800" max="3800">
  <div class="text-center opacity-50">
    {{ slider ** 3 }}ms
  </div>
</template>

<style>
.slider {
  -webkit-appearance: none;
  width: 100%;
  background: rgba(125, 125, 125, 0.1);
  border-radius: 1rem;
  height: 1rem;
  opacity: 0.8;
  margin: 0.5rem 0;
  outline: none !important;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.3rem;
  height: 1.3rem;
  background: var(--vp-c-brand);
  cursor: pointer;
  border-radius: 50%;
}
</style>
