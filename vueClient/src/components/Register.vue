<template>

  <div class="container3">

    <div class="login" style="top:2%;">

      <img class="LogoSite" style="margin:10px;" src="../assets/LogoSite2.png"/>
      <h1 style="text-align:left; padding-left:10px; padding-top: 15px; padding-bottom: 10px; margin-bottom: 20px;">Inscription</h1>
      <input class="input" placeholder=" Prénom" v-model="surname">
      <input class="input" placeholder=" Nom" v-model="name">
      <input class="input" placeholder=" Numéro d'électeur" v-model="nbElecteur" type="nbElecteur">
      <select class="select" placeholder=" Commune" v-model="commune" type="commune">
        <option disabled value="">-- Choisissez votre commune --</option>
        <option v-for="(commune, index) in communes" :key="index" :value="commune._id">{{commune.name}}</option>
      </select>
      <input class="input" placeholder=" Numéro de carte d'identité" v-model="nbIdentite" type="nbIdentite">
      <input class="input" placeholder=" E-mail" v-model="email" type="email">
      <input class="input" placeholder=" Mot de passe" v-model="password" type="password">
      <input class="input" placeholder=" Confirmez le mot de passe" v-model="Password" type="Password">
      <router-link class="toRegister" to="/Login">Vous avez déjà un compte ? Connectez-vous ici !</router-link>
      <button class="button3" @click="register">S'inscrire</button>

    </div>

  </div>


</template>
<script>

export default {
  name: 'Register',
  data(){
    return {
      email:'',
      password:'',
      Password: '',
      nbElecteur: '',
      nbIdentite: '',
      commune: '',
      name: '',
      surname: '',
      communes: []
    }
  },
  async mounted(){
    await this.getCommunes()
  },
  methods:{
    async getCommunes(){
      let res = await fetch("http://localhost:5000/commune/findAll");
      let communes = await res.json();
      this.communes = communes;
    },
    register(){

      fetch("http://localhost:5000/auth/register",{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email:this.email, 
          password:this.password, 
          voterID:this.nbElecteur,
          commune:this.commune,
          fullName:`${this.surname} ${this.name}`
        })
      }).then((res)=>{
        if(!res.ok){
          alert(res.message);
        }
        else
          fetch("http://localhost:5000/auth/validate",{
            method:'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              email: this.email,
              voterID: this.nbElecteur
            })
          })
          this.$router.push('/Validation');
      });
    },
    formSubmitted() {
      this.myErrors = [];
      !this.commune ? this.myErrors.push("commune") : null;
      !this.email ? this.myErrors.push("email") : null;
      !this.nbElecteur ? this.myErrors.push("elec") : null;
      !this.nbIdentite ? this.myErrors.push("id") : null;
      !this.password ? this.myErrors.push("pass") : null;
      !this.Password ? this.myErrors.push("Pass") : null;
      this.password != this.Password ? this.myErrors.push("bruh") : null;
      if (!this.myErrors.length) {
        this.register();
      }
      else{
        alert(this.myErrors);
      }
    },
  }
}
</script>

<style>

.select{
  font-size: x-large;
  border-radius: 10px;
  border: none;
  box-shadow: inset 0px 0px 10px 3px lightgrey;
  margin-bottom: 20px;
  width: 94%;
  height: 50px;
  color: grey;
}

.select:hover{
  background-color: #eeeeee;
}

.select:active{
  background-color: lightgrey;
}

</style>