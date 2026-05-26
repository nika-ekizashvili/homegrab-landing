# 🏠 HomeGrab Extension

HomeGrab is a Chrome extension designed for real estate agents and individual sellers in Georgia to effortlessly scrape, synchronize, and manage property listings between the country's leading real estate platforms: **SS.ge** and **MyHome.ge**.

---

## 🚀 Key Features

- **One-Click Scraping & Injection**: Extract listing details from MyHome.ge or SS.ge and automatically fill them into the "Create Listing" forms of the other platform.
- **Concurrent Dual Injection**: The **"ორივე პლატფორმაზე" (Both platforms)** button allows concurrent creation of listings on both SS.ge and MyHome.ge.
- **Custom Listing Templates**: Define customized description formats based on listing deal types:
  - **იყიდება (Sale)**
  - **ქირავდება (Rent Monthly)**
  - **ქირავდება დღიურად (Rent Daily)**
  - **გირავდება (Mortgage)**
- **Smart Adjustments**:
  - **Price Addition**: Automatically add a flat surcharge (e.g., agent commission or margin) to the original listing price.
  - **Area Rounding**: Option to round listing total area to the nearest 5 m² (e.g., `43 m²` becomes `45 m²`).
- **Interactive Popup Controls**: Override configurations (Agent Name, Phone, Price Surcharge, and Area Rounding) directly from the popup.
- **SS.ge Draft Confirmation Handling**: The extension automatically detects when SS.ge prompts you to resume an unfinished draft listing, notifies you via Chrome notifications, and waits for your confirmation to avoid overwriting or resetting values.
- **Google Sheets Integration**: Automatically records successfully published listings into a personal **HomeGrab Tracker** spreadsheet, complete with platform links, dates, and property details.
