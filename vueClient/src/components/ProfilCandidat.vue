<template>
  <section class="container">
    <div class="head">
      <img class="CandidatPic" src="../assets/saltbae.png" >
      <div class="Headline">
        <h1>Nom : {{ candidat.nom }}</h1>
        <h2>Parti : {{ candidat.parti }}</h2>
      </div>
      <img class="LogoParti" src="../assets/stonks.png" >
    </div>
    <div class="Infos">
      <h3>Programme : {{ candidat.programme }} </h3>
      <h3>Membres du parti : Michel</h3>
    </div>

  </section>
</template>

<script>
export default {
  name: "ProfilCandidat",

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
  width: 200px;
  margin: 10px;
}

.LogoParti{
  width: 200px;
  margin: 10px;
}

.Headline{
  font-size: xx-large;
}

.head{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.Infos{

}

</style>