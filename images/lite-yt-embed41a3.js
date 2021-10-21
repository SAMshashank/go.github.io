class LiteYTEmbed extends HTMLElement {
    connectedCallback() {
        this.videoId = this.getAttribute("videoid");
        let e = this.querySelector(".lty-playbtn");
        if (this.playLabel = e && e.textContent.trim() || this.getAttribute("playlabel") || "Play", this.style.backgroundImage || (this.posterUrl = `https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg`, LiteYTEmbed.addPrefetch("preload", this.posterUrl, "image"), this.style.backgroundImage = `url("${this.posterUrl}")`), e || ((e = document.createElement("button")).type = "button", e.classList.add("lty-playbtn"), this.append(e)), !e.textContent) {
            const t = document.createElement("span");
            t.className = "lyt-visually-hidden", t.textContent = this.playLabel, e.append(t)
        }
        this.addEventListener("pointerover", LiteYTEmbed.warmConnections, {
            once: !0
        }), this.addEventListener("click", e => this.addIframe())
    }
    static addPrefetch(e, t, i) {
        const a = document.createElement("link");
        a.rel = e, a.href = t, i && (a.as = i), document.head.append(a)
    }
    static warmConnections() {
        LiteYTEmbed.preconnected || (LiteYTEmbed.addPrefetch("preconnect", "https://www.youtube-nocookie.com"), LiteYTEmbed.addPrefetch("preconnect", "https://www.google.com"), LiteYTEmbed.addPrefetch("preconnect", "https://googleads.g.doubleclick.net"), LiteYTEmbed.addPrefetch("preconnect", "https://static.doubleclick.net"), LiteYTEmbed.preconnected = !0)
    }
    addIframe() {
        const e = new URLSearchParams(this.getAttribute("params") || []);
        e.append("autoplay", "1");
        const t = document.createElement("iframe");
        t.width = 560, t.height = 315, t.title = this.playLabel, t.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture", t.allowFullscreen = !0, t.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(this.videoId)}?${e.toString()}`, this.append(t), this.classList.add("lyt-activated"), this.querySelector("iframe").focus()
    }
}
customElements.define("lite-youtube", LiteYTEmbed);