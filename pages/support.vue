<script setup>
import AppFooter from '~/components/AppFooter.vue'

useSeoMeta({
  title: 'Support the Developer — Salidumay',
  description: 'Help keep Salidumay free and ad-light by supporting the developer.',
})

const tiers = [
  { label: 'Coffee',   amount: '₱50',  usd: '$1',  icon: '☕', desc: 'A small token of appreciation' },
  { label: 'Meal',     amount: '₱200', usd: '$4',  icon: '🍜', desc: 'Fuel for the next feature' },
  { label: 'Supporter',amount: '₱500', usd: '$9',  icon: '⭐', desc: 'You\'re a true fan' },
  { label: 'Patron',   amount: '₱1000',usd: '$18', icon: '👑', desc: 'Legendary support' },
]

const copied = ref(false)
function copyGcash() {
  navigator.clipboard?.writeText('09XXXXXXXXXX')
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="page">
    <div class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="heart-icon">💖</div>
        <h1 class="hero-title">Support <span class="accent">Salidumay</span></h1>
        <p class="hero-sub">
          Salidumay is a passion project built and maintained by one developer.<br>
          Your support helps keep the servers running and new features coming — with no ads.
        </p>
      </div>
    </div>

    <main class="wrap">

      <!-- Why support -->
      <section class="why-section">
        <div class="why-grid">
          <div class="why-card">
            <span class="why-icon">🚫</span>
            <h3>No Ads</h3>
            <p>Your support keeps the experience clean and distraction-free.</p>
          </div>
          <div class="why-card">
            <span class="why-icon">⚡</span>
            <h3>Faster Updates</h3>
            <p>Better funding means more time to build features you love.</p>
          </div>
          <div class="why-card">
            <span class="why-icon">🌐</span>
            <h3>Keep It Online</h3>
            <p>Server costs are real. Your contribution keeps the lights on.</p>
          </div>
          <div class="why-card">
            <span class="why-icon">🎌</span>
            <h3>For Anime Fans</h3>
            <p>Built by a fan, for fans. Every peso goes back into the project.</p>
          </div>
        </div>
      </section>

      <!-- Tiers -->
      <section class="tiers-section">
        <h2 class="section-title">Choose Your Support</h2>
        <div class="tiers-grid">
          <div v-for="tier in tiers" :key="tier.label" class="tier-card">
            <div class="tier-icon">{{ tier.icon }}</div>
            <div class="tier-amount">{{ tier.amount }}</div>
            <div class="tier-usd">≈ {{ tier.usd }}</div>
            <div class="tier-label">{{ tier.label }}</div>
            <p class="tier-desc">{{ tier.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Payment options -->
      <section class="payment-section">
        <h2 class="section-title">How to Send Support</h2>
        <div class="payment-grid">

          <!-- GCash -->
          <div class="payment-card">
            <div class="payment-header">
              <div class="payment-logo gcash-logo">G</div>
              <div>
                <h3 class="payment-name">GCash</h3>
                <p class="payment-note">Send to this number</p>
              </div>
            </div>
            <div class="gcash-number">
              <span class="number-text">09XX XXX XXXX</span>
              <button :class="['copy-btn', { copied }]" @click="copyGcash">
                {{ copied ? 'Copied!' : 'Copy' }}
              </button>
            </div>
            <p class="payment-tip">Use the reference: <strong>Salidumay Support</strong></p>
          </div>

          <!-- Ko-fi -->
          <div class="payment-card">
            <div class="payment-header">
              <div class="payment-logo kofi-logo">☕</div>
              <div>
                <h3 class="payment-name">Ko-fi</h3>
                <p class="payment-note">International payments accepted</p>
              </div>
            </div>
            <a href="https://ko-fi.com" target="_blank" rel="noopener" class="kofi-btn">
              Support on Ko-fi
            </a>
            <p class="payment-tip">Accepts PayPal & card payments worldwide</p>
          </div>

          <!-- PayPal -->
          <div class="payment-card">
            <div class="payment-header">
              <div class="payment-logo paypal-logo">P</div>
              <div>
                <h3 class="payment-name">PayPal</h3>
                <p class="payment-note">Direct donation</p>
              </div>
            </div>
            <a href="https://paypal.me" target="_blank" rel="noopener" class="paypal-btn">
              Donate via PayPal
            </a>
            <p class="payment-tip">No account needed for one-time donations</p>
          </div>

        </div>
      </section>

      <!-- Thank you -->
      <section class="thanks-section">
        <div class="thanks-card">
          <div class="thanks-icon">🙏</div>
          <h2 class="thanks-title">Thank You</h2>
          <p class="thanks-text">
            Whether you donate or just watch and enjoy — you're what keeps this project alive.
            Every view, every share, and every kind word means the world.
          </p>
          <NuxtLink to="/" class="back-btn">Back to Salidumay</NuxtLink>
        </div>
      </section>

    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.page { min-height: 100vh; background: var(--bg); }

/* Hero */
.hero {
  position: relative;
  min-height: 40vh;
  display: flex; align-items: center; justify-content: center;
  text-align: center;
}
.hero-bg {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 30% 50%, rgba(255,45,120,.14) 0%, transparent 55%),
    radial-gradient(ellipse at 70% 40%, rgba(0,240,255,.1) 0%, transparent 55%),
    var(--bg);
}
.hero-content { position: relative; z-index: 1; padding: 3rem 2rem; }
.heart-icon { font-size: 3rem; margin-bottom: 1rem; animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
.hero-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.5rem, 8vw, 5rem);
  line-height: 1; color: #fff; margin: 0 0 1rem;
}
.accent { color: var(--pink); }
.hero-sub { font-size: .95rem; color: var(--text-muted); line-height: 1.8; max-width: 540px; margin: 0 auto; }

/* Wrap */
.wrap { max-width: 1100px; margin: 0 auto; padding: 2rem 2rem 4rem; }

/* Section title */
.section-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  letter-spacing: .06em; color: #fff;
  margin: 0 0 1.5rem; text-align: center;
}

