# 🏆 Pokémon Champion Challenge

<div align="center">

![Pokemon](https://img.shields.io/badge/Pokémon-Challenge-red)
![React](https://img.shields.io/badge/React-18-blue)
![License](https://img.shields.io/badge/license-MIT-green)

> *"Face the strongest trainer in Sinnoh! Challenge Champion Cynthia and prove your worth as a Pokémon trainer!"*

<h1 align="center">
  🎮 <a href="https://shimmering-travesseiro-bc7d4a.netlify.app" target="_blank" style="font-size: 2em;">Try the Live Demo!</a>
</h1>

</div>

## ✨ Features

- 🎮 Interactive Pokémon selection through animated Pokéballs
- 🔄 Mid-game trading system with strategic choices
- 🌟 Dynamic team building with 6 unique Pokémon
- ⚔️ Final showdown against Champion Cynthia
- 📱 Responsive design with sleek dark theme

## 🗺️ Routes and Navigation

### 🏠 Home Page (`/`)
- Welcome screen with epic introduction
- Champion Cynthia's imposing presence
- Begin your journey with a single click

### 🎯 Selection Pages (`/select/:step`)
> *Build your team step by step, choose wisely!*

| Steps | Purpose | Features |
|-------|---------|----------|
| 1-3 | Initial Team | 6 Pokéballs per step |
| 4-6 | Final Team | Post-trade selections |

### 💱 Trading Page (`/trade`)
```
Available after selecting your first 3 Pokémon!
Choose carefully - this decision could make or break your team.
```

### 🏁 Final Team Display (`/final-team`)
- 📊 Complete team comparison
- 🎨 Type-coded display
- 🔄 Option to restart challenge

## 🛠️ Technical Stack

<div align="center">

| Technology | Purpose |
|------------|---------|
| ⚛️ React 18 | Core Framework |
| 🛣️ React Router v6 | Navigation |
| 🔄 Axios | API Integration |
| 🎨 Tailwind CSS | Styling |
| ⚡ Vite | Build Tool |

</div>

## 🧠 State Management
```javascript
// Using React Context for global state
const PokemonContext = {
  selectedPokemon: [], // Your team
  trading: boolean,    // Trading state
  progression: number  // Current step
}
```

## 🌐 API Integration

> Powered by [PokéAPI](https://pokeapi.co/api/v2)

- 🖼️ High-quality Pokémon artwork
- ℹ️ Comprehensive Pokémon data
- 📊 Type information and stats

## ⚡ Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/hvega6/React-with-pokemon-api
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Launch Development Server**
   ```bash
   npm run dev
   ```

4. **Begin Your Journey**
   > Open http://localhost:5173 and start your challenge!

## 📦 Dependencies

- ⚛️ `react` - Core framework
- 🛣️ `react-router-dom` - Navigation
- 🔄 `axios` - API calls
- 🎨 `tailwindcss` - Styling

## 🎮 Game Features

### Type-Based Color Coding
| Type | Color |
|------|--------|
| Fire | 🔴 Red |
| Water | 🔵 Blue |
| Grass | 💚 Green |
| Electric | 💛 Yellow |
| *and more!* |

### Progression System
```
Home → Selection (1-3) → Trading → Selection (4-6) → Final Team
```

## 🔜 Future Enhancements

- [ ] Battle simulation system
- [ ] Team storage functionality
- [ ] Additional champion challenges
- [ ] Enhanced trading mechanics
- [ ] Multiple difficulty levels

## 🤝 Contributing

Feel free to contribute to this project! Check out our [contributing guidelines](CONTRIBUTING.md).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by Hugo Vega

</div>
