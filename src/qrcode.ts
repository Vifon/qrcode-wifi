const qrcode = require('qrcode-generator');

function generateQRCode() {
  const ssid = (<HTMLInputElement>document.getElementById('ssid')).value;
  const pass = (<HTMLInputElement>document.getElementById('pass')).value;
  const security =
    (<HTMLInputElement>document.querySelector('input[name="security"]:checked')).value;
  const escape = (s: string) => s.replace(/([^0-9a-zA-Z])/g, "\\$1");
  const escapedSsid = escape(ssid);
  const escapedPass = escape(pass);

  const qrtext = "WIFI:S:" + escapedSsid + ";T:" + security + ";P:" + escapedPass + ";;";

  function growQRCodeUntilDataFits(data: string) {
    let qrsize = 4;
    while (qrsize < 20) {
      try {
        const qr = qrcode(qrsize, 'M');
        qr.addData(data);
        qr.make();
        document.getElementById('text_output').textContent = data;
        document.getElementById('img_output').innerHTML = qr.createImgTag(6);
        return;
      } catch (err) {
        qrsize += 1;
      }
    }
  }
  growQRCodeUntilDataFits(qrtext);
}

document.querySelectorAll('input.autorefresh').forEach(
  (x: HTMLInputElement) => x.addEventListener('input', generateQRCode)
);
document.querySelectorAll('input[type="radio"]').forEach(
  (s: HTMLInputElement) => s.onclick = generateQRCode
);
document.getElementById('revealpass').addEventListener(
  'click', function () {
    const pass = document.getElementById('pass');
    if (pass.getAttribute('type') == 'password') {
      pass.setAttribute('type', 'text');
    } else {
      pass.setAttribute('type', 'password');
    }
  }
);

generateQRCode();
