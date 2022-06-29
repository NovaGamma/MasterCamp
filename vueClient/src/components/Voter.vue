<template>

  <div>

    <img class="CandidatPic" src="../assets/saltbae.png" >

    <div class="text">

      <h1 style="font-weight: bold;">{{ voter.name }}</h1> <br>
      <h2>Parti : {{ voter.parti }}</h2> <br>
        
    </div>

    <!--BUTTON-->
    <button class="voteButton"  @click="confirm_popup()">Voter</button>

  </div>

</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: "Voter",
    methods:{
      confirm_popup(){
        var value = confirm('Voulez vous vraiment voter pour ce candidat ?')
        if (value){
          console.log("FAIRE LE FETCH A LA PLACE DE CE CONSOLE.LOG");
          this.$router.push('/');
          alert("Merci d'avoir voté !");
        }
      }
    },
  props:{
    voter: {
      nom: String,
      parti: String,
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
    flex: 10;
  margin: 10px;
  text-align: left;
  word-wrap: normal;
}

.voteButton{
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    margin-right: 100px;
    justify-content: center;
    font-size: x-large;
    border:none;
    box-shadow: 0px 0px 10px 3px lightgrey;
    border-radius: 6px;
    background-color:rgb(128,179,255);
    color:white;
}

.voteButton:hover{
    background-color: rgb(92, 157, 255)
}
.voteButton:active{
    background-color: rgb(62, 139, 255)
}

</style>