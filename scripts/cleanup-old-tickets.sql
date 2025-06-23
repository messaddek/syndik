-- Script to clean up tickets created under old configuration
-- Run this in your database to remove tickets that shouldn't exist per new specs

-- 1. Delete tickets where admin/manager created tickets for themselves (authorId = their userId and no residentId)
DELETE FROM helpdesk_tickets 
WHERE author_id IN (
  SELECT a.user_id
    FROM accounts a
    WHERE a.role IN ('admin', 'manager')
)
    AND resident_id IS NULL
    AND is_b2b = false;

-- 2. Delete tickets where the author doesn't have access to resident portal
-- (i.e., no linked resident record in users table)
DELETE FROM helpdesk_tickets 
WHERE author_id NOT IN (
  SELECT DISTINCT u.user_id
    FROM users u
    WHERE u.resident_id IS NOT NULL
)
    AND author_id NOT IN (
  SELECT DISTINCT a.user_id
    FROM accounts a
    WHERE a.role = 'member'
)
    AND is_b2b = false;

-- 3. Show remaining tickets for verification
SELECT
    ht.id,
    ht.title,
    ht.author_id,
    ht.resident_id,
    a.name as author_name,
    a.role as author_role,
    ht.created_at
FROM helpdesk_tickets ht
    LEFT JOIN accounts a ON a.user_id = ht.author_id
WHERE ht.is_b2b = false
ORDER BY ht.created_at DESC;
