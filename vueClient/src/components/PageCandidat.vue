<template>
  <section class="container">
    <div class="ListeCandidat" v-for="candidat in candidats" :key="candidat.id">
      <img class="CandidatPic" src="../assets/saltbae.png">
      <div class="text">
        <h1>Nom : {{ candidat }}</h1>
        <h2>Parti : finito</h2>
        <h3>Programme : bouh bouh bouh bouh </h3>
        <h3>Membres du parti : Michel</h3>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: "PageCandidat",
  data(){
    return {
      candidats: ["SaltBae","candidat2","candidat3","candidat4","candidat5","candidat6"],
    }
  },
}
</script>

<style scoped>

.ListeCandidat{
  display: flex;
  background-color: white;
  margin: 15px;
  align-items: center;
  width: 1200px;
  box-shadow: 4px 4px 4px black;
}

.CandidatPic{
  width: 100px;
  margin: 10px;
}

.text{
  margin: 10px;
  text-align: left;
}

.container{
  display: flex;
  flex-wrap: wrap;
  background-color: #ffe4c4;
  justify-content: center;
}

</style>