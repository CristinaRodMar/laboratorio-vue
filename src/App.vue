<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-layout">
    <header class="navbar">
      <div class="container">
        <router-link to="/" class="brand">
          <div class="brand">Meal Planner</div>
        </router-link>
        <nav class="nav-links">
          <router-link to="/lista" class="nav-item">Lista de platos</router-link>
          <router-link to="/plan" class="nav-item">Plan semanal</router-link>
        </nav>
      </div>
    </header>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

