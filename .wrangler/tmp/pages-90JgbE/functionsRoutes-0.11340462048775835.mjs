import { onRequestPost as __api_contact_ts_onRequestPost } from "/Volumes/2TB/Tesoro/Marketing/Tesoro-crm-website/functions/api/contact.ts"
import { onRequestPost as __api_demo_ts_onRequestPost } from "/Volumes/2TB/Tesoro/Marketing/Tesoro-crm-website/functions/api/demo.ts"
import { onRequestPost as __api_search_ts_onRequestPost } from "/Volumes/2TB/Tesoro/Marketing/Tesoro-crm-website/functions/api/search.ts"

export const routes = [
    {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_ts_onRequestPost],
    },
  {
      routePath: "/api/demo",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_demo_ts_onRequestPost],
    },
  {
      routePath: "/api/search",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_search_ts_onRequestPost],
    },
  ]