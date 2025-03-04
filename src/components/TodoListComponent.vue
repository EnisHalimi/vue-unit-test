<template>
  <div>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">{{ todo }}</li>
    </ul>
    <input type="text" v-model="newTodo" />
    <button @click="addTodo">Add Todo</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const newTodo = ref("");
const todos = ref(["Enis Halimi", "Ritech Solutions"]);
const addTodo = () => {
    if(newTodo.value === "") return;
  todos.value.push(newTodo.value);
  newTodo.value = "";
};
</script>
