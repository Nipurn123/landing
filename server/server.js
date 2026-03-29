import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const supabaseUrl = process.env.SUPABASE_URL || 'http://127.0.0.1:54321';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:4173',
  'https://100xprompt.com',
  'https://www.100xprompt.com',
  'https://api.100xprompt.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 204
}));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, jobTitle, companyDomain, email, referralSource, message } = req.body;

  if (!name || !jobTitle || !companyDomain || !email || !referralSource) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data, error: dbError } = await supabase
      .from('contact_submissions')
      .insert([{
        name,
        job_title: jobTitle,
        company_domain: companyDomain,
        email,
        referral_source: referralSource,
        message: message || null
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Failed to save submission' });
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #4aab6d; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background: white; padding: 20px; border-radius: 6px; margin-top: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; width: 40%;"><strong>Name:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Job Title:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${jobTitle}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Company Domain:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="https://${companyDomain}" style="color: #4aab6d;">${companyDomain}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #4aab6d;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Referral Source:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${referralSource}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; vertical-align: top;"><strong>Message:</strong></td>
                <td style="padding: 10px 0; white-space: pre-wrap;">${message || 'No message provided'}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
            This email was sent from the 100X Prompt contact form.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    await supabase
      .from('email_notifications')
      .insert([{
        type: 'contact',
        recipient_email: process.env.GMAIL_USER,
        subject: `New Contact Form Submission from ${name}`,
        success: true
      }]);

    await supabase
      .from('contact_submissions')
      .update({ notified: true })
      .eq('id', data.id);

    res.status(200).json({ success: true, message: 'Submission saved and email sent' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process submission' });
  }
});

app.post('/api/docs-waitlist', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const { data, error: dbError } = await supabase
      .from('docs_waitlist')
      .insert([{ email }])
      .select()
      .single();

    if (dbError) {
      if (dbError.code === '23505') {
        return res.status(200).json({ success: true, message: 'Already registered' });
      }
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Failed to save email' });
    }

    res.status(200).json({ success: true, message: 'Added to waitlist', data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to join waitlist' });
  }
});

app.post('/api/newsletter', async (req, res) => {
  const { email, source } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const { data, error: dbError } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email, source: source || 'footer' }])
      .select()
      .single();

    if (dbError) {
      if (dbError.code === '23505') {
        return res.status(200).json({ success: true, message: 'Already subscribed' });
      }
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Failed to subscribe' });
    }

    res.status(200).json({ success: true, message: 'Subscribed to newsletter', data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

app.post('/api/notify-docs-launch', async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { data: waitlist, error: dbError } = await supabase
      .from('docs_waitlist')
      .select('*')
      .eq('notified', false);

    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Failed to fetch waitlist' });
    }

    const results = [];
    
    for (const user of waitlist) {
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: user.email,
        subject: '📚 100X Prompt Docs Are Now Live!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px;">
            <h2 style="color: #333; border-bottom: 2px solid #4aab6d; padding-bottom: 10px;">Documentation is Live!</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #555;">
              Great news! The 100X Prompt documentation is now available. Explore our guides, API references, and examples.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://100xprompt.com/docs" style="background: #4aab6d; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">View Documentation</a>
            </div>
            
            <p style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
              You received this email because you signed up for the docs waitlist.
            </p>
          </div>
        `
      };

      try {
        await transporter.sendMail(mailOptions);
        
        await supabase
          .from('docs_waitlist')
          .update({ notified: true })
          .eq('id', user.id);

        await supabase
          .from('email_notifications')
          .insert([{
            type: 'docs_launch',
            recipient_email: user.email,
            subject: '📚 100X Prompt Docs Are Now Live!',
            success: true
          }]);

        results.push({ email: user.email, success: true });
      } catch (emailError) {
        console.error(`Failed to email ${user.email}:`, emailError);
        results.push({ email: user.email, success: false, error: emailError.message });
      }
    }

    res.status(200).json({ 
      success: true, 
      notified: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send notifications' });
  }
});

app.get('/api/stats', async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { count: contactCount } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true });

    const { count: waitlistCount } = await supabase
      .from('docs_waitlist')
      .select('*', { count: 'exact', head: true });

    const { data: recentContacts } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    res.status(200).json({
      contactSubmissions: contactCount,
      waitlistSignups: waitlistCount,
      recentContacts
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

async function getGeoLocation(ip) {
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return { country: 'Local', country_code: 'LO', region: 'Local', city: 'Local' };
  }

  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,region,regionName,city,lat,lon,timezone,isp,org`);
    const data = await response.json();
    
    if (data.status === 'success') {
      return {
        country: data.country,
        country_code: data.countryCode,
        region: data.regionName,
        region_code: data.region,
        city: data.city,
        latitude: data.lat,
        longitude: data.lon,
        timezone: data.timezone,
        isp: data.isp,
        org: data.org
      };
    }
  } catch (error) {
    console.error('Geo lookup error:', error.message);
  }
  
  return { country: null, country_code: null, region: null, city: null };
}

function parseUserAgent(userAgent) {
  const ua = userAgent || '';
  
  let browser = 'Unknown';
  let browserVersion = '';
  let os = 'Unknown';
  let osVersion = '';
  let deviceType = 'Desktop';

  if (ua.includes('Firefox/')) {
    browser = 'Firefox';
    browserVersion = ua.match(/Firefox\/(\d+)/)?.[1] || '';
  } else if (ua.includes('Edg/')) {
    browser = 'Edge';
    browserVersion = ua.match(/Edg\/(\d+)/)?.[1] || '';
  } else if (ua.includes('Chrome/')) {
    browser = 'Chrome';
    browserVersion = ua.match(/Chrome\/(\d+)/)?.[1] || '';
  } else if (ua.includes('Safari/')) {
    browser = 'Safari';
    browserVersion = ua.match(/Version\/(\d+)/)?.[1] || '';
  }

  if (ua.includes('Windows NT 10')) {
    os = 'Windows';
    osVersion = '10/11';
  } else if (ua.includes('Windows NT 6.3')) {
    os = 'Windows';
    osVersion = '8.1';
  } else if (ua.includes('Mac OS X')) {
    os = 'macOS';
    osVersion = ua.match(/Mac OS X (\d+[._]\d+)/)?.[1]?.replace('_', '.') || '';
  } else if (ua.includes('Android')) {
    os = 'Android';
    osVersion = ua.match(/Android (\d+)/)?.[1] || '';
  } else if (ua.includes('iPhone') || ua.includes('iPad')) {
    os = 'iOS';
    osVersion = ua.match(/OS (\d+)/)?.[1] || '';
  } else if (ua.includes('Linux')) {
    os = 'Linux';
  }

  if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    deviceType = /iPad|Tablet/i.test(ua) ? 'Tablet' : 'Mobile';
  }

  return { browser, browserVersion, os, osVersion, deviceType };
}

