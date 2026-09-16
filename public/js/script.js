// JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false);
  });
})();

// =========================
// Tax Toggle
// =========================

let taxSwitch = document.getElementById("flexSwitchCheckDefault");

if (taxSwitch) {

    let listingLinks = document.querySelectorAll(".listing-link");

    function updateGSTLinks() {

        listingLinks.forEach(link => {

            let url = new URL(link.href);

            if (taxSwitch.checked) {
                url.searchParams.set("gst", "true");
            } else {
                url.searchParams.delete("gst");
            }

            link.href = url.toString();

        });
    }


    taxSwitch.addEventListener("change", () => {

        let prices = document.getElementsByClassName("card-price");

        for (let price of prices) {

            let originalPrice = Number(price.dataset.price);

            if (taxSwitch.checked) {

                let totalPrice = originalPrice * 1.11;

                price.innerText =
                    "₹ " + totalPrice.toLocaleString("en-IN");

            } else {

                price.innerText =
                    "₹ " + originalPrice.toLocaleString("en-IN");

            }
        }

        // Update listing links
        updateGSTLinks();

    });


    // Set links when page loads
    updateGSTLinks();

}