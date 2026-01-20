import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Recipe } from '@/types'   

export const useListStore = defineStore('list', () => {
    const savedData = localStorage.getItem('my_recipes')
    const list = ref<Recipe[]>(savedData ? JSON.parse(savedData) : [])

    const saveToStorage = (data: Recipe[]) => {
        localStorage.setItem('my_recipes', JSON.stringify(data))
    }

    const createRecipe = (titulo = 'Untitled recipe') => {
        const minPosition = list.value.length > 0
            ? Math.min(...list.value.map(r => r.position))
            : -1

        const newRecipe: Recipe = {
            id: crypto.randomUUID(),
            titulo,
            categoria: '',
            contenido: '', 
            position: minPosition - 1,
            created: Date.now()
        }

        list.value.unshift(newRecipe)
        saveToStorage(list.value) 
        return newRecipe   
    }

    const updateRecipe = (id: string, updatedData: Partial<Recipe>) => {
        const index = list.value.findIndex(r => r.id === id)
        
        if (index !== -1) {
            list.value[index] = { 
                ...list.value[index], 
                ...updatedData 
            } as Recipe
            saveToStorage(list.value)
        }
    }

    const deleteRecipe = (id: string) => {
        list.value = list.value.filter(r => r.id !== id)
        saveToStorage(list.value) 
    }

    return {
        list,
        createRecipe,
        updateRecipe,
        deleteRecipe
    }
})