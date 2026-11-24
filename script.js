
/*
  PALM & PEPPER KITCHEN

  Before using WhatsApp ordering:
  Replace the number below with the restaurant's WhatsApp number.
  Include country code, numbers only.
  Example format: 2348012345678
*/

const WHATSAPP_NUMBER = "";

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// MENU FILTERS

const filterButtons = document.querySelectorAll(".filter-btn");
const foodCards = document.querySelectorAll(".food-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    foodCards.forEach(card => {
      const matches =
        selectedCategory === "all" ||
        card.dataset.category === selectedCategory;

      card.classList.toggle("hidden", !matches);
    });
  });
});

// WHATSAPP ORDERING

function sendWhatsAppOrder(message) {
  if (!WHATSAPP_NUMBER) {
    alert(
      "WhatsApp ordering is not configured yet. Add the restaurant's WhatsApp number in script.js."
    );
    return;
  }

  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

document.querySelectorAll(".order-btn").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.dataset.item;
    const price = Number(button.dataset.price);

    const quantityInput = prompt(
      `How many portions of ${item} would you like?`,
      "1"
    );

    if (quantityInput === null) return;

    const quantity = Number(quantityInput);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
      alert("Enter a valid quantity between 1 and 50.");
      return;
    }

    const total = price * quantity;

    const message =
      `Hello Palm & Pepper Kitchen! I'd like to order:\n\n` +
      `${item}\n` +
      `Quantity: ${quantity}\n` +
      `Price per portion: ₦${price.toLocaleString("en-NG")}\n` +
      `Estimated total: ₦${total.toLocaleString("en-NG")}\n\n` +
      `Please confirm availability and delivery details.`;

    sendWhatsAppOrder(message);
  });
});

// GENERAL CONTACT ORDER BUTTON

document.getElementById("contactOrder").addEventListener("click", () => {
  const message =
    "Hello Palm & Pepper Kitchen! I'd like to make an order. Please share your available meals and ordering details.";

  sendWhatsAppOrder(message);
});
