<template>

  <NavBar/>

  <section class="container4">

    <div class="Apropos">
      <h1 class="title">A propos</h1>
      <h3 class="textPropos">KEKW</h3>
    </div>

  </section>

</template>

<script>
import NavBar from "./NavBar";
export default {
  name: "Apropos",
  components: {NavBar}
}
</script>

<style>

.container4{
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
  align-items: center;

}

.Apropos{
  align-self: center;
  background-color: white;
  width: 60%;
  height: 700px;
  margin: 20px;
  box-shadow: 0px 0px 7px 5px lightgrey;
}

.title{
  font-weight: bold;
  font-size: xx-large;
  padding-bottom: 100px;
  padding-top: 20px;
}

.textPropos{
  margin: 10px;

}

</style>