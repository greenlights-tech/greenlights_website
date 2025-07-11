document.addEventListener('DOMContentLoaded', function () {
    const sollicitatieForm = document.getElementById("sollicitatieForm");
    if (sollicitatieForm) {
        sollicitatieForm.addEventListener("submit", function (e) {
            e.preventDefault();

            var formData = new FormData(this);

            fetch("./php/sendsolemail.php", {
                method: "POST",
                body: formData
            })
                .then(response => response.text())
                .then(data => {
                    alert(data);
                    sollicitatieForm.reset();
                })
                .catch(error => {
                    alert("Oops — something went wrong.");
                    console.error(error);
                });
        });
    }

    const opdrachtgeverForm = document.getElementById("opdrachtgeverForm");
    if (opdrachtgeverForm) {
        opdrachtgeverForm.addEventListener("submit", function (e) {
            e.preventDefault();

            var formData = new FormData(this);

            fetch("./php/sendopdemail.php", {
                method: "POST",
                body: formData
            })
                .then(response => response.text())
                .then(data => {
                    alert(data);
                    opdrachtgeverForm.reset();
                })
                .catch(error => {
                    alert("Oops — something went wrong.");
                    console.error(error);
                });
        });
    }
});
