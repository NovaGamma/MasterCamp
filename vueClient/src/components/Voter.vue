<template>

  <div>

    <img class="CandidatPic" src="../assets/HolderCandidat.png" >

    <div class="text">
      
      <h1 style="font-weight: bold;">{{ voter.name }}</h1> <br>
      <h2>Parti : {{ voter.parti }}</h2> <br>
        
    </div>

    <!--BUTTON-->
    <input v-if="state" v-model="code" placeholder="vote code">
    <button class="voteButton"  @click="confirm_popup()">Voter</button>

  </div>

</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: "Voter",
  data(){
    return {
      code: '',
      state:false
    }
  },
  async mounted(){
    this.getUser();
  },
    methods:{
      getUser(){
        if(localStorage.jwt == undefined) return false;
        let decoded = VueJwtDecode.decode(localStorage.getItem('jwt'));
        if(decoded.exp < Date.now()/1000) this.$router.push('/Login');
        this.user = decoded;
        console.log(this.user);
      },
      async confirm_popup(){
        if(!this.state){
          let res = await fetch("http://127.0.0.1:5000/vote/code",{
            method:"POST",
            headers: {'Content-Type': 'application/json',
                  'Authorization': 'JWT ' + localStorage.jwt},
            body: JSON.stringify({
            })        
          })
          this.state = !this.state;
          alert("Le code de validation pour le vote vous a été envoyé");
          return
        }
        var value = confirm('Voulez vous vraiment voter pour ce candidat ?')
        if (value){
          let res = await fetch("http://127.0.0.1:5000/vote/vote",{
            method:"POST",
            headers: {'Content-Type': 'application/json',
                  'Authorization': 'JWT ' + localStorage.jwt},
            body: JSON.stringify({
              code: this.code,
              communeID:this.voter.communeID,
              candidatID:this.voter._id
            })        
          })
          if(!res.ok){
            alert(res.message)
            return
          }
          this.$router.push('/');
          alert("Merci d'avoir voté !");
        }
      }
    },
  props:{
    voter: {
      type:Object
    }

  },
}
</script>

<style scoped>

.CandidatPic{
  width: 100px;
  margin: 20px;
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