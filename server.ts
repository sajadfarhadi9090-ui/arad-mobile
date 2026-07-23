import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy GoogleGenAI initialization
const getAi = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// Healthcheck API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', store: 'Mobile Arad', version: '1.0.0' });
});

// AI Mobile Advisor Endpoint (Gemini)
app.post('/api/gemini/advisor', async (req, res) => {
  try {
    const { userQuery, budget, phoneCondition, userPreferences } = req.body;
    
    const ai = getAi();
    if (!ai) {
      return res.status(503).json({
        error: 'کلید ارتباطی AI فعال نیست.',
        reply: 'در حال حاضر سیستم هوشمند به صورت آفلاین پاسخگو می‌باشد. لطفاً جهت راهنمایی مستقیم با شماره ۰۲۱-۸۸۹۹۷۷۰۰ تماس بگیرید یا از لیست محصولات سایت دیدن فرمایید.'
      });
    }

    const systemPrompt = `شما مشاور فروش حرفه‌ای و صادق "موبایل آراد" (Mobile Arad) هستید.
موبایل آراد مرجع تخصصی خرید و فروش آنلاین گوشی‌های نو (آکبند) و کارکرده (دست دوم در حد نو با ضمانت ۶۰‌گانه) در ایران است.
وظیفه شما:
۱. راهنمایی دقیق کاربر بر اساس بودجه، نیازها (عکاسی، گیمینگ، سلامت باتری، ارزش خرید).
۲. مقایسه بین خرید گوشی نو یا کارکرده در همان رده قیمتی (مثلاً: آیا با ۴۰ میلیون تومان آکبند شیائومی بخرد یا آیفون ۱۳ کارکرده).
۳. پاسخ‌ها باید کاملاً مؤدبانه، حرفه‌ای، به زبان فارسی روان، خلاصه و همراه با نکات فنی ارزشمند مانند ارزش بازفروش، سلامت باتری، و مهلت تست ۷ روزه موبایل آراد باشد.

اطلاعات ورودی کاربر:
- سوال: ${userQuery || 'راهنمایی خرید'}
- بودجه حدودی: ${budget ? `${budget} تومان` : 'مشخص نشده'}
- ترجیح وضعیت: ${phoneCondition || 'هر دو (نو یا کارکرده)'}
- اولویت‌ها: ${userPreferences || 'کیفیت عمومی'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: systemPrompt,
    });

    const reply = response.text || 'متاسفانه پاسخی دریافت نشد، لطفاً مجدداً تلاش کنید.';
    return res.json({ reply });

  } catch (err: any) {
    console.error('Gemini Advisor Error:', err);
    return res.status(500).json({
      error: 'خطا در ارتباط با هوش مصنوعی',
      reply: 'با عرض پوزش، به علت ترافیک بالا پاسخگویی هوشمند موقتاً با کندی مواجه است. کارشناسان ما در بخش چت آنلاین پاسخگوی شما هستند.'
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`📱 موبایل آراد سرور آماده به کار روی پورت ${PORT}`);
  });
}

startServer();