function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
         req.headers['x-real-ip'] || 
         req.connection?.remoteAddress || 
         req.socket?.remoteAddress || 
         '127.0.0.1';
}

app.post('/api/track/visitor', async (req, res) => {
  const { visitorId, referrer, screenResolution, language } = req.body;
  const ip = getClientIP(req);
  const userAgent = req.headers['user-agent'];

  if (!visitorId) {
    return res.status(400).json({ error: 'visitorId is required' });
  }

  try {
    const { data: existingVisitor } = await supabase
      .from('visitors')
      .select('*')
      .eq('visitor_id', visitorId)
      .single();

    if (existingVisitor) {
      const { error: updateError } = await supabase
        .from('visitors')
        .update({
          last_visit: new Date().toISOString(),
          visit_count: existingVisitor.visit_count + 1
        })
        .eq('visitor_id', visitorId);

      if (updateError) {
        console.error('Update error:', updateError);
        return res.status(500).json({ error: 'Failed to update visitor' });
      }

      return res.status(200).json({ success: true, isNew: false, visitor: existingVisitor });
    }

    const geoData = await getGeoLocation(ip);
    const uaData = parseUserAgent(userAgent);

    const { data, error: insertError } = await supabase
      .from('visitors')
      .insert([{
        visitor_id: visitorId,
        ip_address: ip,
        user_agent: userAgent,
        referrer: referrer || null,
        country: geoData.country,
        country_code: geoData.country_code,
        region: geoData.region,
        region_code: geoData.region_code,
        city: geoData.city,
        latitude: geoData.latitude,
        longitude: geoData.longitude,
        timezone: geoData.timezone,
        isp: geoData.isp,
        org: geoData.org,
        device_type: uaData.deviceType,
        browser: uaData.browser,
        browser_version: uaData.browserVersion,
        os: uaData.os,
        os_version: uaData.osVersion,
        screen_resolution: screenResolution || null,
        language: language || null
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return res.status(500).json({ error: 'Failed to create visitor' });
    }

    res.status(200).json({ success: true, isNew: true, visitor: data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to track visitor' });
  }
});

app.post('/api/track/pageview', async (req, res) => {
  const { visitorId, pagePath, pageTitle, referrer, utm, timeOnPage, scrollDepth } = req.body;

  if (!visitorId || !pagePath) {
    return res.status(400).json({ error: 'visitorId and pagePath are required' });
  }

  try {
    const { data, error } = await supabase
      .from('page_views')
      .insert([{
        visitor_id: visitorId,
        page_path: pagePath,
        page_title: pageTitle || null,
        referrer: referrer || null,
        utm_source: utm?.source || null,
        utm_medium: utm?.medium || null,
        utm_campaign: utm?.campaign || null,
        utm_term: utm?.term || null,
        utm_content: utm?.content || null,
        time_on_page: timeOnPage || 0,
        scroll_depth: scrollDepth || 0
      }])
      .select()
      .single();

    if (error) {
      console.error('Page view error:', error);
      return res.status(500).json({ error: 'Failed to track page view' });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to track page view' });
  }
});

app.post('/api/track/click', async (req, res) => {
  const { visitorId, elementType, elementId, elementText, elementClass, pagePath, href, x, y } = req.body;

  if (!visitorId || !elementType) {
    return res.status(400).json({ error: 'visitorId and elementType are required' });
  }

  try {
    const { data, error } = await supabase
      .from('click_events')
      .insert([{
        visitor_id: visitorId,
        element_type: elementType,
        element_id: elementId || null,
        element_text: elementText || null,
        element_class: elementClass || null,
        page_path: pagePath || null,
        href: href || null,
        x_position: x || null,
        y_position: y || null
      }])
      .select()
      .single();

    if (error) {
      console.error('Click track error:', error);
      return res.status(500).json({ error: 'Failed to track click' });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to track click' });
  }
});

app.post('/api/track/event', async (req, res) => {
  const { visitorId, eventName, eventCategory, eventLabel, eventValue, pagePath, metadata } = req.body;

  if (!visitorId || !eventName) {
    return res.status(400).json({ error: 'visitorId and eventName are required' });
  }

  try {
    const { data, error } = await supabase
      .from('custom_events')
      .insert([{
        visitor_id: visitorId,
        event_name: eventName,
        event_category: eventCategory || null,
        event_label: eventLabel || null,
        event_value: eventValue || null,
        page_path: pagePath || null,
        metadata: metadata || {}
      }])
      .select()
      .single();

    if (error) {
      console.error('Event track error:', error);
      return res.status(500).json({ error: 'Failed to track event' });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to track event' });
  }
});

app.get('/api/analytics/stats', async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const days = parseInt(req.query.days) || 30;

  try {
    const { data, error } = await supabase.rpc('get_visitor_stats', { days });

    if (error) {
      console.error('Stats error:', error);
      return res.status(500).json({ error: 'Failed to fetch stats' });
    }

    res.status(200).json(data[0] || {});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.get('/api/analytics/by-country', async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const days = parseInt(req.query.days) || 30;

  try {
    const { data, error } = await supabase.rpc('get_visitors_by_country', { days });

    if (error) {
      console.error('Country stats error:', error);
      return res.status(500).json({ error: 'Failed to fetch country stats' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch country stats' });
  }
});

app.get('/api/analytics/by-region', async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const countryCode = req.query.country || 'IN';
  const days = parseInt(req.query.days) || 30;

  try {
    const { data, error } = await supabase.rpc('get_visitors_by_region', { 
      country_code_param: countryCode, 
      days 
    });

    if (error) {
      console.error('Region stats error:', error);
      return res.status(500).json({ error: 'Failed to fetch region stats' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch region stats' });
  }
});

app.get('/api/analytics/clicks', async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const days = parseInt(req.query.days) || 30;

  try {
    const { data, error } = await supabase.rpc('get_click_events_summary', { days });

    if (error) {
      console.error('Click stats error:', error);
      return res.status(500).json({ error: 'Failed to fetch click stats' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch click stats' });
  }
});

app.get('/api/analytics/daily', async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const days = parseInt(req.query.days) || 30;

  try {
    const { data, error } = await supabase.rpc('get_daily_visitors', { days });

    if (error) {
      console.error('Daily stats error:', error);
      return res.status(500).json({ error: 'Failed to fetch daily stats' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch daily stats' });
  }
});

app.get('/api/analytics/recent', async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const limit = parseInt(req.query.limit) || 50;

  try {
    const { data: visitors, error: visitorsError } = await supabase
      .from('visitors')
      .select('*')
      .order('first_visit', { ascending: false })
      .limit(limit);

    if (visitorsError) {
      console.error('Recent visitors error:', visitorsError);
      return res.status(500).json({ error: 'Failed to fetch recent visitors' });
    }

    res.status(200).json(visitors);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch recent visitors' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
