-- Tighten leads insert policy to avoid permissive RLS
DROP POLICY IF EXISTS "Authenticated can insert leads" ON public.leads;
CREATE POLICY "Authenticated can insert leads"
ON public.leads
FOR INSERT
TO authenticated
WITH CHECK (source IN ('website', 'meta'));