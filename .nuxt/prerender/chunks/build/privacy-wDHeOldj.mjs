import { mergeProps, useSSRContext } from 'file://C:/salidumay-nuxt/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'file://C:/salidumay-nuxt/node_modules/vue/server-renderer/index.mjs';
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
  __name: "privacy",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-46070531><section class="hero" data-v-46070531><div class="hero-bg" data-v-46070531></div><div class="hero-content" data-v-46070531><span class="tag" data-v-46070531>Legal</span><h1 class="title" data-v-46070531>Privacy <span class="accent" data-v-46070531>Policy</span></h1><p class="sub" data-v-46070531>Last updated: May 2025</p></div></section><main class="wrap" data-v-46070531><div class="doc" data-v-46070531><section class="doc-section" data-v-46070531><h2 data-v-46070531>1. Information We Collect</h2><p data-v-46070531>When you create an account, we collect your name and email address. If you sign in with a third-party provider (e.g. Google), we receive only the profile information that provider shares with us.</p><p data-v-46070531>We also collect usage data such as watch history and library saves \u2014 solely to provide the features you use.</p></section><section class="doc-section" data-v-46070531><h2 data-v-46070531>2. How We Use Your Information</h2><ul data-v-46070531><li data-v-46070531>To provide and improve the platform</li><li data-v-46070531>To personalize your experience (watch history, library)</li><li data-v-46070531>To communicate service updates or respond to your inquiries</li><li data-v-46070531>We do <strong data-v-46070531>not</strong> sell your data to third parties</li></ul></section><section class="doc-section" data-v-46070531><h2 data-v-46070531>3. Cookies</h2><p data-v-46070531>We use essential cookies to keep you logged in and remember your preferences. We do not use advertising cookies or third-party tracking cookies.</p></section><section class="doc-section" data-v-46070531><h2 data-v-46070531>4. Third-Party Services</h2><p data-v-46070531>Salidumay uses TMDB for film metadata and third-party embed players for streaming. These services have their own privacy policies \u2014 we encourage you to review them. We do not control what data those embed providers collect.</p></section><section class="doc-section" data-v-46070531><h2 data-v-46070531>5. Data Retention</h2><p data-v-46070531>We retain your account data for as long as your account is active. You can request deletion of your account and all associated data at any time by contacting us.</p></section><section class="doc-section" data-v-46070531><h2 data-v-46070531>6. Your Rights</h2><p data-v-46070531>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at <a href="mailto:hello@salidumay.com" data-v-46070531>hello@salidumay.com</a>.</p></section><section class="doc-section" data-v-46070531><h2 data-v-46070531>7. Contact</h2><p data-v-46070531>Questions about this policy? <a href="/contact" data-v-46070531>Reach out to us</a>.</p></section></div></main>`);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/privacy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const privacy = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-46070531"]]);

export { privacy as default };
//# sourceMappingURL=privacy-wDHeOldj.mjs.map
