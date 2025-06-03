# TFTT Platform - Frontend

## 🚀 **AI-Powered EU Tech Talent Matching Platform**

TFTT (Teams for the Talent) connects **EU tech professionals** with **German & Swiss employers** through AI-powered matching, eliminating recruitment agency fees and enabling direct communication.

---

## ✨ **Key Features**

### **🤖 AI-Powered Technology**
- **OpenAI GPT-4o Integration**: Advanced accuracy in CV parsing and job matching
- **Smart Skill Recognition**: Automatic extraction and validation
- **Intelligent Recommendations**: Personalized job suggestions
- **Professional Summaries**: AI-generated compelling profiles

### **💰 Transparent Business Model**
- **Free for EU Professionals**: Complete platform access at no cost
- **Pay-Per-CV for Employers**: €4-12 per candidate profile (vs €15K agency fees)
- **Direct Communication**: No recruitment agency middlemen
- **Mutual Interest System**: Quality connections only

### **🌍 EU Market Focus**
- **Immediate Work Eligibility**: EU freedom of movement advantage
- **Premium Markets**: Germany (Berlin, Munich, Frankfurt) & Switzerland (Zurich, Basel)
- **68K+ EU Professionals**: From Austria, Slovakia, Czech Republic, Hungary, Bulgaria, Poland, Romania
- **11K+ Job Opportunities**: High-paying tech positions (€60K-130K+)

---

## 🛠️ **Technology Stack**

### **Frontend**
- **React 18** + **TypeScript** for type-safe development
- **Vite** for fast development and building
- **Tailwind CSS** for responsive, modern design
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Framer Motion** for smooth animations
- **i18next** for internationalization (English/German)

### **Backend Integration**
- **ASP.NET Core 8.0** APIs
- **MySQL** database
- **JWT Authentication**
- **OpenAI GPT-4o** for AI processing
- **Microsoft Azure** infrastructure

### **Design System**
- **Dual Brand Variants**: Teams (Orange) & Talent (Blue)
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG AA compliance
- **Modern UI**: Clean, professional interface

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ and npm
- Modern web browser

### **Installation**
```bash
# Clone the repository
git clone [repository-url]
cd PL_TFTT_Frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### **Environment Setup**
Create `.env` file with required configuration:
```env
VITE_API_BASE_URL=your_backend_api_url
VITE_OPENAI_API_KEY=your_openai_key
```

---

## 📁 **Project Structure**

```
src/
├── components/          # Reusable UI components
│   ├── brand/          # Branded components (typography, cards, etc.)
│   ├── layout/         # Layout components (header, footer, etc.)
│   └── ui/             # Base UI components
├── pages/              # Page components
│   ├── dashboard/      # Dashboard pages (talent/teams)
│   └── auth/           # Authentication pages
├── brand/              # Brand system (colors, themes, variants)
├── hooks/              # Custom React hooks
├── store/              # Redux store configuration
├── utils/              # Utility functions
└── types/              # TypeScript type definitions
```

---

## 🎨 **Brand System**

### **Dual Brand Approach**
- **Teams Variant**: Orange (#F47E22) - Business-focused for employers
- **Talent Variant**: Blue (#478CCA) - Individual-focused for job seekers

### **Branded Components**
- `BrandedH1`, `BrandedH2`, `BrandedH3` - Typography components
- `BrandedCard` - Consistent card layouts
- `BrandedSection` - Section containers
- Dynamic color adaptation based on user type

---

## 📊 **Platform Benefits**

### **For EU Tech Professionals**
- ✅ **100% Free** - No costs or hidden fees
- ✅ **Direct Work Eligibility** - EU freedom of movement
- ✅ **Premium Salaries** - €60K-130K+ opportunities
- ✅ **AI-Enhanced Matching** - Advanced technology
- ✅ **Quality Employers** - Only paying companies contact you

### **For German/Swiss Employers**
- ✅ **Cost-Effective Hiring** - vs traditional recruitment agencies
- ✅ **Streamlined Hiring** - Direct communication
- ✅ **EU-Ready Workforce** - Immediate work authorization
- ✅ **AI Pre-Screening** - Advanced candidate matching
- ✅ **Transparent Pricing** - €4-12 per CV access

---

## 🔧 **Development**

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### **Code Quality**
- **ESLint** + **TypeScript** for code quality
- **Prettier** for code formatting
- **Husky** for git hooks
- **Conventional Commits** for commit messages

---

## 📚 **Documentation**

- **[PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)** - Complete platform overview and benefits
- **[TFTT_BUSINESS_MODEL_SUMMARY.md](./TFTT_BUSINESS_MODEL_SUMMARY.md)** - Business model details
- **[BRAND_IMPLEMENTATION_SUMMARY.md](./BRAND_IMPLEMENTATION_SUMMARY.md)** - Brand system guide

---

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 **Support**

- **Technical Issues**: Create an issue in this repository
- **Business Inquiries**: contact@tftt-platform.com
- **Documentation**: Check the docs folder for detailed guides

---

## 📄 **License**

This project is proprietary software. All rights reserved.

---

*Transform European tech recruitment with AI-powered direct connections.* 🚀 # PL-TFTT-Frontend
