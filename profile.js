(() => {
  "use strict";

  const iconData = "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";

  function normalizeName(raw) {
    if (typeof raw !== "string" || !raw.trim()) {
      throw new Error("Bạn hãy nhập tên cho hồ sơ.");
    }

    // Reject invisible control characters, isolated surrogate halves and forbidden XML characters.
    if (/[\p{Cc}\p{Cs}\u202A-\u202E\u2066-\u2069\uFFFE\uFFFF]/u.test(raw)) {
      throw new Error("Tên chứa ký tự không hợp lệ. Bạn hãy nhập lại tên.");
    }

    const name = raw.trim().normalize("NFC");
    if (Array.from(name).length > 48) {
      throw new Error("Tên hồ sơ dài tối đa 48 ký tự.");
    }
    return name;
  }

  function fileName(raw) {
    const name = normalizeName(raw);
    const slug = name.normalize("NFD")
      .replace(/\p{M}+/gu, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "");
    return "UpLocket-" + (slug || "ca-nhan") + ".mobileconfig";
  }

  function escapeXML(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function makeProfile(raw) {
    const name = escapeXML(normalizeName(raw));
    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadType</key><string>Configuration</string>
  <key>PayloadVersion</key><integer>1</integer>
  <key>PayloadIdentifier</key><string>local.uplocket.install-guide</string>
  <key>PayloadUUID</key><string>941A4916-7FAD-4F3E-BD3A-B2626B193B76</string>
  <key>PayloadDisplayName</key><string>${name}</string>
  <key>PayloadDescription</key><string>Thêm lối tắt đến hướng dẫn UpLocket trên Màn hình chính.</string>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>PayloadType</key><string>com.apple.webClip.managed</string>
      <key>PayloadVersion</key><integer>1</integer>
      <key>PayloadIdentifier</key><string>local.uplocket.install-guide.shortcut</string>
      <key>PayloadUUID</key><string>3183EF14-37F4-4885-83CF-38F2F4D29FEF</string>
      <key>PayloadDisplayName</key><string>${name}</string>
      <key>Label</key><string>${name}</string>
      <key>URL</key><string>https://uplocket.io.vn/install-guide</string>
      <key>IsRemovable</key><true/>
      <key>Icon</key><data>${iconData}</data>
    </dict>
  </array>
</dict>
</plist>
`;
  }

  window.ProfileMaker = Object.freeze({ normalizeName, fileName, makeProfile });
})();
