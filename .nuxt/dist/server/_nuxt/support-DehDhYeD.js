import { _ as __nuxt_component_0 } from "./nuxt-link-BPQThyuX.js";
import { ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { A as AppFooter } from "./AppFooter-DakCUiQ2.js";
import { a as useSeoMeta } from "./v3-BGyVWe_n.js";
import { _ as _export_sfc } from "../server.mjs";
import "C:/salidumay-nuxt/node_modules/ufo/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "C:/salidumay-nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/salidumay-nuxt/node_modules/hookable/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/unctx/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/h3/dist/index.mjs";
const _sfc_main = {
  __name: "support",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Support the Developer — Salidumay",
      description: "Help keep Salidumay free and ad-light by supporting the developer."
    });
    const tiers = [
      { label: "Coffee", amount: "₱50", usd: "$1", icon: "☕", desc: "A small token of appreciation" },
      { label: "Meal", amount: "₱200", usd: "$4", icon: "🍜", desc: "Fuel for the next feature" },
      { label: "Supporter", amount: "₱500", usd: "$9", icon: "⭐", desc: "You're a true fan" },
      { label: "Patron", amount: "₱1000", usd: "$18", icon: "👑", desc: "Legendary support" }
    ];
    const copied = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-77b32f9c><div class="hero" data-v-77b32f9c><div class="hero-bg" data-v-77b32f9c></div><div class="hero-content" data-v-77b32f9c><div class="heart-icon" data-v-77b32f9c>💖</div><h1 class="hero-title" data-v-77b32f9c>Support <span class="accent" data-v-77b32f9c>Salidumay</span></h1><p class="hero-sub" data-v-77b32f9c> Salidumay is a passion project built and maintained by one developer.<br data-v-77b32f9c> Your support helps keep the servers running and new features coming — with no ads. </p></div></div><main class="wrap" data-v-77b32f9c><section class="why-section" data-v-77b32f9c><div class="why-grid" data-v-77b32f9c><div class="why-card" data-v-77b32f9c><span class="why-icon" data-v-77b32f9c>🚫</span><h3 data-v-77b32f9c>No Ads</h3><p data-v-77b32f9c>Your support keeps the experience clean and distraction-free.</p></div><div class="why-card" data-v-77b32f9c><span class="why-icon" data-v-77b32f9c>⚡</span><h3 data-v-77b32f9c>Faster Updates</h3><p data-v-77b32f9c>Better funding means more time to build features you love.</p></div><div class="why-card" data-v-77b32f9c><span class="why-icon" data-v-77b32f9c>🌐</span><h3 data-v-77b32f9c>Keep It Online</h3><p data-v-77b32f9c>Server costs are real. Your contribution keeps the lights on.</p></div><div class="why-card" data-v-77b32f9c><span class="why-icon" data-v-77b32f9c>🎌</span><h3 data-v-77b32f9c>For Anime Fans</h3><p data-v-77b32f9c>Built by a fan, for fans. Every peso goes back into the project.</p></div></div></section><section class="tiers-section" data-v-77b32f9c><h2 class="section-title" data-v-77b32f9c>Choose Your Support</h2><div class="tiers-grid" data-v-77b32f9c><!--[-->`);
      ssrRenderList(tiers, (tier) => {
        _push(`<div class="tier-card" data-v-77b32f9c><div class="tier-icon" data-v-77b32f9c>${ssrInterpolate(tier.icon)}</div><div class="tier-amount" data-v-77b32f9c>${ssrInterpolate(tier.amount)}</div><div class="tier-usd" data-v-77b32f9c>≈ ${ssrInterpolate(tier.usd)}</div><div class="tier-label" data-v-77b32f9c>${ssrInterpolate(tier.label)}</div><p class="tier-desc" data-v-77b32f9c>${ssrInterpolate(tier.desc)}</p></div>`);
      });
      _push(`<!--]--></div></section><section class="payment-section" data-v-77b32f9c><h2 class="section-title" data-v-77b32f9c>How to Send Support</h2><div class="payment-grid" data-v-77b32f9c><div class="payment-card" data-v-77b32f9c><div class="payment-header" data-v-77b32f9c><div class="payment-logo gcash-logo" data-v-77b32f9c>G</div><div data-v-77b32f9c><h3 class="payment-name" data-v-77b32f9c>GCash</h3><p class="payment-note" data-v-77b32f9c>Send to this number</p></div></div><div class="gcash-number" data-v-77b32f9c><span class="number-text" data-v-77b32f9c>09XX XXX XXXX</span><button class="${ssrRenderClass(["copy-btn", { copied: unref(copied) }])}" data-v-77b32f9c>${ssrInterpolate(unref(copied) ? "Copied!" : "Copy")}</button></div><p class="payment-tip" data-v-77b32f9c>Use the reference: <strong data-v-77b32f9c>Salidumay Support</strong></p></div><div class="payment-card" data-v-77b32f9c><div class="payment-header" data-v-77b32f9c><div class="payment-logo kofi-logo" data-v-77b32f9c>☕</div><div data-v-77b32f9c><h3 class="payment-name" data-v-77b32f9c>Ko-fi</h3><p class="payment-note" data-v-77b32f9c>International payments accepted</p></div></div><a href="https://ko-fi.com" target="_blank" rel="noopener" class="kofi-btn" data-v-77b32f9c> Support on Ko-fi </a><p class="payment-tip" data-v-77b32f9c>Accepts PayPal &amp; card payments worldwide</p></div><div class="payment-card" data-v-77b32f9c><div class="payment-header" data-v-77b32f9c><div class="payment-logo paypal-logo" data-v-77b32f9c>P</div><div data-v-77b32f9c><h3 class="payment-name" data-v-77b32f9c>PayPal</h3><p class="payment-note" data-v-77b32f9c>Direct donation</p></div></div><a href="https://paypal.me" target="_blank" rel="noopener" class="paypal-btn" data-v-77b32f9c> Donate via PayPal </a><p class="payment-tip" data-v-77b32f9c>No account needed for one-time donations</p></div></div></section><section class="thanks-section" data-v-77b32f9c><div class="thanks-card" data-v-77b32f9c><div class="thanks-icon" data-v-77b32f9c>🙏</div><h2 class="thanks-title" data-v-77b32f9c>Thank You</h2><p class="thanks-text" data-v-77b32f9c> Whether you donate or just watch and enjoy — you&#39;re what keeps this project alive. Every view, every share, and every kind word means the world. </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "back-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Back to Salidumay`);
          } else {
            return [
              createTextVNode("Back to Salidumay")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section></main>`);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/support.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const support = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-77b32f9c"]]);
export {
  support as default
};
//# sourceMappingURL=support-DehDhYeD.js.map
