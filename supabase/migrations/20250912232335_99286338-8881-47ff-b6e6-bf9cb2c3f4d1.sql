-- Fix security vulnerability in lesson_plan_cache table
-- Remove overly permissive policies that allow public access
DROP POLICY IF EXISTS "Allow insert for cache" ON public.lesson_plan_cache;
DROP POLICY IF EXISTS "Allow read access for cache" ON public.lesson_plan_cache;
DROP POLICY IF EXISTS "Allow update for cache" ON public.lesson_plan_cache;

-- Create secure policies that require authentication
CREATE POLICY "Authenticated users can read lesson plan cache" 
ON public.lesson_plan_cache 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert into lesson plan cache" 
ON public.lesson_plan_cache 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update lesson plan cache" 
ON public.lesson_plan_cache 
FOR UPDATE 
TO authenticated
USING (true);