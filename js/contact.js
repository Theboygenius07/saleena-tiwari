/* Contact: the postcard form. Same delivery as the previous site: Web3Forms, falling back to the visitor's mail app. */
(() => {
  const S = window.SITE;
  document.getElementById("socials").innerHTML = S.person.socials.map((s) => `<a href="${s.href}" target="_blank" rel="noopener">${s.label} ↗</a>`).join("");

  const form = document.getElementById("contact-form"), status = document.getElementById("form-status");
  const say = (text, kind = "") => { status.textContent = text; status.className = "form-status " + kind; };
  // a sent card gets struck with the postmark again
  const mark = form.closest(".postcard").querySelector(".postcard__mark");
  const postmark = () => {
    mark.classList.remove("is-in");
    void mark.offsetWidth;
    mark.style.setProperty("--delay", "0s");
    mark.classList.add("is-in");
  };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = { name: form.name.value.trim(), email: form.email.value.trim(), subject: form.subject.value.trim(), message: form.message.value.trim() };
    if (!data.name || !data.email || !data.subject || !data.message) return say("Please fill in every field.", "err");
    if (!S.web3formsKey) {
      const body = `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;
      location.href = `mailto:${S.person.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
      return say("Opening your email app…", "ok");
    }
    say("Posting…");
    fetch("https://api.web3forms.com/submit", {
      method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ access_key: S.web3formsKey, subject: "Portfolio message: " + data.subject, name: data.name, email: data.email, replyto: data.email, message: data.message }),
    })
      .then((r) => r.json().then((j) => ({ ok: r.ok, j }), () => ({ ok: r.ok, j: {} })))
      .then((res) => { if (!res.ok || res.j.success === false) throw new Error(); say("Posted. Thank you, it’s on its way to me.", "ok"); form.reset(); postmark(); })
      .catch(() => say("Hmm, that didn’t send. Try again, or email me directly.", "err"));
  });
})();
