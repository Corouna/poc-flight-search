# 🔍 How to View Deployment Logs & Redeploy

## 🚨 Quick Answer: View Build Logs

### **Method 1: Vercel Dashboard (Easiest)**

1. Go to: https://vercel.com/dashboard
2. Click on your project: `poc-flight-search`
3. You should see **Deployments** tab
4. Look for the **latest deployment** (top of list)
5. You'll see status: ❌ **Failed** or ⏳ **Building**
6. **Click on it** to open detailed logs
7. Scroll down to see full error message

### **Method 2: Direct Deployment Link**

From your email or dashboard:
1. Find the failed deployment
2. Click **View Logs** button
3. Full build output appears (usually 20-50 lines)

### **What to Look For**

Scroll through logs and find RED ERROR TEXT like:
```
Error: ...
ERR! ...
Failed: ...
```

---

## 🔧 How to Redeploy

### **Option 1: Automatic Redeploy (Recommended)**

Since you already pushed to GitHub and Vercel is connected, just do:

```bash
cd /Users/fredajani/Documents/Personal/poc-flight-search
git add .
git commit -m "test redeploy"
git push origin main
```

→ Vercel will **automatically redeploy** in 30 seconds!

### **Option 2: Manual Redeploy (No git push)**

In Vercel Dashboard:
1. Go to your `poc-flight-search` project
2. Click the **three dots menu** (⋮) next to the failed deployment
3. Select **"Redeploy"** or **"Rebuild"**
4. Confirm
5. Watch logs appear in real-time

### **Option 3: Redeploy from Details Page**

1. Open the failed deployment
2. Click **"Redeploy"** button at top
3. Select branch: `main`
4. Click **"Redeploy"** again
5. Logs stream in real-time

---

## 🎯 Common Deployment Errors & Fixes

### **Error 1: "Cannot find module"**
**Cause:** Dependencies weren't installed  
**Fix:** Vercel bug, just redeploy (usually fixes it)

### **Error 2: "env vars not found"**
**Cause:** Environment variables weren't injected  
**Check:**
1. Did you add BOTH variables?
   - `VITE_AMADEUS_API_KEY`
   - `VITE_AMADEUS_API_SECRET`
2. Did you select ALL three environments?
   - ✅ Production
   - ✅ Preview
   - ✅ Development
3. Did you click **Save**?

**Fix:** Go back and verify, then redeploy

### **Error 3: "build failed" (vague)**
This usually means one of:
- Missing environment variable
- Syntax error in code (unlikely, we built locally ✓)
- Node version mismatch (rare)

**Fix:** Redeploy → Check logs carefully

### **Error 4: npm ERR! peer dependencies**
**Fix:** This is usually safe to ignore, redeploy usually works

---

## 📺 How to Read Vercel Build Logs

### **Example Successful Build:**
```
[11:23:45] Cloning repository...                     ✓
[11:23:50] Restored build cache                       ✓
[11:23:52] Installing dependencies                    ✓
[11:24:10] Running "npm run build"                    ✓
[11:24:25] Transforming 723 modules...                ✓
[11:24:28] Build complete!                            ✓
[11:24:30] Generated serverless functions             ✓
[11:24:35] Done!
```

### **Example Failed Build (env vars):**
```
[11:23:45] Cloning repository...                     ✓
[11:23:50] Installing dependencies                    ✓
[11:23:52] Running "npm run build"                    ✗
ERROR: VITE_AMADEUS_API_KEY is undefined
  at src/services/amadeus.ts:15
```

→ This tells you the env var wasn't set

---

## ✅ Step-by-Step: Fix & Redeploy

### **Step 1: Check Vercel Settings**
1. Dashboard → Your project → Settings
2. Environment Variables
3. Verify you see:
   - ✅ `VITE_AMADEUS_API_KEY` = `NqHtOIhmE0gDtFqBjnS6huDnSbkliuaw`
   - ✅ `VITE_AMADEUS_API_SECRET` = `2HWOV9IraeVl8kGq`
4. Check boxes are marked for: Production, Preview, Development
5. Click **Save** if you made any changes

### **Step 2: View Current Logs**
1. Dashboard → Deployments
2. Click on the FAILED deployment (red X)
3. Scroll to bottom to see error

### **Step 3: Redeploy**

**Choose one:**

**Option A (Automatic):**
```bash
cd /Users/fredajani/Documents/Personal/poc-flight-search
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```
→ Vercel redeploys automatically

**Option B (Manual):**
1. In Vercel dashboard, click **Redeploy** button
2. Confirm
3. Watch logs stream

### **Step 4: Monitor Build**
- Watch logs in real-time
- Should see ✓ symbols
- Takes ~30-60 seconds

### **Step 5: Test Live App**
Once it shows ✓ **Success**:
- Visit: `https://poc-flight-search.vercel.app`
- Try searching for flights
- Check browser console (F12) for errors

---

## 🎯 Right Now: What You Should Do

1. **Open Vercel Dashboard:** https://vercel.com/dashboard
2. **Find your failed deployment:** Look at Deployments list
3. **Click it:** See the exact error message
4. **Tell me the error:** Share what you see, I'll help fix it
5. **Or just redeploy:** If you fixed the issue (env vars)

---

## 💡 Pro Tip: Real-Time Logs

Vercel shows logs in **real-time** while building:

```
// When you click Redeploy, you immediately see:
[11:25:00] Starting deployment...
[11:25:05] Cloning repository...
[11:25:10] Installing dependencies...
[11:25:30] Building project...
[11:25:45] ERROR: ... (if something fails)
```

You can watch it happen live!

---

## 🚀 TL;DR (Too Long; Didn't Read)

### **To view error:**
1. Go to https://vercel.com/dashboard
2. Click your project
3. Click the failed deployment
4. Scroll to see error

### **To redeploy:**
1. Click **Redeploy** button, OR
2. Run: `git commit --allow-empty -m "redeploy" && git push`

---

## ❓ Next Steps

1. **Check the error message** in Vercel logs
2. **Share what you see** if you're not sure how to fix it
3. **Or just redeploy** if you fixed the env variables
4. **Report back** when you see the status (Success or still error)

**I'm here to help if you get stuck!** 👀

---

**Go check those logs and let me know what the error says!** 🔍
