<<<<<<< HEAD
# Smart Network QoS Monitor

Static HTML/CSS/JavaScript demo project for VS Code, GitHub, and Vercel.

## Structure
```text
smart-network-qos/
├── index.html
├── css/styles.css
├── js/app.js
├── .gitignore
├── vercel.json
└── README.md
```

## Run locally
1. Open this folder in VS Code.
2. Open `index.html` in a browser, or use the Live Server extension.
3. Click scenario buttons to generate simulated metrics.
4. The endpoint test measures browser HTTP request duration only where CORS permits.

## Important
Scenario metrics are simulated, not real network measurements. The endpoint test is not ICMP ping and does not directly measure packet loss. No backend or package installation is needed.

## Push to GitHub
Create an empty repository on GitHub, then run from this folder (replace `YOUR-USERNAME`):
```bash
git init
git add .
git commit -m "Initial Smart Network QoS Monitor"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/smart-network-qos.git
git push -u origin main
```
If `origin` already exists:
```bash
git remote set-url origin https://github.com/YOUR-USERNAME/smart-network-qos.git
git push -u origin main
```

## Deploy on Vercel
1. Sign in to Vercel with GitHub.
2. Add New → Project → import this repository.
3. Framework Preset: Other.
4. Leave Build Command and Install Command empty.
5. Set Output Directory to `.`.
6. Click Deploy. Future pushes normally trigger a redeployment.
=======
# Smart-Qos-Network-Monitoring
>>>>>>> 56a92354db8321bf8cdd65bd075303fbad742969
