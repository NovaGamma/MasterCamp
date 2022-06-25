<template>

  <div>

    <img class="CandidatPic" src="../assets/saltbae.png" >

    <div class="text">

      <h1 style="font-weight: bold;">{{ candidat.nom }}</h1>
      <h2>Parti : {{ candidat.parti }}</h2>
      <h3>Programme : {{ candidat.programme }} </h3>
      <h3>Membres du parti : Michel</h3>

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