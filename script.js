const WHATSAPP_NUMBER = '918989925852';

const overlay = document.getElementById('overlay');
const mods = ['chatgptModal', 'geminiModal', 'paymentModal'].map(id => document.getElementById(id));
const selectedPlanText = document.getElementById('selectedPlanText');
const paymentQr = document.getElementById('paymentQr');
const screenshotInput = document.getElementById('ss');

const state = {
  selectedPlan: 'ChatGPT Plus',
  selectedAmount: 499,
  details: {
    name: '',
    country: '',
    state: '',
    city: '',
    whatsapp: '',
    email: ''
  }
};

const open = id => {
  overlay.classList.remove('hidden');
  mods.forEach(m => m.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
};

const closeAll = () => {
  overlay.classList.add('hidden');
  mods.forEach(m => m.classList.add('hidden'));
};

const setPaymentInfo = () => {
  selectedPlanText.textContent = `Selected Plan: ${state.selectedPlan} | Amount: ₹${state.selectedAmount}`;

  // Replace these URLs with the exact QR images you shared if you host them locally.
  // Current implementation keeps QR behavior dynamic by plan amount.
  if (state.selectedAmount >= 12000) {
    paymentQr.src = 'https://gauravaiservices.replit.app/preview.jpg';
  } else if (state.selectedAmount >= 3000) {
    paymentQr.src = 'https://gauravaiservices.replit.app/preview.jpg';
  } else {
    paymentQr.src = 'https://gauravaiservices.replit.app/preview.jpg';
  }
};

document.getElementById('buyChatgpt').onclick = () => {
  state.selectedPlan = 'ChatGPT Plus';
  state.selectedAmount = 499;
  open('chatgptModal');
};

document.getElementById('buyGemini').onclick = () => open('geminiModal');

document.querySelectorAll('.plan-buy').forEach(btn => {
  btn.onclick = () => {
    state.selectedPlan = btn.dataset.plan;
    state.selectedAmount = Number(btn.dataset.amount || 0);
    setPaymentInfo();
    open('paymentModal');
  };
});

document.getElementById('orderForm').onsubmit = e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  state.details = {
    name: (formData.get('name') || '').toString(),
    country: (formData.get('country') || '').toString(),
    state: (formData.get('state') || '').toString(),
    city: (formData.get('city') || '').toString(),
    whatsapp: (formData.get('whatsapp') || '').toString(),
    email: (formData.get('email') || '').toString()
  };
  state.selectedPlan = 'ChatGPT Plus';
  state.selectedAmount = 499;
  setPaymentInfo();
  open('paymentModal');
};

document.getElementById('submitSS').onclick = () => {
  const screenshotFile = screenshotInput.files?.[0]?.name || 'No file selected';

  const msg = [
    '*NEW ORDER SUBMISSION*',
    '',
    `Plan: ${state.selectedPlan}`,
    `Amount: ₹${state.selectedAmount}`,
    'UPI ID: gauravverma.otp@oksbi',
    '',
    '*Customer Details*',
    `Name: ${state.details.name || '-'}`,
    `Country: ${state.details.country || '-'}`,
    `State: ${state.details.state || '-'}`,
    `City: ${state.details.city || '-'}`,
    `WhatsApp: ${state.details.whatsapp || '-'}`,
    `Email: ${state.details.email || '-'}`,
    '',
    `Screenshot file selected: ${screenshotFile}`,
    'Please attach and send the payment screenshot in this chat.'
  ].join('\n');

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
};

document.querySelectorAll('[data-close]').forEach(b => b.onclick = closeAll);
overlay.onclick = closeAll;
