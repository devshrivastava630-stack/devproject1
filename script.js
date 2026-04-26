document.addEventListener("DOMContentLoaded", () => {
    
    // --- FEATURE 1: IMAGE UPLOAD PREVIEW ---
    const imageInput = document.getElementById("image-upload");
    const imagePreview = document.getElementById("image-preview");
    const uploadPlaceholder = document.getElementById("upload-placeholder");
    const submitReportBtn = document.getElementById("submit-report");

    imageInput.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Hide placeholder text and icon
                uploadPlaceholder.style.display = "none";
                
                // Show the image preview
                imagePreview.src = e.target.result;
                imagePreview.style.display = "block";
                
                // Show the submit button
                submitReportBtn.style.display = "inline-block";
            };
            
            reader.readAsDataURL(file);
        }
    });

    submitReportBtn.addEventListener("click", () => {
        alert("Image successfully uploaded to the waste management database!");
        // Reset after submission
        imagePreview.style.display = "none";
        imagePreview.src = "";
        uploadPlaceholder.style.display = "block";
        submitReportBtn.style.display = "none";
        imageInput.value = "";
    });

    // --- FEATURE 2: SIGN UP TO CSV EXPORT ---
    const signupForm = document.getElementById("signup-form");

    signupForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent page refresh

        // Get values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        
        // Create CSV Content
        // We add the BOM (\uFEFF) to ensure Excel reads the encoding correctly
        let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
        csvContent += "Name,Email,Account_Creation_Date\n"; // Headers
        csvContent += `"${name}","${email}","${new Date().toLocaleDateString()}"\n`; // Row data

        // Encode and trigger download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "new_user_data.csv");
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert("Sign Up successful! User data has been exported as a CSV file.");
        signupForm.reset();
    });
});