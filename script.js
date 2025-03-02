document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();

        // फॉर्म डेटा इकट्ठा करें
        let formData = {
            senaniState: document.querySelector("select[name='senaniState']").value,
            senaniDivision: document.querySelector("select[name='senaniDivision']").value,
            senaniDistrict: document.querySelector("select[name='senaniDistrict']").value,
            senaniName: document.querySelector("input[name='senaniName']").value,
            successorName: document.querySelector("input[name='successorName']").value,
            relation: document.querySelector("select[name='relation']").value,
            husbandWifeName: document.querySelector("input[name='husbandWifeName']")?.value || "",
            fatherName: document.querySelector("input[name='fatherName']")?.value || "",
            motherName: document.querySelector("input[name='motherName']")?.value || "",
            grandFatherName: document.querySelector("input[name='grandFatherName']")?.value || "",
            successorState: document.querySelector("select[name='successorState']").value,
            successorDivision: document.querySelector("select[name='successorDivision']").value,
            successorDistrict: document.querySelector("select[name='successorDistrict']").value,
            mobileNumber: document.querySelector("input[name='mobileNumber']").value,
            address: document.querySelector("textarea[name='address']").value,
            idNumber: document.querySelector("input[name='idNumber']").value
        };

        // Google Apps Script URL (वेब ऐप लिंक डालें)
        let scriptURL = "https://script.google.com/macros/s/AKfycbz_l7BZm7m0DNDdWE1ZX5VBHm5zaPhj472kAyXigQYLBu_2EKpFoSFbxKc2yfyOnuw6/exec";

        fetch(scriptURL, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("डेटा सफलतापूर्वक सेव हुआ!");
                document.querySelector("form").reset();
            } else {
                alert("त्रुटि: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("डेटा सेव करने में समस्या हो रही है।");
        });
    });
});
