-- Quick script to identify tickets that need cleanup
-- Run this first to see what tickets would be affected

-- 1. Show tickets where admin/manager created tickets for themselves
    SELECT
        ht.id,
        ht.title,
        ht.author_id,
        ht.resident_id,
        a.name as author_name,
        a.role as author_role,
        'Admin/Manager ticket for self' as issue_type,
        ht.created_at
    FROM helpdesk_tickets ht
        LEFT JOIN accounts a ON a.user_id = ht.author_id
    WHERE ht.author_id IN (
  SELECT a.user_id
        FROM accounts a
        WHERE a.role IN ('admin', 'manager')
)
        AND ht.resident_id IS NULL
        AND ht.is_b2b = false

UNION ALL

    -- 2. Show tickets where the author doesn't have access to resident portal
    SELECT
        ht.id,
        ht.title,
        ht.author_id,
        ht.resident_id,
        a.name as author_name,
        a.role as author_role,
        'No resident portal access' as issue_type,
        ht.created_at
    FROM helpdesk_tickets ht
        LEFT JOIN accounts a ON a.user_id = ht.author_id
    WHERE ht.author_id NOT IN (
  SELECT DISTINCT u.user_id
        FROM users u
        WHERE u.resident_id IS NOT NULL
)
        AND ht.author_id NOT IN (
  SELECT DISTINCT a.user_id
        FROM accounts a
        WHERE a.role = 'member'
)
        AND ht.is_b2b = false
ORDER BY created_at DESC;
