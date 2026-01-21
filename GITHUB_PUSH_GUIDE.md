# 📤 How to Push to GitHub

Your Flight Search Engine project is now ready to be pushed to GitHub! Here's the complete guide:

---

## ✅ What's Been Done Locally

```bash
✓ Git initialized
✓ 40 files staged
✓ Initial commit created: de9a180
✓ .env.local automatically excluded (in .gitignore)
✓ node_modules automatically excluded
✓ dist/ automatically excluded
```

---

## 🚀 Steps to Push to GitHub

### **Step 1: Create Repository on GitHub**

1. Go to https://github.com/new
2. Fill in:
   - **Repository name:** `poc-flight-search`
   - **Description:** `Flight Search Engine - React + TypeScript + Amadeus API`
   - **Visibility:** `Public` (or Private if you prefer)
   - **Initialize repository:** Leave unchecked
3. Click **Create repository**

### **Step 2: Add Remote & Push**

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
cd /Users/fredajani/Documents/Personal/poc-flight-search

# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/poc-flight-search.git

# Rename branch to main (optional but recommended)
git branch -m master main

# Push to GitHub
git push -u origin main
```

### **Example (with actual username):**
```bash
git remote add origin https://github.com/fredajani/poc-flight-search.git
git branch -m master main
git push -u origin main
```

---

## 🔑 Authentication Options

When you run `git push`, GitHub will ask for authentication. Choose one:

### **Option A: GitHub Personal Access Token (Recommended)**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token"
3. Name it: `poc-flight-search`
4. Select scopes: `repo` (full control of private repositories)
5. Click "Generate token"
6. Copy the token
7. When git asks for password, paste the token

### **Option B: SSH Key (Most Secure)**
1. Check if you have SSH key:
   ```bash
   ls -la ~/.ssh/id_rsa
   ```
2. If not, generate one:
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```
3. Add to GitHub: https://github.com/settings/keys
4. Use SSH URL:
   ```bash
   git remote add origin git@github.com:YOUR_USERNAME/poc-flight-search.git
   ```

### **Option C: GitHub CLI (Easiest)**
1. Install: https://cli.github.com/
2. Run: `gh auth login`
3. Run: `gh repo create poc-flight-search --public --source=. --remote=origin --push`

---

## 📋 Complete Command Sequence

```bash
# Navigate to project
cd /Users/fredajani/Documents/Personal/poc-flight-search

# Verify git is initialized
git status

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/poc-flight-search.git

# Verify remote was added
git remote -v

# Rename master to main (optional)
git branch -m master main

# Push to GitHub
git push -u origin main
```

---

## ✅ After Pushing

Once complete, you'll see:

```
Enumerating objects: 45, done.
Counting objects: 100% (45/45), done.
Delta compression using up to 8 threads
Compressing objects: 100% (40/40), done.
Writing objects: 100% (45/45), 200 KiB | 2.5 MiB/s, done.
Total 45 (delta 0), reused 0 (delta 0), pack-reused 0
remote: 
remote: Create a pull request for 'main' on GitHub by visiting:
remote:      https://github.com/YOUR_USERNAME/poc-flight-search/pull/new/main
remote:
To https://github.com/YOUR_USERNAME/poc-flight-search.git
 * [new branch]      main -> main
Branch 'main' is set up to track 'origin/main'.
```

---

## 🔐 What's Safe to Push

✅ **Included in repo:**
- All source code
- Configuration files
- Documentation (README, guides, etc.)
- Package.json
- .gitignore
- ESLint config

❌ **NOT included (for security):**
- `.env.local` (contains API secret) - in .gitignore
- `node_modules/` - in .gitignore
- `dist/` - in .gitignore
- `.tsbuildinfo` - in .gitignore

---

## 📝 Setup Instructions for Others (or Your Next Machine)

After pushing, anyone (including you on another machine) can clone and run:

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/poc-flight-search.git

# Navigate to project
cd poc-flight-search

# Install dependencies
npm install

# Create .env.local (NOT in repo for security)
echo "VITE_AMADEUS_API_KEY=your_key_here" > .env.local
echo "VITE_AMADEUS_API_SECRET=your_secret_here" >> .env.local

# Start development
npm run dev
```

---

## 🔄 Future Commits

After the first push, future commits are easy:

```bash
# Make changes, then:
git add .
git commit -m "Description of changes"
git push

# Or just push if already staged:
git push
```

---

## 📊 Repository Structure on GitHub

Your GitHub repo will have:

```
poc-flight-search/
├── README.md                 ← Shows on GitHub homepage
├── SETUP.md                  ← Quick start guide
├── AMADEUS_GUIDE.md          ← API integration guide
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── ...
├── package.json
├── .gitignore
└── ... (40 files total)
```

---

## 🚨 If Something Goes Wrong

### **Error: "remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/poc-flight-search.git
```

### **Error: "Authentication failed"**
- Check your username in the URL is correct
- For HTTPS: Use personal access token as password
- For SSH: Ensure SSH key is added to GitHub

### **Error: "fatal: refusing to merge unrelated histories"**
```bash
git pull --allow-unrelated-histories origin main
```

---

## 📞 Helpful Links

- **GitHub Docs:** https://docs.github.com
- **Git Basics:** https://git-scm.com/book/en/v2
- **Personal Access Tokens:** https://github.com/settings/tokens
- **SSH Keys:** https://github.com/settings/keys

---

## ✨ Benefits of Using GitHub

✅ **Version Control** - Track all changes
✅ **Backup** - Safe copy in the cloud
✅ **Collaboration** - Share with teammates
✅ **CI/CD** - Automate builds & tests
✅ **Deployment** - Easy deploy to production
✅ **Portfolio** - Show your projects to employers
✅ **Issues & PRs** - Project management tools

---

## 🎯 Quick Reference

```bash
# One-time setup
git remote add origin https://github.com/YOUR_USERNAME/poc-flight-search.git
git branch -m master main
git push -u origin main

# Daily workflow
git add .
git commit -m "Your message"
git push
```

---

## ✅ Verification Checklist

After pushing, verify:

- [ ] Repository created on GitHub
- [ ] Remote added to local git
- [ ] Initial commit pushed
- [ ] All 40 files visible on GitHub
- [ ] README shows on repo homepage
- [ ] .env.local NOT visible (security check)
- [ ] Can see commit history

---

**Ready to push? Let me know your GitHub username and I'll help if you get stuck!** 🚀
