import { ssrRenderSlot } from 'file://C:/salidumay-nuxt/node_modules/vue/server-renderer/index.mjs';
import { useSSRContext } from 'file://C:/salidumay-nuxt/node_modules/vue/index.mjs';

const _sfc_main = {
  __name: "player",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/player.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=player-B0w2H5cY.mjs.map
