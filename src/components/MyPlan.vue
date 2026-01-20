<script setup lang="ts">
import { useListStore } from '@/stores/list'; 

const listStore = useListStore(); 

const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
const tiposComida = ['desayuno', 'almuerzo', 'comida', 'merienda', 'cena'];

const getRecipes = (dia: string, tipo: string) => {
    return listStore.list.filter(
        (r) => r.categoria.toLowerCase() === dia.toLowerCase() && 
            r.tipoComida?.toLowerCase() === tipo.toLowerCase()
    );
};
</script>

<template>
    <div class="calendar-container">
        <div class="calendar-grid">
        <div class="grid-header">Comida / Día</div>
        <div v-for="dia in diasSemana" :key="dia" class="grid-header capitalize">
            {{ dia }}
        </div>

        <template v-for="tipo in tiposComida" :key="tipo">
            <div class="type-label capitalize">{{ tipo }}</div>
            <div v-for="dia in diasSemana" :key="dia" class="calendar-cell">
            <div 
                v-for="receta in getRecipes(dia, tipo)" 
                :key="receta.id" 
                class="recipe-tag"
            >
                {{ receta.titulo }}
            </div>
            </div>
        </template>
        </div>
    </div>
</template>

<style scoped>
.calendar-container {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
}

.calendar-title {
    color: #1e3a8a; 
    margin-bottom: 2rem;
    text-align: center;
    font-weight: 800;
}

.calendar-grid {
    display: grid;
    grid-template-columns: 120px repeat(7, 1fr);
    gap: 1px;
    background-color: #e5e7eb; 
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow-x: auto; 
}

.grid-header {
    background-color: #6366f1; 
    color: white;
    padding: 1rem;
    font-weight: 700;
    text-align: center;
    font-size: 0.85rem;
    white-space: nowrap;
}

.type-label {
    background-color: #f3f4f6; 
    padding: 1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #374151; 
    font-size: 0.9rem;
    border-bottom: 1px solid #e5e7eb;
}

.calendar-cell {
    background-color: white;
    padding: 0.6rem;
    min-height: 90px;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    border-bottom: 1px solid #f3f4f6;
}

.recipe-tag {
    background-color: #818cf8; 
    color: white;
    padding: 0.35rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1.2;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.capitalize {
    text-transform: capitalize;
}

@media (max-width: 1024px) {
    .calendar-container {
        padding: 0.5rem; 
    }
    .calendar-grid {
        grid-template-columns: 80px repeat(7, 160px); 
        overflow-x: auto;
        -webkit-overflow-scrolling: touch; 
    }
}

@media (max-width: 640px) {
    .grid-header, .type-label {
        padding: 0.5rem;
        font-size: 0.75rem;
    }
    
    .calendar-cell {
        min-height: 70px;
    }
}
</style>