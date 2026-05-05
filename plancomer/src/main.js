import { Router } from '@vaadin/router';
import './pages/page-home.js';
import './pages/page-plan.js';
import './pages/page-recetas.js';
import './pages/page-compras.js';
import './pages/page-ia.js';
import './pages/page-cuenta.js';

const outlet = document.getElementById('outlet');
const router = new Router(outlet);

router.setRoutes([
  { path: '/',         component: 'page-home'     },
  { path: '/plan',     component: 'page-plan'     },
  { path: '/recetas',  component: 'page-recetas'  },
  { path: '/compras',  component: 'page-compras'  },
  { path: '/ia',       component: 'page-ia'       },
  { path: '/cuenta',   component: 'page-cuenta'   },
]);