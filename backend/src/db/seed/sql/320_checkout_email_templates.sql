-- =============================================================
-- Checkout Email Templates (3 templates × 3 locales)
-- =============================================================

-- Template 1: Payment received (one-time)
INSERT IGNORE INTO email_templates (id, template_key, variables, is_active)
VALUES (
  'et-checkout-payment-001',
  'checkout_payment_received',
  '["customer_name","order_number","total_amount","payment_type"]',
  1
);

INSERT IGNORE INTO email_templates_i18n (id, template_id, locale, template_name, subject, content) VALUES
('eti-chk-pay-de', 'et-checkout-payment-001', 'de', 'Zahlungsbestätigung',
 'Ihre Bestellung #{{order_number}} wurde bestätigt',
 '<h2>Vielen Dank für Ihre Bestellung, {{customer_name}}!</h2><p>Ihre Zahlung über <strong>{{total_amount}}</strong> ({{payment_type}}) wurde erfolgreich verarbeitet.</p><p>Bestellnummer: <strong>{{order_number}}</strong></p><p>Wir werden Ihre Bestellung so schnell wie möglich bearbeiten.</p><p>Mit freundlichen Grüßen,<br>Güzel Web Design</p>'),
('eti-chk-pay-en', 'et-checkout-payment-001', 'en', 'Payment Confirmation',
 'Your order #{{order_number}} has been confirmed',
 '<h2>Thank you for your order, {{customer_name}}!</h2><p>Your payment of <strong>{{total_amount}}</strong> ({{payment_type}}) has been successfully processed.</p><p>Order number: <strong>{{order_number}}</strong></p><p>We will process your order as soon as possible.</p><p>Best regards,<br>Güzel Web Design</p>'),
('eti-chk-pay-tr', 'et-checkout-payment-001', 'tr', 'Ödeme Onayı',
 'Siparişiniz #{{order_number}} onaylandı',
 '<h2>Siparişiniz için teşekkürler, {{customer_name}}!</h2><p><strong>{{total_amount}}</strong> tutarındaki ödemeniz ({{payment_type}}) başarıyla işlendi.</p><p>Sipariş numarası: <strong>{{order_number}}</strong></p><p>Siparişiniz en kısa sürede işleme alınacaktır.</p><p>Saygılarımızla,<br>Güzel Web Design</p>');

-- Template 2: Subscription activated
INSERT IGNORE INTO email_templates (id, template_key, variables, is_active)
VALUES (
  'et-checkout-sub-001',
  'checkout_subscription_activated',
  '["customer_name","order_number","total_amount","payment_type","subscription_id"]',
  1
);

INSERT IGNORE INTO email_templates_i18n (id, template_id, locale, template_name, subject, content) VALUES
('eti-chk-sub-de', 'et-checkout-sub-001', 'de', 'Abonnement aktiviert',
 'Ihr Abonnement #{{order_number}} wurde aktiviert',
 '<h2>Willkommen, {{customer_name}}!</h2><p>Ihr monatliches Abonnement über <strong>{{total_amount}}</strong> wurde erfolgreich aktiviert.</p><p>Bestellnummer: <strong>{{order_number}}</strong></p><p>Ihre Abonnement-ID: {{subscription_id}}</p><p>Die monatliche Zahlung wird automatisch über PayPal abgebucht.</p><p>Mit freundlichen Grüßen,<br>Güzel Web Design</p>'),
('eti-chk-sub-en', 'et-checkout-sub-001', 'en', 'Subscription Activated',
 'Your subscription #{{order_number}} has been activated',
 '<h2>Welcome, {{customer_name}}!</h2><p>Your monthly subscription of <strong>{{total_amount}}</strong> has been successfully activated.</p><p>Order number: <strong>{{order_number}}</strong></p><p>Subscription ID: {{subscription_id}}</p><p>Monthly payments will be automatically charged via PayPal.</p><p>Best regards,<br>Güzel Web Design</p>'),
('eti-chk-sub-tr', 'et-checkout-sub-001', 'tr', 'Abonelik Aktifleştirildi',
 'Aboneliğiniz #{{order_number}} aktifleştirildi',
 '<h2>Hoş geldiniz, {{customer_name}}!</h2><p>Aylık <strong>{{total_amount}}</strong> tutarındaki aboneliğiniz başarıyla aktifleştirildi.</p><p>Sipariş numarası: <strong>{{order_number}}</strong></p><p>Abonelik ID: {{subscription_id}}</p><p>Aylık ödemeler otomatik olarak PayPal üzerinden tahsil edilecektir.</p><p>Saygılarımızla,<br>Güzel Web Design</p>');

-- Template 3: Order delivered
INSERT IGNORE INTO email_templates (id, template_key, variables, is_active)
VALUES (
  'et-checkout-del-001',
  'checkout_order_delivered',
  '["customer_name","order_number","total_amount","delivery_url","delivery_note"]',
  1
);

INSERT IGNORE INTO email_templates_i18n (id, template_id, locale, template_name, subject, content) VALUES
('eti-chk-del-de', 'et-checkout-del-001', 'de', 'Bestellung geliefert',
 'Ihre Bestellung #{{order_number}} wurde geliefert',
 '<h2>Gute Nachrichten, {{customer_name}}!</h2><p>Ihre Bestellung <strong>#{{order_number}}</strong> wurde erfolgreich geliefert.</p><p>Zugangslink: <a href="{{delivery_url}}">{{delivery_url}}</a></p><p>{{delivery_note}}</p><p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p><p>Mit freundlichen Grüßen,<br>Güzel Web Design</p>'),
('eti-chk-del-en', 'et-checkout-del-001', 'en', 'Order Delivered',
 'Your order #{{order_number}} has been delivered',
 '<h2>Great news, {{customer_name}}!</h2><p>Your order <strong>#{{order_number}}</strong> has been successfully delivered.</p><p>Access link: <a href="{{delivery_url}}">{{delivery_url}}</a></p><p>{{delivery_note}}</p><p>If you have any questions, please don''t hesitate to reach out.</p><p>Best regards,<br>Güzel Web Design</p>'),
('eti-chk-del-tr', 'et-checkout-del-001', 'tr', 'Sipariş Teslim Edildi',
 'Siparişiniz #{{order_number}} teslim edildi',
 '<h2>İyi haberler, {{customer_name}}!</h2><p>Siparişiniz <strong>#{{order_number}}</strong> başarıyla teslim edildi.</p><p>Erişim linki: <a href="{{delivery_url}}">{{delivery_url}}</a></p><p>{{delivery_note}}</p><p>Sorularınız için bize ulaşabilirsiniz.</p><p>Saygılarımızla,<br>Güzel Web Design</p>');
