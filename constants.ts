import { BlogPost, Project } from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Insights into Thai Calorie Tracking App',
    date: '2025-12-01',
    excerpt: 'Case study of a Thai indie dev who built an AI calorie-tracking app focused on localization, reaching ~$400k ARR.',
    content: `
      <h2>Case Study: <strong>NubKal</strong></h2>
      <p>Case study of Thai indie dev (“Gank”), built an AI calorie-tracking app, focused <em>only</em> on Thailand, and got to nearly ~$400k ARR and top-5 in Health & Fitness by leaning hard into <strong>localization + paid ads</strong>, not chasing the US like every other hopeful zombie founder.</p>

      <h3>What his app does</h3>
      <ul>
        <li><strong>App:</strong> NubKal (Thai word for “calories”)</li>
        <li><strong>Core:</strong> User takes a <strong>photo of their meal</strong>, app auto-detects food → calories, protein, carbs, fats.</li>
        <li>Also tracks <strong>exercise</strong>, links with smartwatches, calculates burned calories.</li>
        <li>Onboarding collects goals (lose / maintain / gain weight, age, weight, target, etc.) and creates a personalized daily macro plan.</li>
        <li><strong>Target users:</strong> Health-conscious Thais in a country where health-tech is booming and aging population is growing.</li>
      </ul>

      <h3>Growth + Revenue</h3>
      <ul>
        <li>Launched <strong>March this year</strong>.</li>
        <li>Already <strong>&gt;$20k+</strong> revenue in a short time.</li>
        <li>Close to <strong>$400k ARR</strong>.</li>
        <li>Frequently <strong>Top 10</strong> in Health & Fitness in both App Store & Google Play in Thailand (hits #2–5 often).</li>
        <li>Focuses on <strong>iOS first</strong> even though iPhone share in Thailand is ~30%. Back-end data showed <strong>iOS users generate more revenue</strong>, so he just goes where the money is.</li>
      </ul>

      <h3>Marketing Strategy</h3>
      <h4>1. Meta ads first, ASO later</h4>
      <p>Started with <strong>Meta (Facebook/Instagram) ads</strong>:</p>
      <ol>
        <li><strong>Lead-gen campaign</strong> → landing page → collect emails & ask: "Why do you want this solution?", "What problem are you trying to solve?"</li>
        <li>Then moved to <strong>install campaigns</strong> to warm the ad account.</li>
        <li>Then optimized for <strong>“start trial” / subscriptions</strong> once there was enough data.</li>
      </ol>
      <p><strong>Budgets:</strong> Install testing: ~30,000 THB/month (~$800–900). Once things worked: 10,000 THB/day (~$300/day) on trial/sub campaigns.</p>
      <p><strong>Mindset:</strong> Let ads run a few days. Kill fast if trial/sub costs are too high. Scale winners, don’t get romantic about any specific creative.</p>

      <h4>2. He <em>regrets</em> his old “waitlist” approach</h4>
      <p>Earlier strategy: Landing page + email collection + “tell us why you want this”. His verdict: <strong>bad validator</strong>. People will drop emails for fun, not because they’ll pay.</p>
      <p><strong>What he <em>would</em> do now:</strong> Build page as if product already exists. Ask people to <strong>actually buy</strong> (e.g. $29 pre-order). Use <em>paid conversions</em> as proof of demand, not free emails.</p>

      <h3>Localization: The Real Unlock</h3>
      <h4>1. Start with your home country</h4>
      <p>His core thesis: "You should know your home users 'like family' – culture, lifestyle, habits, money psychology."</p>
      <p><strong>Benefits:</strong> You already understand how people eat, how they talk, what they’re skeptical about, what price feels “normal” vs scammy. Much easier to write convincing copy and make visuals/fonts that feel native.</p>

      <h4>2. Culture → Product Features</h4>
      <p>Example: <strong>Thai food culture</strong>. Thai people often share dishes family-style. Western users: one plate per person. Feature he built: <strong>Portion selection</strong> per dish ("I shared this with 4 people" → app divides calories by 4). This came purely from understanding local behavior.</p>

      <h4>3. Localization is not “just translation”</h4>
      <p>Thai users prefer Thai apps. They can spot “Global app lazily translated into Thai” (e.g. using default system fonts vs local branded fonts). Good localization includes Language, Fonts, Examples/References, UX decisions, and Pricing.</p>

      <h3>Pricing & Purchasing Power</h3>
      <h4>1. You cannot copy US prices</h4>
      <p>US health app price points don’t translate 1:1 to Thailand. In low purchasing-power markets, you might stick to lower subscription prices, free + ads, or a hybrid model.</p>

      <h4>2. Paid ads are way cheaper in non-Tier-1</h4>
      <p>He tested Meta ads: Thailand vs UK vs Australia. CPM & CPC in UK/Australia were about <strong>4–5x more expensive</strong> than Thailand. Conclusion: Easier & cheaper to dominate your local market first.</p>

      <h3>Lessons for you</h3>
      <ol>
        <li><strong>Start with your home market:</strong> You already understand the people. That’s unfair advantage #1.</li>
        <li><strong>Localization > translation:</strong> Fonts, stories, examples, pricing, UX flow.</li>
        <li><strong>Smaller markets can be more profitable:</strong> Less competition, cheaper ads, easier to rank.</li>
        <li><strong>Use paid experiments, not vanity waitlists:</strong> Collecting emails is cheap. Getting people to actually pay tells you if the product is real.</li>
        <li><strong>Meta ads + product-market fit first, then ASO:</strong> Ads to validate & scale. ASO for compounding organic.</li>
      </ol>
    `,
    tags: ['CASE_STUDY', 'LOCALIZATION', 'GROWTH']
  },
{
    id: '2',
    title: 'Idea: Calorie tracking app for Malaysia',
    date: '2025-12-09',
    excerpt: 'Strategic analysis for launching a localized AI calorie tracker in Malaysia: Market viability, LSDCP growth framework, and hospital partnerships.',
    content: `
      <h2>Why Malaysia? (Market Viability)</h2>
      <ul>
        <li><strong>Obesity Crisis:</strong> ~54.4% of adults are overweight/obese (2023), projected to hit >60% by 2025. Highest in SE Asia.</li>
        <li><strong>Digital Adoption:</strong> 90% smartphone penetration. Digital health market projected to reach ~$843M by 2028.</li>
        <li><strong>Cultural Gap:</strong> Western apps don't understand "Nasi Lemak," "Teh Tarik," or "sharing portions" (family-style eating).</li>
      </ul>

      <h3>GTM Strategy (LSDCP Framework)</h3>
      
      <h4>1. Lab (Find what converts)</h4>
      <p>Test creatives focusing on <strong>local pain points</strong>:</p>
      <ul>
        <li>"How to eat Nasi Kandar without gaining weight"</li>
        <li>"Tracking shared family meals" (common struggle)</li>
        <li><strong>Hook:</strong> "The calorie app that actually speaks Bahasa and knows Malaysian food."</li>
      </ul>

      <h4>2. Scale & Distribution</h4>
      <ul>
        <li><strong>TikTok/IG Reels:</strong> Malaysia has massive social media usage. Replicate "calorie reveal" videos of local street food.</li>
        <li><strong>Community:</strong> WhatsApp groups are huge here. Create "Health Challenge" groups.</li>
      </ul>

      <h4>3. Creators</h4>
      <p>Partner with <strong>micro-influencers</strong>: Local dietitians, fitness coaches, and "foodie" influencers who want to pivot to health.</p>

      <h4>4. Paid</h4>
      <p><strong>Ads are cheap:</strong> CPM/CPC in Malaysia is significantly lower than US/UK. Run aggressive Meta/TikTok ads targeting broad heath interests.</p>

      <h3>Partnerships: Hospitals & Doctors</h3>
      <p>Private healthcare is booming (IHH, Sunway, KPJ). They are actively identifying as "Digital Health" leaders.</p>
      <ul>
        <li><strong>Potential Partners:</strong> Sunway iLabs, DoctorOnCall, Naluri.</li>
        <li><strong>Strategy:</strong> B2B2C. Pitch app as a "post-consultation lifestyle monitor" for pre-diabetic patients.</li>
      </ul>

      <h3>For Foreign Founders (USA → MY)</h3>
      <p><strong>How to do it:</strong></p>
      <ul>
        <li><strong>Visa:</strong> <a href="https://mdec.my/mtep" target="_blank" rel="noopener noreferrer">Malaysia Tech Entrepreneur Programme (MTEP)</a>. 1-year pass (New) or 5-year (Established).</li>
        <li><strong>Entity:</strong> 100% foreign ownership of Sdn Bhd (Private Ltd) is allowed in services.</li>
        <li><strong>Grants:</strong> Look at <strong>MDEC (Malaysia Digital Economy Corporation)</strong>.
          <ul>
            <li><em>Malaysia Digital Catalyst Grant (MDCG):</em> Up to RM1M (requires matching).</li>
            <li><em>Foreigners:</em> Often need RM500k paid-up capital for certain grants, but MTEP eases entry.</li>
          </ul>
        </li>
      </ul>
    `,
    tags: ['MALAYSIA', 'STRATEGY', 'STARTUP']
  },
{
    id: '3',
    title: 'Consumer App Growth Framework (LSDCP)',
    date: '2025-12-04',
    excerpt: 'A full-funnel marketing system for growing consumer apps: Lab, Scale, Distribution, Creators, and Paid.',
    content: `
      <h2>The LSDCP Framework</h2>
      <p>A full-funnel marketing system used to grow consumer apps, built around five stages that feed into each other. Developed by <a href="https://julianivaldy.medium.com/" target="_blank" rel="noopener noreferrer">Julian Ivaldy</a>.</p>
      
      <p><strong>Lab → Find what converts</strong><br/>
      <strong>Scale → Multiply it</strong><br/>
      <strong>Distribution → Spread it</strong><br/>
      <strong>Creators → Amplify it</strong><br/>
      <strong>Paid → Supercharge it</strong></p>

      <h3>1. Lab</h3>
      <p>Discover <strong>high-performing creatives</strong>. The goal is not views alone, but <strong>engagement quality</strong>:</p>
      <ul>
        <li><strong>Saves</strong> → intent</li>
        <li><strong>Shares</strong> → organic virality</li>
        <li><strong>Comments</strong> → emotional activation & k-factor</li>
      </ul>

      <h4>Creative Score Formula</h4>
      <p><code>Score = [(Comments × 4) + (Saves × 3) + (Shares × 2)] ÷ Views × 100</code></p>

      <h4>Replicable Creatives</h4>
      <p>A usable creative format must be easy to reproduce, not dependent on specific creators, and structured enough for infinite variations.</p>

      <h4>Finding Creative Ideas</h4>
      <ul>
        <li><strong>Copycat Approach:</strong> Analyze top category content, identify signals, score them, extract patterns.</li>
        <li><strong>Creative Approach:</strong> Study users deeply, observe feed behavior, identify emotional triggers.</li>
      </ul>

      <h3>2. Scale</h3>
      <p>Once you find a winning format, reproduce it relentlessly. <strong>Replicable &gt; Viral.</strong> A 1M-view replicable creative can be multiplied into 20–50 variants.</p>

      <h4>Content Scale Structure</h4>
      <ul>
        <li><strong>Footage Requirements:</strong> Type (screen record, POV, UGC), Composition, Criteria.</li>
        <li><strong>Editing Rules:</strong> Number of steps, variables per step, overlays.</li>
        <li><strong>Social Platform Edit:</strong> Use in-app captions, music, and zoom/crop to avoid "non-original content" flags.</li>
      </ul>

      <h3>3. Distribution</h3>
      <p>When you have dozens of creatives, the bottleneck becomes <strong>distribution</strong>. You need infrastructure, posting systems, and consistent logistics.</p>

      <h4>1. Internal Farm</h4>
      <ul>
        <li><strong>Phase 1 (1–10 devices):</strong> Dedicated phones, clean IPs, manual operation.</li>
        <li><strong>Phase 2 (10–25 devices):</strong> OTG hubs, centralized coordination.</li>
        <li><strong>Phase 3 (25+ devices):</strong> Hire Head of Distribution, fully operational system.</li>
      </ul>

      <h4>2. Reposters Network</h4>
      <p>Creators with 500–5,000 followers posting your content. Structure: Pay small monthly fee, provide weekly creatives, track performance.</p>

      <h3>4. Creators</h3>
      <p>Creators amplify what already works—<strong>not</strong> invent formats for you. Leverage them for horizontal expansion and market localization.</p>
      <p><strong>Responsibility:</strong> Source creators who fit your niche, then manage them by providing templates and best-performing formats.</p>

      <h3>5. Paid</h3>
      <p>Paid only works <strong>after</strong> unit economics stabilize. If LTV &gt; CAC and you have strong creative signals, paid removes the ceiling.</p>
      
      <h4>Paid Strategy</h4>
      <ol>
        <li>Start with 10 proven winners (Top Lab creatives).</li>
        <li>Rapid Creative Iteration.</li>
        <li>Platform Optimization (Meta: raw UGC, TikTok: native, Snapchat: short/punchy).</li>
      </ol>

      <h3>Full Funnel Summary</h3>
      <p>LSDCP is a compounding system. Everything reinforces everything else. This is the machine behind modern consumer app growth.</p>
    `,
    tags: ['GROWTH', 'MARKETING', 'FRAMEWORK']
  },
{
    id: '4',
    title: 'Idea: Calorie tracking app for Philippines',
    date: '2025-12-11',
    excerpt: 'Market analysis for a Filipino-localized calorie tracker: "Rice is Life" culture, high social engagement, and the Innovative Startup Act.',
    content: `
      <h2>Why the Philippines? (Market Viability)</h2>
      <ul>
        <li><strong>Rising Obesity:</strong> Over 1/3 of adults are overweight/obese. Projections showing 1 in 10 will be obese by 2025.</li>
        <li><strong>Social Capital of the World:</strong> Extremely high social media usage (Facebook/TikTok). Filipinos spend ~4 hours/day on social media.</li>
        <li><strong>Dietary Specifics:</strong> "Rice is Life" (Unli-rice culture), "Merienda" (mid-day meals), and "Sawsawan" (dipping sauces) make generic western tracking inaccurate.</li>
      </ul>

      <h3>GTM Strategy (LSDCP Framework)</h3>
      
      <h4>1. Lab (Find what converts)</h4>
      <p>Content must hit cultural nerves:</p>
      <ul>
        <li>"Tracking the calories in your Jollibee order" (Viral potential)</li>
        <li>"How to enjoy Fiesta/Christmas without ruining progress"</li>
        <li><strong>Hook:</strong> "The app that counts 'sando' cups of rice accurately."</li>
      </ul>

      <h4>2. Scale & Distribution</h4>
      <ul>
        <li><strong>Facebook Groups:</strong> FB is the internet here. Build communities like "Pinoys getting fit" or "Low-carb Manila".</li>
        <li><strong>Tiktok:</strong> Humor-based skits regarding diet struggles work best here.</li>
      </ul>

      <h4>3. Partnerships</h4>
      <p>Major hospital groups are digitizing (<strong>Metro Pacific Health</strong>, <strong>St. Luke's</strong>). Platforms like <strong>mWell</strong> are paving the way.</p>
      <ul>
        <li><strong>Strategy:</strong> Corporate Wellness. BPOs (Call Centers) have huge staffs with night-shift health issues. Pitch as an employee benefit.</li>
      </ul>

      <h3>For Foreign Founders</h3>
      <p><strong>The "Innovative Startup Act"</strong> is a game changer.</p>
      <ul>
        <li><strong>Visas:</strong> Startup Owner Visa and Startup Employee Visa available.</li>
        <li><strong>Ownership:</strong> Tech startups often qualify for 100% foreign ownership (unless land-owning).</li>
        <li><strong>Talent:</strong> High English proficiency makes hiring local dev/marketing teams seamless and cost-effective.</li>
      </ul>
    `,
    tags: ['PHILIPPINES', 'STRATEGY', 'STARTUP']
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'SHORT_TRANSCRIPT',
    description: 'Automated transcription service for short-form video content (YouTube Shorts, TikTok, Reels) using OpenAI Whisper.',
    techStack: ['Python', 'Flask', 'Whisper', 'Cloud Run'],
    link: '/transcript',
    status: 'ONLINE'
  },
  {
    id: '2',
    name: 'UMAMI_WORLD_APP',
    description: 'Mobile app for collecting and categorizing dishes tried from cuisines around the world.',
    techStack: ['React Native', 'TypeScript', 'Firebase'],
    link: 'https://umamiworld.cloud',
    status: 'ONLINE'
  },
  {
    id: '3',
    name: 'VOID_MAIL',
    description: 'A secure, encrypted email client that deletes messages after 24 hours.',
    techStack: ['Node.js', 'Cryptography', 'Socket.io'],
    link: '#',
    status: 'OFFLINE'
  },
  {
    id: '4',
    name: 'RETRO_CAM',
    description: 'Web-based image processor applying dithering and CRT effects to uploaded photos.',
    techStack: ['Canvas API', 'WASM', 'Rust'],
    link: '#',
    status: 'ONLINE'
  },
  
];