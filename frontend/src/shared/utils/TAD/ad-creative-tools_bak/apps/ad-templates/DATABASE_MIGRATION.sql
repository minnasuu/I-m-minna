-- Migration script to add instance_templates field to adTemplateList table
-- Run this in Supabase SQL Editor

-- Add instance_templates column as JSONB array
ALTER TABLE adTemplateList 
ADD COLUMN IF NOT EXISTS instance_templates JSONB DEFAULT '[]'::jsonb;

-- Add comment to the column
COMMENT ON COLUMN adTemplateList.instance_templates IS 'Array of template instances created by users';

-- Create index for better performance when querying instances
CREATE INDEX IF NOT EXISTS idx_adTemplateList_instance_templates 
ON adTemplateList USING GIN (instance_templates);

-- Optional: Add a constraint to ensure instance_templates is always an array
ALTER TABLE adTemplateList 
ADD CONSTRAINT IF NOT EXISTS chk_instance_templates_is_array 
CHECK (jsonb_typeof(instance_templates) = 'array');
