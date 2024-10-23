# Allegra Technical Test

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Changelog](#changelog)
- [Deployment](#deployment)
- [License](#license)

## Project Overview
This project is a technical test designed for **Allegra** to evaluate my proficiency with the **Vue.js** framework. The application showcases a range of functionalities utilizing **Knox 3** for routing, **Pima** for state management, and middleware for authentication and application state management. 

The application connects with the **Allegra API** to provide a seamless user experience, allowing for dynamic interactions and features.

## Technologies Used
- **Framework**: Vue.js
- **Routing**: Knox 3
- **State Management**: Pima
- **API Integration**: Allegra API, Pexel API
- **Versioning**: Standard Versioning for changelog documentation
- **Deployment**: Vercel
- **Responsiveness**: Fully responsive design with server-side rendering

## Features
- **User Authentication**: Secure middleware management for user authentication between pages.
- **Dynamic Search Bar**: A responsive search bar that allows users to search for images dynamically, displaying results in real time.
- **Image Integration**: Fetches images from the **Pexel API**, allowing users to view and select images easily.
- **Seller Fetching**: Displays available sellers and their points, enhancing user interaction and choice.
- **Invoice Creation**: Allows users to create invoices via a **POST** request to the Allegra API, generating invoices based on selected items and the seller's information.
- **Responsive Design**: The application is fully responsive, ensuring a seamless experience across devices.
- **UI Consistency**: The design closely resembles the Allegra UI kit, including colors, typography, and icons, providing a familiar interface for users.

## Installation
To get started with this project, follow these steps:
## Installation
To get started with this project, follow these steps:
1. Clone the repository:
```bash\n   git clone https://github.com/your-username/allegra-technical-test.git
cd allegra-technical-test
```
2. Install the necessary dependencies:
```bash
npm install
```
3. Set up your environment variables. Create a `.env` file in the root directory with your Allegra API credentials:
```env
ALLEGRA_API_URL=https://api.allegra.com
PEXEL_API_KEY=your_pexel_api_key
POINTS_TO_WIN=20
INCREMENTS_PER_POINT=3
```
4. Start the development server:
```bash
npm run dev
```
## Usage
Once the development server is running, open your browser and navigate to `http://localhost:3000`. You can interact with the application to test the various features implemented.

## Changelog
All changes and updates to the project are documented in the [CHANGELOG.md](changelog.md) file, following the standard versioning format.

## Deployment
This application is deployed on **Vercel** under a custom domain. You can access the live version of the application [here](https://alegra.raandino.dev/).

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

 ---
Thank you for reviewing my technical test project for Allegra. I look forward to your feedback! Made with love from Managua, Nicaragua <3
