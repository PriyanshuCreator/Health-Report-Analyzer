function openTab(tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";

    // Add animation for tab change
    document.getElementById(tabName).classList.add('fade-in');
}

function submitReport() {
    const fileInput = document.getElementById('reportInput');
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select a file.");
        return;
    }

    const formData = new FormData();
    formData.append('report', file);

    const loadingDiv = document.getElementById('loading');
    loadingDiv.style.display = 'block';

    fetch('/predict', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            const predictionResultDiv = document.getElementById('predictionResult');
            if (data.prediction == "Patient Has Diabetes") {
                predictionResultDiv.innerText = data.prediction;
                // Show suggestions if person has diabetes
                const suggestionsDiv = document.getElementById('suggestions');
                suggestionsDiv.innerHTML = `
                <div style = "background-color : #68FD3F;
                border-radius : 10px">
                <h2 style="font-size: 28px; padding :10px;  
                 ">Suggestions</h2>
                <a href="https://www.supremehospital.in/" target="_blank" rel="noreferrer noopener">Nearby Hospital</a>
                <a href="https://www.niddk.nih.gov/health-information/diabetes/overview/managing-diabetes/4-steps" target="_blank" rel="noreferrer noopener">Medical Suggestion</a>
                <a href="https://www.mayoclinic.org/diseases-conditions/diabetes/in-depth/diabetes-diet/art-20044295" target="_blank" rel="noreferrer noopener">Diet Suggestion</a>
                <a href="https://diabetesmantra.com/faridabad/diabetes-doctor/" target="_blank" rel="noreferrer noopener">Book Online Consultancy</a><br> 
                <br><br></div>
                
            `;
                suggestionsDiv.style.display = 'block';  // Show suggestions

                // Change tab background based on prediction result
                const analyserTab = document.getElementById('analyserTab');
                const analyserContent = document.getElementById('analyser');
                analyserTab.classList.remove('negative');
                analyserTab.classList.add('diabetes');
                analyserContent.classList.remove('negative');
                analyserContent.classList.add('diabetes');
            } else {
                alert(data.error);
            }
            loadingDiv.style.display = 'none';
        })
        .catch(error => {
            console.error('Error:', error);
            loadingDiv.style.display = 'none';
        });
}
