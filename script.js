document.addEventListener('DOMContentLoaded', function() {
    const senaniRajya = document.getElementById('senaniRajya');
    const senaniSambhag = document.getElementById('senaniSambhag');
    const senaniJila = document.getElementById('senaniJila');
    const senaniNaam = document.getElementById('senaniNaam');
    const nayaSenaniNaam = document.getElementById('nayaSenaniNaam');
    const nayaSenaniButton = document.getElementById('nayaSenaniButton');
    const sambandh = document.getElementById('sambandh');
    const sambandhFields = document.getElementById('sambandhFields');
    const senaniData = {
        'उत्तर प्रदेश': {
            'लखनऊ': ['लखनऊ', 'कानपुर', 'बाराबंकी'],
            'इलाहाबाद': ['इलाहाबाद', 'प्रयागराज', 'कौशाम्बी']
            // और संभाग और जिले जोड़ें
        },
        // अन्य राज्यों के डेटा जोड़ें
    };
    const senaniNaamData = ['सेनानी 1', 'सेनानी 2', 'सेनानी 3']; // Google Sheets से लोड करें

    // राज्य बदलने पर संभाग और जिले अपडेट करें
    senaniRajya.addEventListener('change', function() {
        const rajya = this.value;
        senaniSambhag.innerHTML = '<option value="">चुनें</option>';
        senaniJila.innerHTML = '<option value="">चुनें</option>';
        if (rajya) {
            Object.keys(senaniData[rajya]).forEach(sambhag => {
                const option = document.createElement('option');
                option.value = sambhag;
                option.textContent = sambhag;
                senaniSambhag.appendChild(option);
            });
        }
    });

    senaniSambhag.addEventListener('change', function() {
        const rajya = senaniRajya.value;
        const sambhag = this.value;
        senaniJila.innerHTML = '<option value="">चुनें</option>';
        if (rajya && sambhag) {
            senaniData[rajya][sambhag].forEach(jila => {
                const option = document.createElement('option');
                option.value = jila;
                option.textContent = jila;
                senaniJila.appendChild(option);
            });
        }
    });

    // सेनानी नाम डेटा लोड करें
    senaniNaamData.forEach(naam => {
        const option = document.createElement('option');
        option.value = naam;
        option.textContent = naam;
        senaniNaam.appendChild(option);
    });

    // नया सेनानी नाम जोड़ें
    nayaSenaniButton.addEventListener('click', function() {
        if (nayaSenaniNaam.style.display === 'none') {
            nayaSenaniNaam.style.display = 'block';
        } else {
            const naam = nayaSenaniNaam.value;
            if (naam) {
                const option = document.createElement('option');
                option.value = naam;
                option.textContent = naam;
                senaniNaam.appendChild(option);
                nayaSenaniNaam.value = '';
            }
            nayaSenaniNaam.style.display = 'none';
        }
    });

    // संबंध के अनुसार फ़ील्ड दिखाएँ
    sambandh.addEventListener('change', function() {
        const samb = this.value;
        sambandhFields.innerHTML = '';
        if (samb === 'पोता') {
            const pitaNaam = document.createElement('input');
            pitaNaam.type = 'text';
            pitaNaam.placeholder = 'पिता का नाम';
            sambandhFields.appendChild(pitaNaam);
        } else if (samb === 'प्रपौत्र') {
            const pitaNaam = document.createElement('input');
            pitaNaam.type = 'text';
            pitaNaam.placeholder = 'पिता का नाम';
            sambandhFields.appendChild(pitaNaam);

            const dadaNaam = document.createElement('input');
            dadaNaam.type = 'text';
            dadaNaam.placeholder = 'दादा का नाम';
            sambandhFields.appendChild(dadaNaam);
        }
    });

    // फ़ॉर्म सबमिट करने पर डेटा Google Sheets में सेव करें (यहाँ Google Apps Script की आवश्यकता होगी)
 const form = document.getElementById('senaniForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // डिफ़ॉल्ट सबमिशन को रोकें

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Google Apps Script वेब ऐप URL
        const scriptUrl = "https://script.google.com/macros/s/AKfycbxgMH2qwUZ1LorvfD-zaxQSd3OcLkmDNr4SjouRzCb7S4nItO2eun9xiXtO42p_cqYg/exec";

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
            form.reset(); // फॉर्म को रीसेट करें
        })
        .catch(error => {
            console.error('डेटा सबमिट करने में त्रुटि:', error);
            alert("डेटा सबमिट करने में त्रुटि आई");
        });
    });
});
