# Contributing to PikNode 🌱

Welcome! We are thrilled that you want to contribute to PikNode. This project aims to empower farmers in Maharashtra by mitigating crop yield losses through AI, predictive weather alerts, and drone telemetry. 

As part of **GSSoC '26**, we want to ensure a welcoming and highly productive environment for all developers. Please read these guidelines before you start to ensure a smooth collaboration.

## 📌 Ground Rules

1. **Claim Before You Code:** Do not open a Pull Request (PR) unless you have been formally assigned to the linked Issue. Comment on an issue asking to be assigned, and wait for a project admin to assign you.
2. **One Issue at a Time:** Please only claim one issue at a time to allow everyone a chance to contribute.
3. **No Unsolicited PRs:** PRs that fix typos, reformat code without adding value, or aren't linked to an active issue will be closed automatically.

---

## 🛠️ How to Contribute

### 1. Fork and Clone
1. **Fork** this repository using the button at the top right of this page.
2. **Clone** your forked repository to your local machine (replace `<your-username>` with your actual GitHub username):
   ```bash
   git clone [https://github.com/](https://github.com/)<your-username>/PikNode.git
   ```
3. Navigate to the project directory:
   ```bash
   cd PikNode
   ```

### 2. Set Up the Upstream Remote
Connect your local repo to the main PikNode repository to keep your code updated:
```bash
git remote add upstream [https://github.com/YOUR_GITHUB_USERNAME/PikNode.git](https://github.com/YOUR_GITHUB_USERNAME/PikNode.git)
```
*(Note to contributor: Change `YOUR_GITHUB_USERNAME` to the username of the original project admin).*

### 3. Create a Branch
Never work directly on the `main` branch. Create a new branch for your feature or bug fix:
```bash
git checkout -b feature/issue-number-short-description
```

### 4. Local Setup (MERN Stack)
You will need to run both the frontend and backend to test your changes.
* **Backend:** Navigate to `cd server`, run `npm install`, create a `.env` file based on `.env.example`, and run `npm run dev`.
* **Frontend:** Open a new terminal, navigate to `cd client`, run `npm install`, and run `npm run dev`.

### 5. Commit Your Changes
We follow standard commit message guidelines:
```bash
git add .
git commit -m "feat: brief description of your change"
```

### 6. Push and Open a PR
1. Sync with the main repository before pushing to avoid merge conflicts:
   ```bash
   git pull upstream main
   ```
2. Push your branch to your forked repository:
   ```bash
   git push origin your-branch-name
   ```
3. Go to the original PikNode repository on GitHub and click **Compare & pull request**.
```

***

### What to do next:
Once you paste that exact text into your `CONTRIBUTING.md` file and save it, just push it to GitHub like you did before:

```bash
git add CONTRIBUTING.md
git commit -m "docs: added GSSoC contributing guidelines"
git push
```