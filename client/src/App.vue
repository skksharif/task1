<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> 
      <router-link to="/children">Children</router-link> 
      <router-link to="/adults">Adults</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
nav {
  background-color: #f0f0f0;
  padding: 10px;
  display: flex;
  justify-content: center;
  gap: 2px 20px;
}
nav a{
  text-decoration: none;
  color: rgb(0, 64, 148);
  font-size: large;
  padding: 10px 15px;
  border-radius: 10px;
  transition: background-color 0.3s;
}
nav a:hover {
  background-color: #d0d0d0;
}

</style>
