(() => {
  "use strict";
  const form = document.getElementById("profile-form");
  const source = document.getElementById("source-file");
  const nameInput = document.getElementById("profile-name");
  const fileLabel = document.getElementById("source-label");
  const fileHint = document.getElementById("source-hint");
  const nameHint = document.getElementById("field-hint");
  const status = document.getElementById("status");
  const previewName = document.getElementById("preview-name");
  const previewFile = document.getElementById("preview-file");
  const help = document.getElementById("huong-dan");
  const defaultNameHint = nameHint.textContent;
  const extension = ".mobileconfig";
  let nameEdited = false;
  let submitted = false;

  function sourceError(file) {
    if (!file) return "Hãy chọn hồ sơ đã tải về từ UpLocket.";
    if (!file.name.toLowerCase().endsWith(extension)) return "Hãy chọn tệp có đuôi .mobileconfig.";
    if (!file.size) return "Tệp đã chọn trống. Hãy chọn lại hồ sơ gốc.";
    return "";
  }

  function fileNameError(stem) {
    if (!stem) return "Hãy nhập tên tệp bạn muốn lưu.";
    if (/[<>:"/\\|?*\u0000-\u001f\u007f\u202a-\u202e\u2066-\u2069]/u.test(stem)
      || /^\.+$/.test(stem) || /[. ]$/.test(stem)
      || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(stem)) {
      return "Tên này không dùng được cho tệp. Hãy thử một tên khác.";
    }
    if (new TextEncoder().encode(stem + extension).length > 255) return "Tên tệp quá dài. Hãy rút gọn tên.";
    return "";
  }

  function render() {
    const file = source.files[0];
    const fileError = sourceError(file);
    const stem = nameInput.value.trim().normalize("NFC").replace(/\.mobileconfig$/i, "");
    const nameError = fileNameError(stem);
    const showFileError = Boolean(fileError && (file || submitted));
    const showNameError = Boolean(nameError && (nameInput.value || submitted));
    fileLabel.textContent = file ? file.name : "Chọn tệp .mobileconfig";
    fileHint.textContent = showFileError ? fileError : "";
    nameHint.textContent = showNameError ? nameError : defaultNameHint;
    source.setAttribute("aria-invalid", String(showFileError));
    nameInput.setAttribute("aria-invalid", String(showNameError));
    source.closest(".source-field").classList.toggle("invalid", showFileError);
    nameInput.closest(".name-field").classList.toggle("invalid", showNameError);
    previewName.textContent = !nameError ? stem : file && !fileError ? "Chưa đặt tên tệp" : "Chưa chọn hồ sơ";
    previewFile.textContent = !nameError ? stem + extension : extension;
    return { file, fileError, nameError, downloadName: stem + extension };
  }

  source.addEventListener("change", () => {
    const file = source.files[0];
    if (!nameEdited) nameInput.value = !sourceError(file) ? file.name.slice(0, -extension.length) : "";
    status.textContent = "";
    render();
  });
  nameInput.addEventListener("input", () => {
    nameEdited = Boolean(nameInput.value.trim());
    status.textContent = "";
    render();
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    submitted = true;
    const { file, fileError, nameError, downloadName } = render();
    if (fileError || nameError) {
      (fileError ? source : nameInput).focus();
      return;
    }
    // Slice sets the download MIME type while preserving all original bytes, including CMS signatures.
    const url = URL.createObjectURL(file.slice(0, file.size, "application/x-apple-aspen-config"));
    const link = document.createElement("a");
    link.href = url;
    link.download = downloadName;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    status.textContent = "Đã bắt đầu tải tệp " + downloadName + ".";
  });
  document.querySelector(".guide-link").addEventListener("click", () => {
    help.open = true;
    help.querySelector("summary").focus({ preventScroll: true });
  });
  if (location.hash === "#huong-dan") help.open = true;
  render();
})();
