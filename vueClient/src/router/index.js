import VueJwtDecode from "vue-jwt-decode";
import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../components/NotFound.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import PageCandidat from '../components/PageCandidat.vue'
import ProfilElecteur from '../components/ProfilElecteur.vue'
import Apropos from '../components/Apropos.vue'
import PageVoter from '../components/PageVoter.vue'
import Validation from '../components/Validation.vue'

const routes = [
  {
    path: '/',
    name: 'PageCandidat',
    component: PageCandidat,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/Validation',
    name: 'Validation',
    component: Validation,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/Apropos',
    name: 'Apropos',
    component: Apropos,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/ProfilElecteur',
    name: 'Electeur',
    component: ProfilElecteur,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/PageCandidat',
    name: 'Candidats',
    component: PageCandidat,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path :'/Login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path :'/Register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path :'/PageVoter',
    name: 'PageVoter',
    component: PageVoter,
    meta: {
      requiresAuth: false,
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function isAuthenticated(){
  return localStorage.jwt != undefined ? true : false;
}

function isAdmin(){
  if(localStorage.jwt == undefined) return false;
  let decoded = VueJwtDecode.decode(localStorage.getItem('jwt'));
  if(decoded.exp < Date.now()/1000) return false;
  let user = decoded;
  if (user.fullName == "Admin" && user.email == "admin@test.com") return true;
  return false
}

router.beforeEach((to, from, next) =>{
  if (to.matched.some((record) => record.meta.requiresAuth)){
    if(isAuthenticated()){
      next();
      return;
    }
    next('/Login');
    return;
  } else if (to.matched.some((record) => record.meta.requiresAdmin)){
    if(isAdmin()){
      next();
      return;
    }
    next('/Login');
    return;
  }
  next();
})

export default router
