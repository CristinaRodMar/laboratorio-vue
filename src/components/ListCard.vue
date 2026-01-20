<template>
<div class="container">
    <button class="btn-add-fixed" @click="handleCreate" title="Añadir nueva receta">
        <span class="plus">+</span> Añadir
    </button>

    <div class="cards-wrapper">
        <CardMeal 
            v-for="recipe in [...listStore.list].sort((a, b) => b.created - a.created)" 
            :key="recipe.id"
            :recipe="recipe"
            @update="(data) => listStore.updateRecipe(recipe.id, data)"
            @delete="(id) => listStore.deleteRecipe(id)"
        />
    </div>
</div>

</template>

<script setup lang="ts">
import { useListStore } from '@/stores/list';
import CardMeal from './CardMeal.vue';

const listStore = useListStore();
const handleCreate = () => {
    listStore.createRecipe()
}
</script>

<style scoped>
    .btn-add-fixed {
    position: fixed;
    top: 5.5rem;
    left: 1.8rem;
    z-index: 900;
    background: var(--primary);
    color: white;
    border: none;
    padding: 0.7rem 1.0rem;
    border-radius: 8px;
    min-width: 9rem;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: none;
    transition: all 0.22s ease;
}

.btn-add-fixed:hover {
    background: var(--primary-dark);
    box-shadow: 0 2px 6px rgba(99, 102, 241, 0.2);
}

.btn-add-fixed .plus {
    font-size: 1.35rem;
    line-height: 1;
    font-weight: 700;
}

.container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
    padding-top: 2.5rem;
    padding-bottom: 4rem;
}

.cards-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.5rem 1.2rem;
}

@media (min-width: 1024px) {
    .cards-wrapper {
        grid-template-columns: repeat(4, 1fr);
        max-width: 1280px;
        margin: 0 auto;
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .cards-wrapper {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 767px) {
    .cards-wrapper {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {
    .btn-add-fixed {
        left: 1.2rem;
        top: 5.2rem;
        padding: 0.65rem 0.95rem;
        font-size: 0.93rem;
        min-width: 8rem;
    }

    .btn-add-fixed .plus {
        font-size: 1.3rem;
    }
}
</style>