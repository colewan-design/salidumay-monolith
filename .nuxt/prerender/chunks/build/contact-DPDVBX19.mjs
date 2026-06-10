import { ref, mergeProps, useSSRContext } from 'file://C:/salidumay-nuxt/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'file://C:/salidumay-nuxt/node_modules/vue/server-renderer/index.mjs';
import { A as AppFooter } from './AppFooter-DakCUiQ2.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'file://C:/salidumay-nuxt/node_modules/vue-router/vue-router.node.mjs';
import 'file://C:/salidumay-nuxt/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://C:/salidumay-nuxt/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/salidumay-nuxt/node_modules/h3/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/ufo/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/salidumay-nuxt/node_modules/destr/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/hookable/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/unstorage/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/salidumay-nuxt/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js';
import 'file://C:/salidumay-nuxt/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/salidumay-nuxt/node_modules/ohash/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/klona/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/defu/dist/defu.mjs';
import 'file://C:/salidumay-nuxt/node_modules/scule/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/salidumay-nuxt/node_modules/pathe/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/unhead/dist/server.mjs';
import 'node:async_hooks';
import 'file://C:/salidumay-nuxt/node_modules/devalue/index.js';
import 'file://C:/salidumay-nuxt/node_modules/unhead/dist/plugins.mjs';
import 'file://C:/salidumay-nuxt/node_modules/unhead/dist/utils.mjs';
import 'file://C:/salidumay-nuxt/node_modules/unctx/dist/index.mjs';

const _sfc_main = {
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    const form = ref({ name: "", email: "", subject: "", message: "" });
    const sent = ref(false);
    const sending = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-40c0955d><section class="hero" data-v-40c0955d><div class="hero-bg" data-v-40c0955d></div><div class="hero-content" data-v-40c0955d><span class="tag" data-v-40c0955d>Get in Touch</span><h1 class="title" data-v-40c0955d>Contact <span class="accent" data-v-40c0955d>Us</span></h1><p class="sub" data-v-40c0955d>We&#39;d love to hear from you.</p></div></section><main class="wrap" data-v-40c0955d><div class="layout" data-v-40c0955d><div class="info-col" data-v-40c0955d><h2 class="col-title" data-v-40c0955d>How can we help?</h2><p class="col-body" data-v-40c0955d>Whether you have a bug report, a feature idea, a partnership inquiry, or just want to say hi \u2014 drop us a message and we&#39;ll get back to you.</p><div class="contact-items" data-v-40c0955d><div class="contact-item" data-v-40c0955d><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-40c0955d><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" data-v-40c0955d></path><polyline points="22,6 12,13 2,6" data-v-40c0955d></polyline></svg><div data-v-40c0955d><span class="item-label" data-v-40c0955d>Email</span><span class="item-value" data-v-40c0955d>hello@salidumay.com</span></div></div><div class="contact-item" data-v-40c0955d><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-40c0955d><path d="M21 2H3v16h5l3 3 3-3h7V2z" data-v-40c0955d></path><line x1="8" y1="10" x2="8.01" y2="10" data-v-40c0955d></line><line x1="12" y1="10" x2="12.01" y2="10" data-v-40c0955d></line><line x1="16" y1="10" x2="16.01" y2="10" data-v-40c0955d></line></svg><div data-v-40c0955d><span class="item-label" data-v-40c0955d>Discord</span><span class="item-value" data-v-40c0955d>discord.gg/salidumay</span></div></div><div class="contact-item" data-v-40c0955d><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-40c0955d><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" data-v-40c0955d></path></svg><div data-v-40c0955d><span class="item-label" data-v-40c0955d>Twitter / X</span><span class="item-value" data-v-40c0955d>@salidumay</span></div></div></div></div><div class="form-col" data-v-40c0955d>`);
      if (sent.value) {
        _push(`<div class="success-box" data-v-40c0955d><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-v-40c0955d><polyline points="20 6 9 17 4 12" data-v-40c0955d></polyline></svg><div data-v-40c0955d><strong data-v-40c0955d>Message sent!</strong><p data-v-40c0955d>We&#39;ll get back to you as soon as possible.</p></div></div>`);
      } else {
        _push(`<form class="form" data-v-40c0955d><div class="field-row" data-v-40c0955d><div class="field" data-v-40c0955d><label data-v-40c0955d>Name</label><input${ssrRenderAttr("value", form.value.name)} type="text" placeholder="Your name" required data-v-40c0955d></div><div class="field" data-v-40c0955d><label data-v-40c0955d>Email</label><input${ssrRenderAttr("value", form.value.email)} type="email" placeholder="you@example.com" required data-v-40c0955d></div></div><div class="field" data-v-40c0955d><label data-v-40c0955d>Subject</label><input${ssrRenderAttr("value", form.value.subject)} type="text" placeholder="What&#39;s this about?" data-v-40c0955d></div><div class="field" data-v-40c0955d><label data-v-40c0955d>Message</label><textarea rows="5" placeholder="Your message\u2026" required data-v-40c0955d>${ssrInterpolate(form.value.message)}</textarea></div><button type="submit" class="submit-btn"${ssrIncludeBooleanAttr(sending.value) ? " disabled" : ""} data-v-40c0955d>`);
        if (sending.value) {
          _push(`<span class="spin" data-v-40c0955d></span>`);
        } else {
          _push(`<span data-v-40c0955d>Send Message</span>`);
        }
        _push(`</button></form>`);
      }
      _push(`</div></div></main>`);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contact = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-40c0955d"]]);

export { contact as default };
//# sourceMappingURL=contact-DPDVBX19.mjs.map
