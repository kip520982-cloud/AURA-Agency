-- FanFlow NZ Marketing Site Database Schema
-- Supabase PostgreSQL Schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Creator profiles table
CREATE TABLE creator_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    creator_name VARCHAR(100) NOT NULL,
    platform VARCHAR(50) NOT NULL CHECK (platform IN ('onlyfans', 'fansly', 'other')),
    platform_username VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    bio TEXT,
    current_fans INTEGER DEFAULT 0,
    monthly_revenue DECIMAL(10,2) DEFAULT 0.00,
    timezone VARCHAR(50) DEFAULT 'Pacific/Auckland',
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'onboarded')),
    referral_source VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Waitlist entries table
CREATE TABLE waitlist_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    creator_name VARCHAR(100),
    platform VARCHAR(50),
    current_fans INTEGER DEFAULT 0,
    monthly_revenue DECIMAL(10,2) DEFAULT 0.00,
    referral_source VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    priority_score INTEGER DEFAULT 0, -- AI-calculated priority score
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contact submissions table
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
    assigned_to UUID REFERENCES creator_profiles(id), -- Staff member assigned
    response TEXT,
    responded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Analytics events table
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(255),
    event_type VARCHAR(50) NOT NULL, -- page_view, button_click, form_submit, etc.
    page_url TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address INET,
    country_code VARCHAR(2),
    event_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Email campaigns table
CREATE TABLE email_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    target_audience VARCHAR(50) NOT NULL, -- all_creators, waitlist, specific_segment
    filters JSONB, -- Targeting filters
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'paused')),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    total_recipients INTEGER DEFAULT 0,
    opens INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    replies INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Email tracking table
CREATE TABLE email_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES email_campaigns(id) ON DELETE CASCADE,
    recipient_email VARCHAR(255) NOT NULL,
    event_type VARCHAR(20) NOT NULL, -- sent, opened, clicked, replied, bounced
    event_data JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Site settings table
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_creator_profiles_email ON creator_profiles(email);
CREATE INDEX idx_creator_profiles_status ON creator_profiles(status);
CREATE INDEX idx_creator_profiles_created_at ON creator_profiles(created_at);
CREATE INDEX idx_waitlist_entries_email ON waitlist_entries(email);
CREATE INDEX idx_waitlist_entries_status ON waitlist_entries(status);
CREATE INDEX idx_waitlist_entries_priority_score ON waitlist_entries(priority_score DESC);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX idx_email_campaigns_status ON email_campaigns(status);
CREATE INDEX idx_email_tracking_campaign_id ON email_tracking(campaign_id);
CREATE INDEX idx_email_tracking_recipient_email ON email_tracking(recipient_email);

-- Create trigger for updating updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to all relevant tables
CREATE TRIGGER update_creator_profiles_updated_at BEFORE UPDATE ON creator_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_waitlist_entries_updated_at BEFORE UPDATE ON waitlist_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_email_campaigns_updated_at BEFORE UPDATE ON email_campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Public policies (read-only for authenticated users)
CREATE POLICY "Public read access for creator profiles" ON creator_profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Public read access for waitlist" ON waitlist_entries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Public read access for contact submissions" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Public insert for analytics events" ON analytics_events FOR INSERT WITH CHECK (true);

-- Service role policies (full access for backend)
CREATE POLICY "Service role full access" ON creator_profiles FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access waitlist" ON waitlist_entries FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access contact" ON contact_submissions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access analytics" ON analytics_events FOR ALL USING (auth.role() = 'service_role');

-- Insert default site settings
INSERT INTO site_settings (setting_key, setting_value, description) VALUES
('site_maintenance', 'false', 'Whether the site is in maintenance mode'),
('waitlist_enabled', 'true', 'Whether the waitlist is currently accepting new entries'),
('max_waitlist_entries', '1000', 'Maximum number of waitlist entries to accept'),
('auto_approve_threshold', '500', 'Automatically approve waitlist entries with revenue above this amount'),
('default_timezone', 'Pacific/Auckland', 'Default timezone for the site'),
('contact_email', 'hello@fanflow.nz', 'Contact email for the site'),
('support_phone', '+64-9-886-7114', 'Support phone number'),
('business_hours', '9:00-17:00 NZST', 'Business hours'),
('feature_flags', '{"beta_features": true, "new_dashboard": false}', 'Feature flags for the site');

-- Create view for waitlist analytics
CREATE VIEW waitlist_analytics AS
SELECT 
    COUNT(*) as total_entries,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_count,
    COUNT(*) FILTER (WHERE status = 'approved') as approved_count,
    COUNT(*) FILTER (WHERE status = 'rejected') as rejected_count,
    AVG(current_fans) as avg_fans,
    AVG(monthly_revenue) as avg_revenue,
    MAX(priority_score) as highest_priority,
    DATE_TRUNC('day', created_at) as entry_date
FROM waitlist_entries
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY entry_date DESC;