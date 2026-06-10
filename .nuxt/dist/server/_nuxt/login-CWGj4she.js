import { _ as __nuxt_component_0 } from "./nuxt-link-BPQThyuX.js";
import { ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import { u as useAuth } from "./useAuth-CHMkirah.js";
import { _ as _export_sfc, c as useRouter } from "../server.mjs";
import "C:/salidumay-nuxt/node_modules/ufo/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/defu/dist/defu.mjs";
import "axios";
import "C:/salidumay-nuxt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/salidumay-nuxt/node_modules/hookable/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/unctx/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/h3/dist/index.mjs";
import "vue-router";
const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const { loading, error } = useAuth();
    const email = ref("");
    const password = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-page" }, _attrs))} data-v-9a4cd26b><div class="auth-card" data-v-9a4cd26b><div class="auth-logo" data-v-9a4cd26b><span class="logo-kanji" data-v-9a4cd26b>サ</span><span class="auth-title" data-v-9a4cd26b>Sign In</span></div><button class="btn-google" data-v-9a4cd26b><svg viewBox="0 0 24 24" class="google-icon" data-v-9a4cd26b><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" data-v-9a4cd26b></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" data-v-9a4cd26b></path><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" data-v-9a4cd26b></path><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" data-v-9a4cd26b></path></svg> Continue with Google </button><div class="divider" data-v-9a4cd26b><span data-v-9a4cd26b>or</span></div><form class="auth-form" data-v-9a4cd26b>`);
      if (unref(error)) {
        _push(`<div class="auth-error" data-v-9a4cd26b>${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group" data-v-9a4cd26b><label data-v-9a4cd26b>Email</label><input${ssrRenderAttr("value", email.value)} type="email" placeholder="you@example.com" required autocomplete="email" data-v-9a4cd26b></div><div class="form-group" data-v-9a4cd26b><label data-v-9a4cd26b>Password</label><input${ssrRenderAttr("value", password.value)} type="password" placeholder="••••••••" required autocomplete="current-password" data-v-9a4cd26b></div><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-v-9a4cd26b>${ssrInterpolate(unref(loading) ? "Signing in…" : "Sign In")}</button></form><p class="auth-switch" data-v-9a4cd26b> Don&#39;t have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/register" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sign up`);
          } else {
            return [
              createTextVNode("Sign up")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9a4cd26b"]]);
export {
  login as default
};
//# sourceMappingURL=login-CWGj4she.js.map
