document.addEventListener("DOMContentLoaded", function () {
    loadStates();
    
    document.getElementById("state").addEventListener("change", loadDivisions);
    document.getElementById("division").addEventListener("change", loadDistricts);
    document.getElementById("registrationForm").addEventListener("submit", submitForm);
});

const stateData = {
    "मध्य प्रदेश": {
        "भोपाल": ["भोपाल", "रायसेन"],
        "इंदौर": ["इंदौर", "देवास"]
    },
    "उत्तर प्रदेश": {
        "लखनऊ": ["लखनऊ", "बाराबंकी"],
        "कानपुर": ["कानपुर नगर", "कानपुर देहात"]
    },
    "छत्तीसगढ़": {
        "रायपुर": ["रायपुर", "बलौदाबाजार"]
    },
    "महाराष्ट्र": {
        "मुंबई": ["मुंबई", "ठाणे"]
    }
};

function loadStates() {
    const stateSelect = document.getElementById("state");
    stateSelect.addEventListener("change", function () {
        if (this.value === "नया") {
            let newState = prompt("नया राज्य दर्ज करें:");
            if (newState) {
                stateData[newState] = {};
                let newOption = document.createElement("option");
                newOption.text = newState;
                newOption.value = newState;
                stateSelect.add(newOption);
                stateSelect.value = newState;
            } else {
                this.value = "";
            }
        }
    });
}

function loadDivisions() {
    let state = document.getElementById("state").value;
    let divisionSelect = document.getElementById("division");
    divisionSelect.innerHTML = "<option value=''>चुनें</option>";

    if (state in stateData) {
        for (let division in stateData[state]) {
            let option = document.createElement("option");
            option.value = division;
            option.textContent = division;
            divisionSelect.appendChild(option);
        }
    }
}

function loadDistricts() {
    let state = document.getElementById("state").value;
    let division = document.getElementById("division").value;
    let districtSelect = document.getElementById("district");
    districtSelect.innerHTML = "<option value=''>चुनें</option>";

    if (state in stateData && division in stateData[state]) {
        stateData[state][division].forEach(district => {
            let option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
}

function submitForm(event) {
    event.preventDefault();

    let formData = {
        state: document.getElementById("state").value,
        division: document.getElementById("division").value,
        district: document.getElementById("district").value,
        freedomFighter: document.getElementById("freedomFighter").value,
        successorName: document.getElementById("successorName").value,
        relation: document.getElementById("relation").value,
        mobile: document.getElementById("mobile").value,
        address: document.getElementById("address").value,
        idNumber: document.getElementById("idNumber").value,
        timestamp: new Date().toLocaleString()
    };

    fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert("✅ डेटा सफलतापूर्वक सेव हो गया!");
            document.getElementById("registrationForm").reset();
        } else {
            alert("❌ डेटा सेव करने में समस्या हुई!");
        }
    })
    .catch(error => {
        alert("❌ नेटवर्क त्रुटि: " + error);
    });
}
