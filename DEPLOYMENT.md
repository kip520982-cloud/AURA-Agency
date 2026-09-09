# FanFlow NZ - Deployment Guide

## 🚀 Quick Deploy to Vercel

### 1. Setup Supabase
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Start new project
supabase projects create fanflow-nz-marketing

# Link to project
supabase link --project-ref <your-project-ref>

# Apply schema
supabase db push
```

### 2. Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 📋 Environment Variables Setup

In Vercel dashboard, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://fanflow.nz
NEXT_PUBLIC_CONTACT_EMAIL=hello@fanflow.nz
```

## 🗄️ Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
-- The schema is in supabase-schema.sql
-- Just copy and paste the entire content
```

## 🔐 RLS Policies

The schema includes Row Level Security policies. Make sure they're enabled:

```sql
-- Verify RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('creator_profiles', 'waitlist_entries', 'contact_submissions');
```

## 📊 Analytics Setup

Optional: Add Google Analytics

1. Create GA4 property
2. Add `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` to environment variables
3. Add Google Analytics script to `_document.tsx`

## 🌐 Custom Domain

1. In Vercel dashboard, add custom domain: `fanflow.nz`
2. Update DNS records:
   ```
   A    185.199.108.153
   A    185.199.109.153
   A    185.199.110.153
   A    185.199.111.153
   CNAME www  cname.vercel-dns.com
   ```

## ✅ Pre-launch Checklist

- [ ] Supabase project created
- [ ] Database schema applied
- [ ] Environment variables set
- [ ] RLS policies verified
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Analytics configured
- [ ] Forms working
- [ ] Mobile responsive
- [ ] SEO meta tags correct
- [ ] Loading speed optimized

## 🚀 Launch Commands

```bash
# Build and test locally
npm run build
npm run start

# Deploy to production
vercel --prod

# Check deployment
curl https://fanflow.nz
```

## 📈 Post-Launch

1. Monitor Vercel analytics
2. Check Supabase logs
3. Test waitlist form submissions
4. Verify email notifications
5. Monitor error rates