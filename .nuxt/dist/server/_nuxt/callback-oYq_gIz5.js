import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useAuth } from "./useAuth-CsDdxmPs.js";
import { _ as _export_sfc, c as useRouter, b as useRoute } from "../server.mjs";
import "axios";
import "C:/salidumay-nuxt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/salidumay-nuxt/node_modules/hookable/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/unctx/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/salidumay-nuxt/node_modules/defu/dist/defu.mjs";
import "C:/salidumay-nuxt/node_modules/ufo/dist/index.mjs";
const _sfc_main = {
  __name: "callback",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "callback-page" }, _attrs))} data-v-b7a20627><div class="spinner" data-v-b7a20627></div><p data-v-b7a20627>Signing you in…</p></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/callback.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const callback = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b7a20627"]]);
export {
  callback as default
};
//# sourceMappingURL=callback-oYq_gIz5.js.map
