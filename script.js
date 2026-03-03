const WHATSAPP = '918989925852';
const UPI_ID = 'gauravverma.otp@oksbi';

const planSelect = document.getElementById('plan-select');
const amountResult = document.getElementById('amount-result');
const qrSection = document.getElementById('qr-section');
const qrImg = document.getElementById('qr-img');
const instructions = document.getElementById('instructions');
const screenshotInput = document.getElementById('screenshot');

function selectedPlanAmount() {
  return Number(planSelect.options[planSelect.selectedIndex].dataset.inr || 0);
}

function buildUpiQr(amount) {
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=Gaurav AI Services&am=${amount}&cu=INR`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(upiLink)}`;
}

function updatePaymentInfo() {
  const amount = selectedPlanAmount();
  amountResult.textContent = `Payable Amount: ₹${amount}`;
  qrImg.src = buildUpiQr(amount);
  instructions.innerHTML = `Selected Plan Amount: <strong>₹${amount}</strong><br>UPI ID: <strong>${UPI_ID}</strong><br>After payment send screenshot on WhatsApp: <strong>+91 89899 25852</strong>.`;
}

function buildWhatsappMessage() {
  const name = document.getElementById('name').value.trim() || '-';
  const phone = document.getElementById('phone').value.trim() || '-';
  const email = document.getElementById('email').value.trim() || '-';
  const plan = planSelect.value;
  const amount = selectedPlanAmount();
  const screenshot = screenshotInput.files?.[0]?.name || 'Not selected';

  return [
    '*NEW ORDER SUBMISSION*',
    `Plan: ${plan}`,
    `Selected Plan Amount: ₹${amount}`,
    `UPI ID: ${UPI_ID}`,
    '',
    '*User Details*',
    `Name: ${name}`,
    `WhatsApp: ${phone}`,
    `Email: ${email}`,
    `Screenshot: ${screenshot}`,
    '',
    'I have completed payment. Please verify and activate my service.'
  ].join('\n');
}

document.getElementById('generate-btn').addEventListener('click', () => {
  updatePaymentInfo();
  qrSection.classList.add('show');
  qrSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.getElementById('send-btn').addEventListener('click', () => {
  const msg = buildWhatsappMessage();
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
});

planSelect.addEventListener('change', updatePaymentInfo);
updatePaymentInfo();
