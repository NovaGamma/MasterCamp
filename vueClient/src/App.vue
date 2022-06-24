<template>

  <router-view/>

</template>

<script>

export default{
  name: 'app',

}
</script>

<style>

*{
  font-family: "Arial";
}

h1{
  font-weight: normal;
}

h2{
  font-weight: normal;
}

h3{
  font-weight: normal;
}

body{
  background-color: #F2F2F2;

}



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
}

#nav a {
  font-weight: normal;
  color: white;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: blue;
}



</style>
