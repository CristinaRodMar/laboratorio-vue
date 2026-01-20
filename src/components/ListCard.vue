<script setup lang="ts">
import { ref, computed } from 'vue';
import { useListStore } from '@/stores/list';
import CardMeal from './CardMeal.vue';

const listStore = useListStore();
const filterType = ref('');

const handleCreate = () => {
    listStore.createRecipe()
}

const filteredRecipes = computed(() => {
    let list = [...listStore.list];
    if (filterType.value) {
        list = list.filter(recipe => recipe.tipoComida === filterType.value);
    }
    return list.sort((a, b) => b.created - a.created);
});
</script>

<template>
<div class="container">
    <div class="top-bar-fixed">
        <button class="btn-add" @click="handleCreate" title="Añadir nueva receta">
            <span class="plus">+</span> Añadir
        </button>

        <div class="filter-wrapper">
            <select v-model="filterType" class="select-filter">
                <option value="">Todos los platos</option>
                <option value="desayuno">Desayuno</option>
                <option value="almuerzo">Almuerzo</option>
                <option value="comida">Comida</option>
                <option value="merienda">Merienda</option>
                <option value="cena">Cena</option>
            </select>
        </div>
    </div>

    <div class="cards-wrapper">
        <CardMeal 
            v-for="recipe in filteredRecipes" 
            :key="recipe.id"
            :recipe="recipe"
            @update="(data) => listStore.updateRecipe(recipe.id, data)"
            @delete="(id) => listStore.deleteRecipe(id)"
        />
    </div>
</div>
</template>

<style scoped>
.top-bar-fixed {
    position: fixed;
    top: 5.5rem;
    left: 1.8rem;
    z-index: 900;
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.btn-add {
    background: var(--primary);
    color: white;
    border: none;
    padding: 0.7rem 1.0rem;
    border-radius: 8px;
    min-width: 8rem;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.22s ease;
}

.select-filter {
    padding: 0.65rem 0.8rem;
    border-radius: 8px;
    border: 1px solid var(--gray-300);
    background: white;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--gray-700);
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    min-width: 10rem;
}

.btn-add:hover {
    background: var(--primary-dark);
}

.container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 1.5rem;
    padding-top: 6rem; 
}

.cards-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.5rem 1.2rem;
}

@media (min-width: 1024px) {
    .cards-wrapper { grid-template-columns: repeat(4, 1fr); }
}

@media (max-width: 640px) {
    .top-bar-fixed {
        left: 1rem;
        top: 5.2rem;
        flex-direction: column;
        align-items: flex-start;
    }
    .container { padding-top: 10rem; }
}
</style>