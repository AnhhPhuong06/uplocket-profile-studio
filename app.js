(() => {
  "use strict";
  const form = document.getElementById("profile-form");
  const input = document.getElementById("profile-name");
  const hint = document.getElementById("field-hint");
  const status = document.getElementById("status");
  const counter = document.getElementById("counter");
  const previewName = document.getElementById("preview-name");
  const previewFile = document.getElementById("preview-file");
  const help = document.getElementById("huong-dan");
  const defaultHint = hint.textContent;
  let attempted = false;

  function updateForm() {
    const raw = input.value;
    counter.textContent = Array.from(raw.trim().normalize("NFC")).length + " / 48";
    let name = "";
    let error = "";
    try {
      name = window.ProfileMaker.normalizeName(raw);
    } catch (e) {
      if (attempted || raw.trim()) error = e.message;
    }
    previewName.textContent = name || "Hồ sơ của bạn";
    previewFile.textContent = name ? window.ProfileMaker.fileName(name) : "UpLocket.mobileconfig";
    hint.textContent = error || defaultHint;
    input.setAttribute("aria-invalid", String(Boolean(error)));
    input.closest(".name-field").classList.toggle("invalid", Boolean(error));
    return name;
  }

  input.addEventListener("input", () => {
    status.textContent = "";
    updateForm();
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    attempted = true;
    const name = updateForm();
    if (!name) {
      input.focus();
      return;
    }
    const xml = window.ProfileMaker.makeProfile(name);
    const file = new Blob([xml], { type: "application/x-apple-aspen-config" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = window.ProfileMaker.fileName(name);
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    status.textContent = "Đã tạo tệp " + window.ProfileMaker.fileName(name) + ".";
  });

  document.querySelector(".guide-link").addEventListener("click", () => {
    help.open = true;
    help.querySelector("summary").focus({ preventScroll: true });
  });
  if (location.hash === "#huong-dan") help.open = true;
  updateForm();
})();
