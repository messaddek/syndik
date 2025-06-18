-- Insert default helpdesk categories
INSERT INTO helpdesk_categories
    (org_id, name, description, color, icon, default_priority, estimated_response_time, sort_order)
VALUES
    ('default', 'Maintenance', 'Maintenance and repair requests', '#f59e0b', 'wrench', 'medium', 240, 1),
    ('default', 'Complaint', 'General complaints and issues', '#ef4444', 'alert-triangle', 'high', 120, 2),
    ('default', 'Inquiry', 'General questions and inquiries', '#3b82f6', 'help-circle', 'low', 480, 3),
    ('default', 'Billing', 'Billing and payment related issues', '#10b981', 'credit-card', 'medium', 360, 4),
    ('default', 'Security', 'Security concerns and incidents', '#dc2626', 'shield', 'urgent', 60, 5),
    ('default', 'Parking', 'Parking related issues', '#6366f1', 'car', 'medium', 360, 6),
    ('default', 'Noise', 'Noise complaints', '#f59e0b', 'volume-x', 'high', 180, 7),
    ('default', 'Cleaning', 'Cleaning and sanitation requests', '#06b6d4', 'spray-can', 'medium', 480, 8),
    ('default', 'Other', 'Other issues not covered above', '#6b7280', 'more-horizontal', 'medium', 360, 9)
ON CONFLICT
(org_id, name) DO NOTHING;
