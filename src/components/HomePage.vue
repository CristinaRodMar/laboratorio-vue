<template>
    <div class="hero-wrapper">
        <header class="navbar">
        <div class="container">
            <div class="brand">Meal Planner</div>
            <nav class="nav-links">
            <router-link to="./MyMeal.vue" class="nav-item">Lista de platos</router-link>
            <router-link to="/plan" class="nav-item">Plan semanal</router-link>
            </nav>
        </div>
        </header>

        <section class="hero">
        <img 
            src="https://img.freepik.com/free-photo/delicious-gourmet-meal-copy-space_23-2148517060.jpg?semt=ais_hybrid&w=1920&q=80" 
            alt="Deliciosa comida gourmet" 
            class="hero-image"/>
        <div class="hero-overlay">
            <h2>¿Qué cocinamos hoy?</h2>
        </div>
        </section>
    </div>
</template>

<style scoped>

</style>