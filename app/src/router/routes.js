import App from '../App'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import Home from '../components/Home'
import Logout from '../components/auth/Logout'
import Dashboard from '../components/Dashboard'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    props: true,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    props: true
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
    meta: {
      requiresAuth: true,
    }
  },
    {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  }
]

export default routes
