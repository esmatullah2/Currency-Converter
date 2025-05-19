 async function convert() {
        const base = document.getElementById("base").value;
        const symbols = document.getElementById("symbols").value;
        const amount = document.getElementById("amount").value;
        const resultDiv = document.getElementById("result");
        const resultValue = document.getElementById("result-value");
        const conversionText = document.getElementById("conversion-text");
        const loading = document.getElementById("loading");
        const error = document.getElementById("error");

        // Validate amount
        if (!amount || isNaN(amount) || amount <= 0) {
          error.style.display = "block";
          error.textContent = "Please enter a valid amount";
          resultDiv.classList.remove("active");
          return;
        }

        // Show loading, hide result and error
        loading.style.display = "block";
        resultDiv.classList.remove("active");
        error.style.display = "none";

        try {
          const myHeaders = new Headers();
          myHeaders.append("apikey", "2dJk2Bb39Owp9PHaWlB7KFfv4To6gQx2");

          const requestOptions = {
            method: "GET",
            redirect: "follow",
            headers: myHeaders,
          };

          const response = await fetch(
            `https://api.apilayer.com/exchangerates_data/latest?symbols=${symbols}&base=${base}`,
            requestOptions
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const result = await response.json();

          if (result.error) {
            throw new Error(result.error.message || "Unknown error occurred");
          }

          const rate = result.rates[symbols];
          const convertedAmount = (amount * rate).toFixed(2);

          resultValue.textContent = `${amount} ${base} = ${convertedAmount} ${symbols}`;
          conversionText.textContent = `1 ${base} = ${rate} ${symbols}`;
          resultDiv.classList.add("active");
          error.style.display = "none";
        } catch (err) {
          console.error("Error:", err);
          error.style.display = "block";
          error.textContent =
            err.message || "An error occurred during conversion";
          resultDiv.classList.remove("active");
        } finally {
          loading.style.display = "none";
        }
      }

      function swapCurrencies() {
        const base = document.getElementById("base");
        const symbols = document.getElementById("symbols");
        const temp = base.value;
        base.value = symbols.value;
        symbols.value = temp;
      }

      // Allow pressing Enter in amount field to convert
      document
        .getElementById("amount")
        .addEventListener("keypress", function (e) {
          if (e.key === "Enter") {
            convert();
          }
        });