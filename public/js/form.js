document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("sollicitatieForm").addEventListener("submit", function (e) {
        e.preventDefault(); // prevent normal form submission

        var formData = new FormData(this);

        fetch("./sendemail.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                // Show a popup or message based on response
                alert(data);
                document.getElementById("sollicitatieForm").reset(); // reset form if needed
            })
            .catch(error => {
                alert("Oops — something went wrong.");
                console.error(error);
            });
    });
});