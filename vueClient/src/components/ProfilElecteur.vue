<template>
  <NavBar/>
  <section class="container4">

    <div class="Profile">
      <h1 class="title">Mon profil electeur</h1>
     
      <h3 class="textPropos">First name : {{user.fullName.split(' ')[0]}}</h3> 
      <h3 class="textPropos">Last name  : {{user.fullName.split(' ')[1]}}</h3> 
      <h3 class="textPropos">Vote ID    : {{user.voterID}}</h3>
      <h3 class="textPropos">Email      : {{user.email}}</h3>
      <h3 class="textPropos">Commune    : {{commune.name}}</h3>
    </div>

  </section>


</template>

<script>
import NavBar from "./NavBar";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "ProfilElecteur",
  components: {NavBar},

   data(){
    return {
      commune :''
    }
  },

  async created() {
    let user = this.getUser();
    await this.getCommune(user); 
  }, 

  methods:{
    getUser(){
      if(localStorage.jwt == undefined) return false;
      let decoded = VueJwtDecode.decode(localStorage.getItem('jwt'));
      if(decoded.exp < Date.now()/1000) this.$router.push('/Login');
      this.user = decoded;
      console.log(this.user);
      return decoded;
    },
    async getCommune(user){
      let res = await fetch("http://127.0.0.1:5000/commune/find",{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          communeId: user.communeID})
      })
      let data = await res.json();
      this.commune = data ; 
    }
}
}
</script>

<style scoped>
  .container4{
  display: flex;
  flex-wrap: wrap;

}

.Profile{
  align-self: center;
  background-color: white;
  width: 1000px;
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

}
</style>