-- The Study Blueprint Database Schema

-- 1. Materials Table (Notes, PYQs, Sample Papers, CBSE Notices, Videos)
CREATE TABLE IF NOT EXISTS public.materials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('notes', 'pyqs', 'sample_papers', 'cbse_notices', 'videos')),
    subject TEXT DEFAULT 'General',
    file_url TEXT,
    video_url TEXT,
    description TEXT,
    class_name TEXT DEFAULT 'Class 10',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Announcements Table
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT DEFAULT 'website' CHECK (type IN ('website', 'channel')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Live Tests Table (Google Form integration)
CREATE TABLE IF NOT EXISTS public.tests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    google_form_url TEXT NOT NULL,
    subject TEXT DEFAULT 'General',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;

-- Policies for public reading
CREATE POLICY "Allow public read materials" ON public.materials FOR SELECT USING (true);
CREATE POLICY "Allow public read announcements" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Allow public read tests" ON public.tests FOR SELECT USING (true);

-- Policies for inserts/updates (Admin access - can be restricted or open for initial setup)
CREATE POLICY "Allow all insert materials" ON public.materials FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all insert announcements" ON public.announcements FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all insert tests" ON public.tests FOR INSERT WITH CHECK (true);
