<template>
  <div class="card">
    <button class="btn-delete" @click="$emit('delete', recipe.id)" title="Eliminar">×</button>

    <h2 class="card-title">{{ localForm.titulo || 'Nueva receta' }}</h2>
    
    <div class="form-group">
      <label for="titulo">Título</label>
      <input id="titulo" v-model="localForm.titulo" type="text" class="input" maxlength="80"/>
    </div>

    <div class="form-group">
      <label for="categoria">Día</label>
      <select id="categoria" v-model="localForm.categoria" class="select">
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
      <label for="tipoComida">Tipo de Comida</label>
      <select id="tipoComida" v-model="localForm.tipoComida" class="select">
        <option value="" disabled>Selecciona tipo</option>
        <option value="desayuno">Desayuno</option>
        <option value="almuerzo">Almuerzo</option>
        <option value="comida">Comida</option>
        <option value="merienda">Merienda</option>
        <option value="cena">Cena</option>
      </select>
    </div>

    <div class="form-group">
      <label for="contenido">Ingredientes / Preparación</label>
      <textarea id="contenido" v-model="localForm.contenido" rows="6" class="textarea"></textarea>
    </div>

    <button 
      class="btn-primary" 
      :disabled="!localForm.titulo.trim() || !localForm.categoria || !localForm.tipoComida"
      @click="submitUpdate"
    >
      Guardar receta
    </button>
  </div>
</template>

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

const submitUpdate = () => {
  emit('update', { ...localForm }) 
  alert('¡Receta guardada localmente!')
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 10px;
  border: 1px solid #e5e7eb; 
  box-shadow: 0 3px 10px rgba(0,0,0,0.06);
  padding: 1.25rem 1.35rem;           
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  min-height: 340px;               
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0,0,0,0.1);
  border-color: #a5b4fc; 
}

.card-title {
  margin: 0 3rem 1.1rem 0;
  font-size: 1.22rem;                 
  font-weight: 700;
  color: #111827; 
  line-height: 1.3;
}

.form-group {
  margin-bottom: 1.15rem;             
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151; 
}

.input, .select, .textarea {
  width: 100%;
  padding: 0.62rem 0.95rem;            
  border: 1px solid #d1d5db; 
  border-radius: 8px;
  font-size: 0.94rem;
  background: #f9fafb; 
  transition: all 0.18s ease;
  font-family: inherit;
  box-sizing: border-box; 
}

.input:focus,
.select:focus,
.textarea:focus {
  outline: none;
  border-color: #6366f1; 
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
  background: white;
}

.textarea {
  resize: vertical;
  min-height: 96px;                    
  max-height: 220px;
  line-height: 1.5;
}

.btn-primary {
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.96rem;
  cursor: pointer;
  margin-top: 0.8rem;
  transition: all 0.2s ease;
}

.btn-primary:hover:not(:disabled) {
  background: #4f46e5; 
  transform: translateY(-1px);
  box-shadow: 0 5px 14px rgba(79, 70, 229, 0.26);
}

.btn-primary:disabled {
  background: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
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
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
  z-index: 10;
}

.btn-delete:hover {
  background: #dc2626;
  transform: scale(1.08);
}
</style>