---
description: How to research, write, and publish a high-authority blog post to CloudSocial.io
---

# Workflow: Publish Authority Blog

This workflow guides the CloudSocial agent through the end-to-end process of creating and publishing a strategic blog post.

## 1. Research & Strategy

### 1.1 Keyword Research
- Use `search_web` to find high-intent keywords for the Commercial Real Estate (CRE) niche.
- **Languages**: Indonesian (Bahasa Indonesia) or International (English).
- **Segments**: Logistics/Industrial, Premium Office, Retail, Luxury Residential, AI in Real Estate.
- **Identify**:
    - `target_keyword`: Main topic (e.g., "Strategi Pemasaran Real Estate Komersial 2026").
    - `secondary_keywords`: 3-5 related terms.
    - `funnel_stage`: TOFU (Awareness), MOFU (Consideration), or BOFU (Conversion).
    - `volume` & `difficulty`: Estimated from search results.

### 1.2 Competitor Research
- Analyze the top 3 results for the `target_keyword`.
- Note what they missed and how CloudSocial can provide a better "compounding authority" perspective.

## 2. SEO Content Planning

Fill out all fields required for the [Convex posts table](file:///Users/malvinrusli/AI Projects/cloudsocial_website/convex/schema.ts):
- **SEO Title**: Catchy, keyword-rich, under 60 chars.
- **Meta Description**: Compelling summary with CTA, under 160 chars.
- **OG Tags**: Title and Description for social sharing.
- **JSON-LD**: Generate a valid JSON-LD string (Article/BlogPosting schema).
- **Featured Image Prompt**: Descriptive prompt for `generate_image`.

## 3. High-Standard Copywriting

### 3.1 Use Copywriting Skill
- **Strictly adhere** to the [copywriting skill](file:///Users/malvinrusli/AI Projects/cloudsocial_website/SKILLS/copywriting/SKILL.md).
- **Tone**: Authoritative, expert, confidential, yet accessible.
- **Brand Infliction**: Integrate CloudSocial's philosophy ("Authority is compounding leverage") naturally. Refer to [BRAND.md](file:///Users/malvinrusli/AI Projects/cloudsocial_website/BRAND.md).

### 3.2 Structure & Format
- **Headers**: Use H1 for Title, H2/H3 for subsections.
- **Key Takeaways**: Include a "Key Takeaways" section at the beginning.
- **Tables**: Include at least one comparison or data table (e.g., Market Trends, ROI Comparison).
  - Use `<thead>` and `<tbody>` correctly.
  - Keep columns concise (max 3-4 for readability).
  - Use standard HTML table tags: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`.
- **Bullet Points**: Use for lists to improve scannability.
- **FAQ**: Add a specific FAQ section with 3-5 relevant questions.
- **HTML Format**: The content must be valid HTML (as stored in Convex).

## 4. Visual Assets
- Use `generate_image` with the `featured_image_prompt`.
- Ensure the image looks premium and architectural.

## 5. Publishing to Convex

// turbo
1. Run the Convex mutation to insert the post.
   ```bash
   npx convex run posts:create '{
     "title": "...",
     "slug": "...",
     "content": "...",
     "excerpt": "...",
     "status": "published",
     "author": "CloudSocial Team",
     "target_keyword": "...",
     "seo_title": "...",
     "meta_description": "...",
     "faqs": [{"question": "...", "answer": "..."}]
     ... (all other fields)
   }'
   ```

## 6. Verification & Deployment

1. **Verify**: Check the blog at `/blogs/[slug]` on the local server.
2. **Deploy**: Push changes to GitHub/Vercel.
   ```bash
   git add .
   git commit -m "feat: publish new blog post [title]"
   git push origin main
   ```
3. **Vercel**: Check Vercel dashboard for successful build.
