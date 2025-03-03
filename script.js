document.addEventListener('DOMContentLoaded', function() {
  
const uttaradhikariRajya = document.getElementById('uttaradhikariRajya');
  const uttaradhikariSambhag = document.getElementById('uttaradhikariSambhag');
  const uttaradhikariJila = document.getElementById('uttaradhikariJila');

  // उत्तराधिकारी के राज्य लोड करें
  Object.keys(locationData).forEach(rajya => {
    const option = document.createElement('option');
    option.value = rajya;
    option.textContent = rajya;
    uttaradhikariRajya.appendChild(option);
  });

  // उत्तराधिकारी के संभाग अपडेट करें
  uttaradhikariRajya.addEventListener('change', function() {
    const rajya = this.value;
    uttaradhikariSambhag.innerHTML = '<option value="">चुनें</option>';
    uttaradhikariJila.innerHTML = '<option value="">चुनें</option>';
    if (rajya) {
      Object.keys(locationData[rajya]).forEach(sambhag => {
        const option = document.createElement('option');
        option.value = sambhag;
        option.textContent = sambhag;
        uttaradhikariSambhag.appendChild(option);
      });
    }
  });

  // उत्तराधिकारी के जिले अपडेट करें
  uttaradhikariSambhag.addEventListener('change', function() {
    const rajya = uttaradhikariRajya.value;
    const sambhag = this.value;
    uttaradhikariJila.innerHTML = '<option value="">चुनें</option>';
    if (rajya && sambhag) {
      locationData[rajya][sambhag].forEach(jila => {
        const option = document.createElement('option');
        option.value = jila;
        option.textContent = jila;
        uttaradhikariJila.appendChild(option);
      });
    }
  });

const senaniRajya = document.getElementById('senaniRajya');
  const senaniSambhag = document.getElementById('senaniSambhag');
  const senaniJila = document.getElementById('senaniJila');
  const senaniNaam = document.getElementById('senaniNaam');
  const sambandh = document.getElementById('sambandh');
  const extraFields = document.getElementById('extraFields');

  // राज्य, संभाग, जिला डेटा (उदाहरण)
  const locationData = {
    'उत्तर प्रदेश': {
      'लखनऊ': ['लखनऊ', 'कानपुर', 'बाराबंकी'],
      'इलाहाबाद': ['इलाहाबाद', 'प्रयागराज', 'कौशाम्बी']
    },
    'मध्य प्रदेश': {
      'भोपाल': ['भोपाल', 'सीहोर', 'रायसेन'],
      'इंदौर': ['इंदौर', 'धार', 'खरगोन']
    }
  };

  // ड्रॉप-डाउन में राज्य लोड करें
  Object.keys(locationData).forEach(rajya => {
    const option = document.createElement('option');
    option.value = rajya;
    option.textContent = rajya;
    senaniRajya.appendChild(option);
  });

  // राज्य बदलने पर संभाग अपडेट करें
  senaniRajya.addEventListener('change', function() {
    const rajya = this.value;
    senaniSambhag.innerHTML = '<option value="">चुनें</option>';
    senaniJila.innerHTML = '<option value="">चुनें</option>';
    if (rajya) {
      Object.keys(locationData[rajya]).forEach(sambhag => {
        const option = document.createElement('option');
        option.value = sambhag;
        option.textContent = sambhag;
        senaniSambhag.appendChild(option);
      });
    }
  });

  // संभाग बदलने पर जिले अपडेट करें
  senaniSambhag.addEventListener('change', function() {
    const rajya = senaniRajya.value;
    const sambhag = this.value;
    senaniJila.innerHTML = '<option value="">चुनें</option>';
    if (rajya && sambhag) {
      locationData[rajya][sambhag].forEach(jila => {
        const option = document.createElement('option');
        option.value = jila;
        option.textContent = jila;
        senaniJila.appendChild(option);
      });
    }
  });

  // नया राज्य/संभाग/जिला जोड़ें (उदाहरण)
  document.getElementById('addSenaniRajya').addEventListener('click', function() {
    const newRajyaInput = document.getElementById('newSenaniRajya');
    if (newRajyaInput.style.display === 'none') {
      newRajyaInput.style.display = 'block';
    } else {
      const newRajya = newRajyaInput.value;
      if (newRajya) {
        const option = document.createElement('option');
        option.value = newRajya;
        option.textContent = newRajya;
        senaniRajya.appendChild(option);
        locationData[newRajya] = {}; // नया राज्य डेटा संरचना में जोड़ें
        // Google Sheet में नया राज्य जोड़ने के लिए Google Apps Script फ़ंक्शन को कॉल करें
      }
      newRajyaInput.style.display = 'none';
    }
  });

  // संभाग और जिले के लिए भी इसी तरह का कोड

  // Google Sheet से सेनानी नाम लोड करें (उदाहरण)
  fetch('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL?action=getSenaniNames')
    .then(response => response.json())
    .then(data => {
      data.forEach(naam => {
        const option = document.createElement('option');
        option.value = naam;
        option.textContent = naam;
        senaniNaam.appendChild(option);
      });
    })
    .catch(error => console.error('सेनानी नाम लोड करने में त्रुटि:', error));

  // नया सेनानी नाम जोड़ें (उदाहरण)
  document.getElementById('addSenaniNaam').addEventListener('click', function() {
    const newSenaniNaamInput = document.getElementById('newSenaniNaam');
    if (newSenaniNaamInput.style.display === 'none') {
      newSenaniNaamInput.style.display = 'block';
    } else {
      const newSenaniNaam = newSenaniNaamInput.value;
      if (newSenaniNaam) {
        const option = document.createElement('option');
        option.value = newSenaniNaam;
        option.textContent = newSenaniNaam;
        senaniNaam.appendChild(option);
        // Google Sheet में नया सेनानी नाम जोड़ने के लिए Google Apps Script फ़ंक्शन को कॉल करें
      }
      newSenaniNaamInput.style.display = 'none';
    }
  });

  // संबंध के अनुसार अतिरिक्त फ़ील्ड दिखाएँ
  sambandh.addEventListener('change', function() {
    const selectedSambandh = this.value;
    extraFields.innerHTML = ''; // पहले सभी अतिरिक्त फ़ील्ड हटाएं

    if (selectedSambandh === 'पोता' || selectedSambandh === 'प्रपौत्र') {
      const pitaNaamLabel = document.createElement('label');
      pitaNaamLabel.textContent = 'पिता का नाम:';
      extraFields.appendChild(pitaNaamLabel);

      const pitaNaamInput = document.createElement('input');
      pitaNaamInput.type = 'text';
      pitaNaamInput.name = 'pitaNaam';
      extraFields.appendChild(pitaNaamInput);
    }

    if (selectedSambandh === 'प्रपौत्र') {
      const dadaNaamLabel = document.createElement('label');
      dadaNaamLabel.textContent = 'दादा का नाम:';
      extraFields.appendChild(dadaNaamLabel);

      const dadaNaamInput = document.createElement('input');
      dadaNaamInput.type = 'text';
      dadaNaamInput.name = 'dadaNaam';
      extraFields.appendChild(dadaNaamInput);
    }
  });

  // फ़ॉर्म सबमिट करें
  const form = document.getElementById('senaniForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Google Apps Script वेब ऐप URL
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbyPLaBRhg83rtQN659D8sFQM1vlSteYs2RPscPwTvgnR3tHQ5zEmSshZOTQhNb3DUed/exec';

    fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      console.log('डेटा सफलतापूर्वक सबमिट किया गया:', response);
      alert("डेटा सफलतापूर्वक सबमिट किया गया");
      form.reset();
    })
    .catch(error => {
      console.error('डेटा सबमिट करने में त्रुटि:', error);
      alert("डेटा सबमिट करने में त्रुटि आई");
    });
  });
});
