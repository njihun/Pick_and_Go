# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**PIGO (Pick & Go)** is a Korean tourism recommendation web application that provides personalized tour recommendations based on user preferences and location data. The application integrates with the Korea Tourism Organization's TourAPI and includes features for user authentication, favorite attractions, and personalized recommendations.

## Architecture

### Core Structure
- **Single Page Application (SPA)**: Uses dynamic content loading without page refreshes
- **Module-based JavaScript**: ES6 modules with dynamic imports for page routing
- **API Integration**: Communicates with backend at `https://d0g0h1.world` for user data and recommendations
- **Authentication**: Kakao OAuth integration with JWT token management

### Key Components

#### Main Application Files
- `index.html`: Main landing page with location selection and recommendation options
- `index.js`: Core application logic, authentication handling, and routing
- `pageLoad.js`: Page loading functions for different views (mypage, favorites, tour data, random tour)

#### Feature-Specific Pages
- `randomTour.js`: Random tour recommendation system with swipe-like interface
- `tour-data.js`: Detailed tour information display with statistics and reviews
- `hotplace.js`: Popular destinations display with ranking system
- `mypage.js`: User profile management
- `favoriteAttractions.js`: User's saved attractions management

#### Data Management
- `parser.js`: CSV data parsing for Korean regions (sido/sigungu) and tour categories
- CSV files in `data/` directory: Korean administrative divisions and tour classification codes

### Page Navigation System
The application uses a function-based routing system:
- `mypage()`: User profile page
- `favoriteAttractions()`: Saved attractions
- `tourData()`: Detailed tour information
- `randomTourRecommned()`: Random tour recommendations

URL parameters control page content:
- `?type=tour-data&id={tourId}`: Tour detail page
- `?type=recommend-data`: Recommendation results

### Authentication Flow
1. Kakao OAuth popup authentication
2. JWT token storage in `sessionStorage`
3. User profile data management
4. Automatic logout functionality

### API Integration
- **Backend URL**: `https://d0g0h1.world`
- **Tour Data**: Korea Tourism Organization TourAPI
- **User Management**: Custom backend for profiles and preferences
- **Recommendations**: ML-based recommendation engine

## Development Commands

This is a static web application with no build process required:

### Local Development
```bash
# Serve the application locally (any static server)
npx serve .
# or
python -m http.server 8000
# or use Live Server extension in VS Code
```

### File Structure
```
├── index.html          # Main landing page
├── style.css           # Global styles
├── index.js            # Main application logic
├── pageLoad.js         # Page routing functions
├── randomTour.js       # Random tour feature
├── tour-data.js        # Tour detail pages
├── hotplace.js         # Popular places display
├── mypage.js           # User profile management
├── favoriteAttractions.js # Saved attractions
├── parser.js           # CSV data parsing utilities
├── data/               # CSV data files for regions and categories
└── imgs/               # Image assets
```

## Key Features

### Location Selection
- Korean administrative region dropdown (시/도 → 시/군/구)
- Multi-location selection support
- CSV-based region data parsing

### Recommendation System
- Random tour recommendations with swipe interface
- Location-based recommendations
- User preference-based suggestions
- Tour package planning

### User Features
- Kakao social login
- Profile management (name, email, age, gender)
- Favorite attractions management
- Visit history tracking
- Rating and review system

### Tour Information
- Detailed tour information from TourAPI
- Image galleries
- User reviews and ratings
- Visit statistics and demographics
- Interactive maps integration

## API Endpoints

### User Management
- `POST /user/setUserInfo`: Update user profile
- `GET /user/getUserInfo`: Get user information

### Tour Management
- `GET /tour/getTourDetail?contentId={id}`: Get tour details
- `POST /tour/getTour`: Get multiple tours
- `POST /tour/setInterTour`: Manage favorite attractions
- `GET /tour/getInterTour`: Get user's favorite attractions
- `GET /tour/getHotplace/{criteria}`: Get popular destinations

### Recommendations
- `POST /recommend/getRecommendTour`: Get tour recommendations
- `POST /recommend/getRecommendPlan`: Get travel itinerary
- `GET /recommend/getRandomTour`: Get random tour suggestions

## Data Sources
- **Korea Tourism Organization TourAPI**: Official tourism data
- **Administrative Divisions**: Korean government CSV data for regions
- **Tour Classification**: Official tour category codes

## Browser Compatibility
- Modern browsers with ES6 module support
- LocalStorage and SessionStorage required
- Fetch API support required