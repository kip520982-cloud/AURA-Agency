# FanFlow NZ Marketing Site

A modern, responsive landing page for FanFlow NZ built with Next.js, TypeScript, and Supabase.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Supabase** for database and authentication
- **React Hot Toast** for notifications
- **Lucide React** for icons

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Supabase (PostgreSQL + Auth)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fanflow-nz-marketing
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your Supabase settings in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Setup

1. Create a new Supabase project
2. Run the SQL schema from `supabase-schema.sql`
3. Enable Row Level Security (RLS)
4. Set up authentication providers

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `NEXT_PUBLIC_SITE_URL` | Site URL | No |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | No |

## 🎨 Design System

### Colors
- **Primary**: `#FF6B35` (Pohutukawa Orange)
- **Secondary**: `#2C3E50` (Tasman Sea Blue)
- **Accent**: `#27AE60` (NZ Green)
- **Neutral**: `#ECF0F1` (Cloud White)

### Typography
- **Font**: Inter
- **Headings**: Bold weight
- **Body**: Regular weight

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Optimized for touch interactions

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm start
```

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 📊 Analytics

The site tracks:
- Page views
- Button clicks
- Form submissions
- User sessions

All data is stored in Supabase analytics tables.

## 🔐 Security

- Row Level Security (RLS) enabled
- Environment variables for secrets
- Input validation on forms
- CSRF protection
- XSS protection

## 🌐 SEO

- Meta tags optimized
- Open Graph tags
- Twitter Card tags
- Structured data
- Sitemap generation

## 📧 Contact

- Email: hello@fanflow.nz
- Phone: +64-9-886-7114
- Website: https://fanflow.nz

## 📄 License

MIT License - see LICENSE file for details.