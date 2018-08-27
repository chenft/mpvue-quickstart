import { BaseVue } from '@/extends/base'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import App from './index'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const app = new BaseVue(App){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
app.$mount(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