/* Why section */
.why-section { margin-bottom: 3.5rem; }
.why-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
.why-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 10px; padding: 1.5rem 1.25rem;
  text-align: center; transition: border-color .2s;
}
.why-card:hover { border-color: var(--cyan-dim); }
.why-icon { font-size: 2rem; display: block; margin-bottom: .75rem; }
.why-card h3 { font-size: .95rem; font-weight: 800; color: var(--text); margin: 0 0 .5rem; }
.why-card p { font-size: .82rem; color: var(--text-muted); line-height: 1.6; margin: 0; }

/* Tiers */
.tiers-section { margin-bottom: 3.5rem; }
.tiers-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
.tier-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 12px; padding: 1.75rem 1.25rem;
  text-align: center; cursor: default;
  transition: transform .25s, border-color .2s, box-shadow .25s;
}
.tier-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255,45,120,.4);
  box-shadow: 0 8px 30px rgba(255,45,120,.1);
}
.tier-icon { font-size: 2.2rem; margin-bottom: .6rem; }
.tier-amount { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: var(--pink); line-height: 1; }
.tier-usd { font-size: .72rem; color: var(--text-muted); margin-bottom: .5rem; }
.tier-label { font-size: .82rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--text); margin-bottom: .5rem; }
.tier-desc { font-size: .78rem; color: var(--text-muted); margin: 0; }

/* Payment */
.payment-section { margin-bottom: 3.5rem; }
.payment-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
.payment-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 12px; padding: 1.5rem;
  transition: border-color .2s;
}
.payment-card:hover { border-color: var(--cyan-dim); }
.payment-header { display: flex; align-items: center; gap: .9rem; margin-bottom: 1.1rem; }
.payment-logo {
  width: 44px; height: 44px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem; font-weight: 800; flex-shrink: 0;
}
.gcash-logo  { background: rgba(0,120,255,.15); color: #0078ff; border: 1px solid rgba(0,120,255,.3); }
.kofi-logo   { background: rgba(255,95,31,.15);  color: #ff5f1f; border: 1px solid rgba(255,95,31,.3); font-size: 1.4rem; }
.paypal-logo { background: rgba(0,115,209,.15); color: #0073d1; border: 1px solid rgba(0,115,209,.3); }
.payment-name { font-size: .95rem; font-weight: 800; color: var(--text); margin: 0 0 .15rem; }
.payment-note { font-size: .72rem; color: var(--text-muted); margin: 0; }

.gcash-number {
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(0,0,0,.25); border: 1px solid var(--border);
  border-radius: 8px; padding: .6rem .9rem; margin-bottom: .65rem;
}
.number-text { font-size: .9rem; font-weight: 700; color: var(--text); letter-spacing: .05em; }
.copy-btn {
  padding: .25rem .65rem; background: rgba(0,240,255,.1);
  border: 1px solid rgba(0,240,255,.3); border-radius: 5px;
  color: var(--cyan); font-size: .72rem; font-weight: 700;
  cursor: pointer; transition: all .2s;
}
.copy-btn:hover { background: rgba(0,240,255,.2); }
.copy-btn.copied { background: rgba(110,255,110,.15); border-color: rgba(110,255,110,.4); color: #6eff6e; }

.kofi-btn, .paypal-btn {
  display: block; text-align: center;
  padding: .6rem 1rem; border-radius: 8px;
  font-size: .85rem; font-weight: 700;
  text-decoration: none; margin-bottom: .65rem;
  transition: opacity .2s;
}
.kofi-btn   { background: #ff5f1f; color: #fff; }
.paypal-btn { background: #0073d1; color: #fff; }
.kofi-btn:hover, .paypal-btn:hover { opacity: .85; }
.payment-tip { font-size: .72rem; color: var(--text-muted); margin: 0; }

/* Thanks */
.thanks-section { text-align: center; }
.thanks-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 16px; padding: 3rem 2rem;
  background: linear-gradient(135deg, rgba(255,45,120,.04) 0%, rgba(0,240,255,.04) 100%);
}
.thanks-icon { font-size: 3rem; margin-bottom: 1rem; }
.thanks-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(1.8rem, 5vw, 3rem);
  color: #fff; margin: 0 0 1rem;
}
.thanks-text { font-size: .95rem; color: var(--text-muted); line-height: 1.8; max-width: 480px; margin: 0 auto 1.5rem; }
.back-btn {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .65rem 1.8rem; background: var(--pink);
  border: none; border-radius: 8px; color: #fff;
  font-size: .88rem; font-weight: 800;
  text-decoration: none; transition: box-shadow .2s;
}
.back-btn:hover { box-shadow: 0 0 24px rgba(255,45,120,.4); }

@media (max-width: 640px) {
  .wrap { padding: 1.5rem 1rem 3rem; }
  .tiers-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
