const apiUrl = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd";
const pricesContainer = document.getElementById("prices");

let previousPrices = {};

// Function to fetch and display cryptocurrency prices
function fetchPrices() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayPrices(data);
        })
        .catch(error => console.error("Error fetching prices:", error));
}

// Function to update the DOM with the latest prices
function displayPrices(prices) {
    pricesContainer.innerHTML = ""; // Clear previous content

    for (const [crypto, value] of Object.entries(prices)) {
        const priceElement = document.createElement("div");
        priceElement.className = "crypto";

        // Determine price trend (rising/falling)
        let trendClass = "";
        if (previousPrices[crypto] !== undefined) {
            trendClass = value.usd > previousPrices[crypto] ? "rising" : "falling";
        }
        previousPrices[crypto] = value.usd;

        priceElement.innerHTML = `
            <span class="crypto-name">${crypto.toUpperCase()}</span>
            <span class="crypto-price ${trendClass}">$${value.usd.toFixed(2)}</span>
        `;
        pricesContainer.appendChild(priceElement);
    }
}

// Fetch and display prices every minute
fetchPrices();
setInterval(fetchPrices, 60000);
