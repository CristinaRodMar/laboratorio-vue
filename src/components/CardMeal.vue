<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { Recipe } from '@/types'

const props = defineProps<{
  recipe: Recipe 
}>()

const emit = defineEmits(['update', 'delete'])

const localForm = reactive({
  titulo: props.recipe.titulo,
  categoria: props.recipe.categoria,
  tipoComida: props.recipe.tipoComida || '', 
  contenido: props.recipe.contenido
})

watch(() => props.recipe, (newVal) => {
    localForm.titulo = newVal.titulo
    localForm.categoria = newVal.categoria
    localForm.tipoComida = newVal.tipoComida || ''
    localForm.contenido = newVal.contenido
}, { deep: true })

const confirmDelete = () => {
    if (confirm(`¿Estás seguro de eliminar la receta "${localForm.titulo || 'Nueva receta'}"?`)) {
        emit('delete', props.recipe.id)
    }
}

const submitUpdate = () => {
  emit('update', { ...localForm })
  alert('¡Receta guardada!')
}
</script>

<template>
  <div class="card">
    <button class="btn-delete" @click="confirmDelete" title="Eliminar">×</button>

    <h2 class="card-title">{{ localForm.titulo || 'Nueva receta' }}</h2>
    
    <div class="form-group">
      <label>Título</label>
      <input v-model="localForm.titulo" type="text" class="input" maxlength="80"/>
    </div>

    <div class="form-group">
      <label>Tipo de Comida</label>
      <select v-model="localForm.tipoComida" class="select">
        <option value="" disabled>Selecciona tipo</option>
        <option value="desayuno">Desayuno</option>
        <option value="almuerzo">Almuerzo</option>
        <option value="comida">Comida</option>
        <option value="merienda">Merienda</option>
        <option value="cena">Cena</option>
      </select>
    </div>

    <div class="form-group">
      <label>Día</label>
      <select v-model="localForm.categoria" class="select">
        <option value="" disabled>Selecciona día</option>
        <option value="lunes">Lunes</option>
        <option value="martes">Martes</option>
        <option value="miercoles">Miércoles</option>
        <option value="jueves">Jueves</option>
        <option value="viernes">Viernes</option>
        <option value="sabado">Sábado</option>
        <option value="domingo">Domingo</option>
      </select>
    </div>

    <div class="form-group">
      <label>Ingredientes / Preparación</label>
      <textarea v-model="localForm.contenido" rows="6" class="textarea"></textarea>
    </div>

    <button 
      class="btn-primary" 
      :disabled="!localForm.titulo.trim() || !localForm.categoria"
      @click="submitUpdate"
    >
      Guardar receta
    </button>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 10px;
  border: 1px solid var(--gray-200);
  box-shadow: 0 3px 10px rgba(0,0,0,0.06);
  padding: 1.25rem 1.35rem;           
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
}

.btn-delete {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: #ef4444;
  color: white;
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input, .select, .textarea {
  width: 100%;
  padding: 0.62rem 0.95rem;            
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  font-size: 0.94rem;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 0.8rem;
  cursor: pointer;
}

@media (max-width: 480px) {
  .card {
    padding: 1rem; 
  }

  .card-title {
    font-size: 1.2rem;
    margin-right: 2rem; 
  }

  .input, .select, .textarea {
    font-size: 16px;
    padding: 0.8rem;
  }

  .btn-primary {
    padding: 1rem; 
  }
}
</style>