/**
 * @param {boolean} paused
 * @returns {string}
 */
export function getVideoControlLabel(paused) {
  return paused ? 'Play video' : 'Pause video';
}

/**
 * @param {object} state
 * @param {boolean} state.reducedMotion
 * @param {boolean} state.isIntersecting
 * @param {boolean} state.isHiddenSlide
 * @returns {boolean}
 */
export function shouldAutoplayBackgroundVideo({ reducedMotion, isIntersecting, isHiddenSlide }) {
  return !reducedMotion && isIntersecting && !isHiddenSlide;
}

if (typeof HTMLElement !== 'undefined' && typeof customElements !== 'undefined') {
  class RelivanowVideoCard extends HTMLElement {
    /** @type {HTMLVideoElement | null} */
    #video = null;

    /** @type {HTMLButtonElement | null} */
    #button = null;

    connectedCallback() {
      this.#video = this.querySelector('video');
      this.#button = this.querySelector('button');
      if (!this.#video || !this.#button) return;

      this.#button.addEventListener('click', this.#toggle);
      this.#video.addEventListener('play', this.#sync);
      this.#video.addEventListener('pause', this.#sync);
      this.#sync();
    }

    disconnectedCallback() {
      this.#button?.removeEventListener('click', this.#toggle);
      this.#video?.removeEventListener('play', this.#sync);
      this.#video?.removeEventListener('pause', this.#sync);
    }

    #toggle = async () => {
      if (!this.#video) return;
      if (this.#video.paused) {
        try {
          await this.#video.play();
        } catch {
          this.#sync();
        }
      } else {
        this.#video.pause();
      }
    };

    #sync = () => {
      if (!this.#video || !this.#button) return;
      this.toggleAttribute('playing', !this.#video.paused);
      this.#button.setAttribute('aria-label', getVideoControlLabel(this.#video.paused));
    };
  }

  if (!customElements.get('relivanow-video-card')) {
    customElements.define('relivanow-video-card', RelivanowVideoCard);
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const intersectionState = new WeakMap();
  const observedVideos = new WeakSet();

  /** @param {HTMLVideoElement} video */
  const syncBackgroundVideo = (video) => {
    const slide = video.closest('slideshow-slide');
    const shouldPlay = shouldAutoplayBackgroundVideo({
      reducedMotion: reducedMotion.matches,
      isIntersecting: intersectionState.get(video) ?? false,
      isHiddenSlide: slide?.getAttribute('aria-hidden') === 'true',
    });

    if (shouldPlay) video.play().catch(() => {});
    else video.pause();
  };

  const intersectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const video = /** @type {HTMLVideoElement} */ (entry.target);
      intersectionState.set(video, entry.isIntersecting);
      syncBackgroundVideo(video);
    }
  });

  /** @param {ParentNode} root */
  const observeBackgroundVideos = (root = document) => {
    for (const video of root.querySelectorAll('video[data-relivanow-background-video]')) {
      if (observedVideos.has(video)) continue;
      observedVideos.add(video);
      intersectionState.set(video, false);
      intersectionObserver.observe(video);
    }
  };

  const syncBackgroundVideos = () => {
    for (const video of document.querySelectorAll('video[data-relivanow-background-video]')) {
      syncBackgroundVideo(video);
    }
  };

  const slideStateObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      const slide = /** @type {HTMLElement} */ (mutation.target);
      for (const video of slide.querySelectorAll('video[data-relivanow-background-video]')) {
        syncBackgroundVideo(video);
      }
    }
  });

  observeBackgroundVideos();
  slideStateObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['aria-hidden'],
    subtree: true,
  });
  reducedMotion.addEventListener('change', syncBackgroundVideos);
  document.addEventListener('shopify:section:load', (event) => {
    observeBackgroundVideos(/** @type {ParentNode} */ (event.target));
  });
  document.addEventListener('shopify:section:unload', (event) => {
    const root = /** @type {ParentNode} */ (event.target);
    for (const video of root.querySelectorAll('video[data-relivanow-background-video]')) {
      intersectionObserver.unobserve(video);
      video.pause();
    }
  });
}
