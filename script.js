/* ============================================================
   CONFIGURAÇÃO — ajuste estes valores
   ============================================================ */
const CONFIG = {
  // Número do WhatsApp no formato internacional, só dígitos (55 + DDD + número)
  whatsapp: "5500000000000",
  // Texto exibido para o cliente (formatado)
  whatsappLabel: "Resposta rápida no horário comercial",
  // E-mail de contato
  email: "matheusmartinsdb27@gmail.com",
  // Mensagem padrão ao clicar nos botões/FAB de WhatsApp
  mensagemPadrao: "Olá! Vim pelo site e gostaria de uma análise gratuita / orçamento para o meu negócio.",
  // Assunto padrão do e-mail
  emailAssunto: "Orçamento de site"
};

/* ============================================================
   APLICA CONFIGURAÇÃO NOS LINKS
   ============================================================ */
(function applyConfig() {
  const waBase = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(CONFIG.mensagemPadrao);
  ["waFab", "waLink", "waFootLink"].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.href = waBase;
  });
  const waLabel = document.getElementById("waNumberLabel");
  if (waLabel) waLabel.textContent = CONFIG.whatsappLabel;

  const mailHref = "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent(CONFIG.emailAssunto);
  ["mailLink", "mailFootLink"].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.href = mailHref;
  });
  const mailLabel = document.getElementById("mailLabel");
  if (mailLabel) mailLabel.textContent = CONFIG.email;
})();

/* ============================================================
   MENU MOBILE
   ============================================================ */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", function () {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});
navLinks.querySelectorAll("a").forEach(function (a) {
  a.addEventListener("click", function () {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* ============================================================
   PRÉ-SELEÇÃO DE PACOTE — clica em "Pedir orçamento" do plano
   ============================================================ */
document.querySelectorAll("[data-plan]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const plano = btn.getAttribute("data-plan");
    const msg = document.getElementById("mensagem");
    if (msg && !msg.value) {
      msg.value = "Tenho interesse no pacote " + plano + ". ";
    }
  });
});

/* ============================================================
   FORMULÁRIO → WHATSAPP
   ============================================================ */
const form = document.getElementById("quoteForm");
const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toastMsg");

function showToast(text) {
  toastMsg.textContent = text;
  toast.classList.add("show");
  setTimeout(function () { toast.classList.remove("show"); }, 3500);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const nome = document.getElementById("nome").value.trim();
  const negocio = document.getElementById("negocio").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  let texto = "*Novo pedido de orçamento pelo site*%0A%0A";
  texto += "*Nome:* " + nome + "%0A";
  texto += "*Negócio:* " + negocio + "%0A";
  texto += "*WhatsApp:* " + telefone + "%0A";
  if (email) texto += "*E-mail:* " + email + "%0A";
  texto += "*Precisa de:* " + mensagem;

  const url = "https://wa.me/" + CONFIG.whatsapp + "?text=" + texto;
  showToast("Abrindo o WhatsApp com seus dados...");
  setTimeout(function () { window.open(url, "_blank"); }, 600);
});

/* ============================================================
   ANIMAÇÃO DE ENTRADA (reveal on scroll)
   ============================================================ */
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
} else {
  document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
}

/* ============================================================
   ANO NO RODAPÉ
   ============================================================ */
document.getElementById("ano").textContent = new Date().getFullYear();
