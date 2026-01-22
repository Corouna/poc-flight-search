# 🚀 Vercel Deployment - Final Steps

## ✅ What We Just Did

1. ✅ Created `vercel.json` configuration file
2. ✅ Committed to git (commit: a5752ec)
3. ✅ Pushed to GitHub
4. ✅ Vercel should detect the new changes

---

## 📋 Next Steps in Vercel Dashboard

### **Step 1: Go to Your Vercel Project**
1. Go to https://vercel.com/dashboard
2. Find your project: `poc-flight-search`
3. Look for a **"Redeploy"** button or **new deployment** waiting

### **Step 2: Add Environment Variables**

In the Vercel dashboard, go to **Settings → Environment Variables**:

**Add these two variables:**

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_AMADEUS_API_KEY` | `NqHtOIhmE0gDtFqBjnS6huDnSbkliuaw` | Production, Preview, Development |
| `VITE_AMADEUS_API_SECRET` | `2HWOV9IraeVl8kGq` | Production, Preview, Development |

**Important:** Make sure to select **all three** environments:
- ✅ Production
- ✅ Preview
- ✅ Development

### **Step 3: Trigger Deployment**

**Option A: Automatic (Recommended)**
- Since we just pushed, Vercel should auto-detect the change
- Check if a new deployment is running
- Wait for it to complete (usually 30-60 seconds)

**Option B: Manual Redeploy**
- In Vercel dashboard, click **"Redeploy"** or **"Deploy"**
- Select branch: `main`
- Click deploy

---

## 🔍 Monitor the Build

### **Watch the Build Progress:**
1. Vercel dashboard shows build logs in real-time
2. You should see:
   ```
   Installing dependencies...
   Running: npm install ✓
   
   Building project...
   Running: npm run build ✓
   
   Finalizing...
   Deployment complete! ✓
   ```

### **Expected Build Time:**
- ⏱️ ~30-60 seconds (Vite is FAST!)

### **Success Indicators:**
- ✅ Build status shows **"Ready"** or **"Success"**
- ✅ Green checkmark on deployment
- ✅ URL provided: `https://poc-flight-search.vercel.app`

---

## 🧪 Test Your Live App

Once deployed, visit: **https://poc-flight-search.vercel.app**

### **Test Checklist:**
- [ ] Page loads without errors
- [ ] Search form appears
- [ ] Try searching for flights (e.g., NYC → LAX, any date)
- [ ] Verify API call succeeds (no 401 errors)
- [ ] Filters work (price, stops, airlines)
- [ ] Sorting works
- [ ] Price chart updates
- [ ] Open browser DevTools (F12) → Console → No red errors

---

## 🛠️ If Something Goes Wrong

### **Build Failed Error:**

**Check Vercel logs:**
1. Go to Vercel dashboard
2. Click on failed deployment
3. Scroll to see error details
4. Common issues:

| Error | Solution |
|-------|----------|
| "Cannot find module" | Dependencies weren't installed (clear cache & redeploy) |
| "npm ERR!" | Check package.json syntax (run `npm install` locally) |
| "env vars not found" | Verify env vars added in Vercel Settings → Environment Variables |

### **App Loads but API Fails (401 Error):**

1. Open browser DevTools (F12)
2. Network tab → Look for API request
3. Check response → Should show `"statusCode": 401` error
4. This means env vars weren't injected

**Fix:**
1. Go back to Vercel Settings → Environment Variables
2. Make sure both `VITE_AMADEUS_API_KEY` and `VITE_AMADEUS_API_SECRET` are added
3. Click redeploy

### **App Loads but No Flights Show:**

1. Check browser console for errors
2. Network tab → Search for `api/v2/` calls
3. If getting 404 → API endpoint might have changed
4. If getting 403 → Token generation might be failing

---

## 📊 Vercel Dashboard Features

Once deployed, you can:

✅ **View build logs** - See what happened during build  
✅ **Monitor analytics** - See traffic (free tier: basic)  
✅ **Set up custom domain** - Use your own domain  
✅ **Configure SSL** - Already enabled (free HTTPS)  
✅ **Preview deployments** - Test branches before main  
✅ **Deployment history** - Roll back if needed  

---

## 🎉 Success! What's Next?

### **Share Your App:**
```
Send this URL to anyone:
https://poc-flight-search.vercel.app
```

### **Auto-Deploy on GitHub Push:**
Now whenever you:
```bash
git add .
git commit -m "new feature"
git push origin main
```

→ Vercel automatically redeploys! 🚀

### **Optional: Add Custom Domain**
Later, you can add a custom domain like:
- `flight-search.yoursite.com`
- Setup takes 5 minutes in Vercel Settings

---

## 📝 Quick Reference

| Item | Value |
|------|-------|
| **Project URL** | https://poc-flight-search.vercel.app |
| **GitHub Repo** | https://github.com/Corouna/poc-flight-search |
| **Vercel Dashboard** | https://vercel.com/dashboard |
| **Build Time** | ~30-60 seconds |
| **Free Tier Bandwidth** | 100 GB/month |
| **Auto-Deploy** | On every `git push` ✓ |

---

## ✅ Deployment Checklist

- [ ] Created Vercel account
- [ ] Connected GitHub to Vercel
- [ ] Added `vercel.json` to project
- [ ] Pushed to GitHub
- [ ] **← YOU ARE HERE**
- [ ] Add environment variables in Vercel dashboard
- [ ] Trigger deployment (auto or manual)
- [ ] Wait for build to complete
- [ ] Test live app at `vercel.app` URL
- [ ] Share with friends/portfolio!

---

## 🎯 Your Turn!

### **Immediate Action:**
1. Go to https://vercel.com/dashboard
2. Find your `poc-flight-search` project
3. Go to **Settings → Environment Variables**
4. Add the two Amadeus API credentials (see Step 2 above)
5. Trigger deployment

**That's it!** The rest is automatic. The app will be live in ~1 minute! 🚀

---

## 💬 If You Get Stuck

Common questions:

**Q: Where do I add environment variables?**
A: Vercel Dashboard → Your Project → Settings → Environment Variables

**Q: Will my API secret be visible?**
A: No! It's injected at build time, never exposed in the deployed code.

**Q: Can I update the app after deployment?**
A: Yes! Just push to GitHub, Vercel redeploys automatically.

**Q: Do I need to do anything after deployment?**
A: Just test the live URL to make sure it works!

---

**You're almost there! Just add the env vars and deploy!** 🎉

---

**Questions? Let me know after you add the environment variables and I can help debug if needed!**
