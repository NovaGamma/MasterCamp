<template>

  <div>

    <img class="CandidatPic" src="../assets/saltbae.png" >

    <div class="text">

      <h1 style="font-weight: bold;">{{ candidat.nom }}</h1> <br>
      <h2>Parti : {{ candidat.parti }}</h2> <br>
      <h2>Programme :</h2>
      <h3>{{ candidat.programme }} </h3>

    </div>

  </div>

</template>

<script>
export default {
  name: "Candidat",

  props:{
    candidat: {
      nom: String,
      parti: String,
      programme: String,
    }

  },
}
</script>

<style scoped>

.CandidatPic{
  width: 100px;
  margin: 10px;
}

.text{
  margin: 10px;
  text-align: left;
  word-wrap: normal;
}

</style>