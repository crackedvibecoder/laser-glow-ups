-- Create a secure leads table for website and Meta lead capture
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  source TEXT NOT NULL DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'new',
  meta_lead_id TEXT,
  meta_form_id TEXT,
  campaign_name TEXT,
  ad_name TEXT,
  page_url TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  raw_payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_source_idx ON public.leads (source);
CREATE UNIQUE INDEX IF NOT EXISTS leads_meta_lead_id_unique_idx ON public.leads (meta_lead_id) WHERE meta_lead_id IS NOT NULL;

-- Enable row level security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Public website visitors may only create website leads
DROP POLICY IF EXISTS "Public can insert website leads" ON public.leads;
CREATE POLICY "Public can insert website leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (source = 'website');

-- Authenticated users can insert non-website leads if needed by future backend/admin tools
DROP POLICY IF EXISTS "Authenticated can insert leads" ON public.leads;
CREATE POLICY "Authenticated can insert leads"
ON public.leads
FOR INSERT
TO authenticated
WITH CHECK (true);

-- No public read access to PII
DROP POLICY IF EXISTS "No public lead reads" ON public.leads;
CREATE POLICY "No public lead reads"
ON public.leads
FOR SELECT
TO anon, authenticated
USING (false);