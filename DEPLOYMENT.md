# Percepta AI - Deployment Guide

## 📦 Deployment Options

This guide covers multiple deployment strategies for Percepta AI v2.0, from simple local hosting to production cloud deployments.

---

## 🏠 Option 1: Local Deployment (Easiest)

### Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required
- No installation needed

### Steps
1. Download `percepta_v2.html`
2. Double-click to open in browser
3. Configure Gemini API key in Settings
4. Start analyzing!

**Pros:**
✅ Zero setup required
✅ Works offline (except AI analysis)
✅ No hosting costs
✅ Perfect for testing

**Cons:**
❌ Single user only
❌ No data persistence
❌ API key in browser
❌ Not suitable for production

---

## 🌐 Option 2: Static Website Hosting

### 2A: GitHub Pages (Free)

#### Steps
1. **Create GitHub Repository**
```bash
git init percepta-ai
cd percepta-ai
git add percepta_v2.html README.md
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/percepta-ai.git
git push -u origin main
```

2. **Enable GitHub Pages**
- Go to repository Settings
- Navigate to "Pages" section
- Source: Deploy from branch "main"
- Folder: / (root)
- Save

3. **Access Your Site**
- URL: `https://yourusername.github.io/percepta-ai/percepta_v2.html`
- Update in 1-2 minutes

**Pros:**
✅ Free hosting
✅ HTTPS included
✅ Easy updates (git push)
✅ Version control

**Cons:**
❌ Public repository (unless paid)
❌ GitHub branding
❌ Still client-side only

---

### 2B: Netlify (Recommended for Production)

#### Steps
1. **Create Netlify Account**
   - Visit: https://netlify.com
   - Sign up (free tier available)

2. **Deploy via Drag & Drop**
   - Create a folder with your files
   - Drag folder to Netlify dashboard
   - Site deployed instantly!

3. **Or Deploy via Git**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy --prod
```

4. **Configure Custom Domain** (Optional)
   - Buy domain (Namecheap, Google Domains)
   - Add to Netlify
   - Update DNS settings

**Pros:**
✅ Free tier generous (100GB/month)
✅ HTTPS automatic
✅ Custom domains
✅ CDN included
✅ Continuous deployment

**Cons:**
❌ Still client-side architecture
❌ API keys in browser

**Cost:** Free tier sufficient for most uses

---

### 2C: Vercel

#### Steps
1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd percepta-ai
vercel
```

3. **Configure**
   - Answer prompts
   - Choose project name
   - Select framework: "Other"
   - Deploy!

**Pros:**
✅ Excellent performance
✅ Free tier
✅ Edge network
✅ Easy setup

**Cost:** Free for personal projects

---

### 2D: AWS S3 + CloudFront

#### Steps
1. **Create S3 Bucket**
```bash
aws s3 mb s3://percepta-ai
```

2. **Upload Files**
```bash
aws s3 cp percepta_v2.html s3://percepta-ai/ --acl public-read
aws s3 cp README.md s3://percepta-ai/ --acl public-read
```

3. **Enable Static Website Hosting**
- Go to S3 console
- Select bucket
- Properties → Static website hosting
- Enable
- Index document: percepta_v2.html

4. **Create CloudFront Distribution** (Optional but recommended)
- Go to CloudFront console
- Create distribution
- Origin: Your S3 bucket
- Enable HTTPS

**Pros:**
✅ Highly scalable
✅ AWS ecosystem
✅ Professional setup
✅ Global CDN

**Cons:**
❌ More complex setup
❌ Costs money (minimal)

**Cost:** ~$1-5/month depending on traffic

---

## 🖥️ Option 3: Backend-Integrated Deployment

### 3A: Node.js Backend + Frontend

#### Architecture
```
┌──────────────────┐
│   Nginx/Traefik  │ ← Reverse Proxy
└────────┬─────────┘
         │
    ┌────┴─────┐
    │          │
┌───▼──┐   ┌──▼───┐
│ Node │   │Static│
│  API │   │Files │
└──────┘   └──────┘
```

#### Setup

1. **Create Project Structure**
```
percepta-production/
├── frontend/
│   └── percepta_v2.html
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── analyze.js
│   │   └── auth.js
│   ├── models/
│   └── utils/
├── .env
├── package.json
└── README.md
```

2. **Backend Implementation (server.js)**
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Serve static files
app.use(express.static('frontend'));

// API routes
app.use('/api/analyze', require('./routes/analyze'));
app.use('/api/auth', require('./routes/auth'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

3. **Analysis Route (routes/analyze.js)**
```javascript
const express = require('express');
const router = express.Router();
const tf = require('@tensorflow/tfjs-node');
const cocoSsd = require('@tensorflow-models/coco-ssd');

let model;

// Initialize model
(async () => {
  model = await cocoSsd.load();
  console.log('Model loaded');
})();

router.post('/', async (req, res) => {
  try {
    const { image } = req.body;
    
    // Validate input
    if (!image) {
      return res.status(400).json({ error: 'Image required' });
    }

    // Process image
    const buffer = Buffer.from(image, 'base64');
    const tfImage = tf.node.decodeImage(buffer);
    
    // Run detection
    const predictions = await model.detect(tfImage);
    
    // Call Gemini API
    const geminiResponse = await callGeminiAPI(image, predictions);
    
    // Store in database (if applicable)
    // await saveAnalysis(user.id, geminiResponse);
    
    res.json({
      detections: predictions,
      analysis: geminiResponse
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

async function callGeminiAPI(image, detections) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: buildPrompt(detections) },
            { inline_data: { mime_type: 'image/jpeg', data: image } }
          ]
        }]
      })
    }
  );
  
  const data = await response.json();
  return JSON.parse(data.candidates[0].content.parts[0].text);
}

module.exports = router;
```

4. **Environment Variables (.env)**
```env
PORT=3000
GEMINI_API_KEY=your_api_key_here
DATABASE_URL=postgresql://user:pass@localhost:5432/percepta
JWT_SECRET=your_secret_key_here
NODE_ENV=production
```

5. **Package.json**
```json
{
  "name": "percepta-backend",
  "version": "2.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "dotenv": "^16.3.1",
    "@tensorflow/tfjs-node": "^4.15.0",
    "@tensorflow-models/coco-ssd": "^2.2.3",
    "pg": "^8.11.3",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

6. **Deploy**
```bash
npm install
npm start
```

---

### 3B: Docker Deployment

#### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --production

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/health')"

# Start application
CMD ["node", "server.js"]
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - DATABASE_URL=${DATABASE_URL}
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: percepta
      POSTGRES_USER: percepta
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
```

#### Deploy with Docker
```bash
# Build image
docker build -t percepta-ai .

# Run container
docker run -d -p 3000:3000 \
  -e GEMINI_API_KEY=your_key \
  --name percepta \
  percepta-ai

# Or use docker-compose
docker-compose up -d
```

---

### 3C: Kubernetes Deployment

#### deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: percepta-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: percepta-api
  template:
    metadata:
      labels:
        app: percepta-api
    spec:
      containers:
      - name: percepta-api
        image: percepta-ai:2.0.0
        ports:
        - containerPort: 3000
        env:
        - name: GEMINI_API_KEY
          valueFrom:
            secretKeyRef:
              name: percepta-secrets
              key: gemini-api-key
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: percepta-api
spec:
  selector:
    app: percepta-api
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

#### Deploy to Kubernetes
```bash
# Create secrets
kubectl create secret generic percepta-secrets \
  --from-literal=gemini-api-key=your_key_here

# Apply deployment
kubectl apply -f deployment.yaml

# Check status
kubectl get pods
kubectl get services
```

---

## ☁️ Cloud Platform Deployments

### Google Cloud Platform (GCP)

#### Option A: Cloud Run (Serverless)
```bash
# Build container
gcloud builds submit --tag gcr.io/PROJECT_ID/percepta-ai

# Deploy
gcloud run deploy percepta-api \
  --image gcr.io/PROJECT_ID/percepta-ai \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=your_key
```

#### Option B: App Engine
```yaml
# app.yaml
runtime: nodejs18

env_variables:
  GEMINI_API_KEY: "your_key_here"

automatic_scaling:
  min_instances: 1
  max_instances: 10
```

```bash
gcloud app deploy
```

**Cost:** ~$10-50/month depending on usage

---

### Amazon Web Services (AWS)

#### Option A: Elastic Beanstalk
```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init

# Create environment
eb create percepta-production

# Deploy
eb deploy
```

#### Option B: ECS Fargate
```bash
# Create cluster
aws ecs create-cluster --cluster-name percepta-cluster

# Register task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Create service
aws ecs create-service \
  --cluster percepta-cluster \
  --service-name percepta-api \
  --task-definition percepta-task \
  --desired-count 2 \
  --launch-type FARGATE
```

**Cost:** ~$20-100/month depending on traffic

---

### Microsoft Azure

#### Azure App Service
```bash
# Create resource group
az group create --name percepta-rg --location eastus

# Create App Service plan
az appservice plan create \
  --name percepta-plan \
  --resource-group percepta-rg \
  --sku B1 \
  --is-linux

# Create web app
az webapp create \
  --resource-group percepta-rg \
  --plan percepta-plan \
  --name percepta-api \
  --runtime "NODE:18-lts"

# Deploy
az webapp deployment source config-zip \
  --resource-group percepta-rg \
  --name percepta-api \
  --src percepta-api.zip
```

**Cost:** ~$13-150/month depending on plan

---

## 🔒 Production Security Checklist

### Pre-Deployment
- [ ] API keys moved to environment variables
- [ ] HTTPS enabled (SSL/TLS certificate)
- [ ] CORS configured properly
- [ ] Rate limiting implemented
- [ ] Input validation added
- [ ] SQL injection prevention
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented

### Post-Deployment
- [ ] Monitor error logs
- [ ] Set up alerts (Sentry, DataDog)
- [ ] Regular security updates
- [ ] Database backups automated
- [ ] Firewall rules configured
- [ ] DDoS protection enabled
- [ ] Load testing completed
- [ ] Disaster recovery plan

---

## 📊 Performance Optimization

### CDN Configuration
```javascript
// Cloudflare example
{
  "cache_everything": true,
  "browser_cache_ttl": 3600,
  "edge_cache_ttl": 86400,
  "polish": "lossless",
  "minify": {
    "js": true,
    "css": true,
    "html": true
  }
}
```

### Nginx Caching
```nginx
# nginx.conf
http {
  proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=STATIC:10m inactive=7d use_temp_path=off;

  server {
    location / {
      proxy_cache STATIC;
      proxy_cache_valid 200 1d;
      proxy_cache_use_stale error timeout invalid_header updating http_500 http_502 http_503 http_504;
      proxy_pass http://backend;
    }
  }
}
```

---

## 🔍 Monitoring Setup

### Application Monitoring
```javascript
// Install Sentry
npm install @sentry/node

// Configure (server.js)
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

### Uptime Monitoring
- Use: UptimeRobot, Pingdom, or StatusCake
- Configure: Check every 5 minutes
- Alert: Email/SMS on downtime

### Performance Monitoring
- Google Analytics
- New Relic
- Datadog
- Application Insights

---

## 💰 Cost Estimates

### Free Tier Hosting
| Platform | Free Limits | Best For |
|----------|-------------|----------|
| GitHub Pages | Unlimited | Open source |
| Netlify | 100GB/month | Small projects |
| Vercel | 100GB/month | Personal use |

### Paid Hosting (Monthly)
| Platform | Starter | Production | Enterprise |
|----------|---------|-----------|------------|
| AWS | $10-30 | $50-200 | $500+ |
| GCP | $10-30 | $50-200 | $500+ |
| Azure | $13-40 | $60-250 | $600+ |
| DigitalOcean | $5-20 | $40-100 | $200+ |

### API Costs
- **Gemini API**: $0.01-0.05 per analysis
- **TensorFlow Serving**: Included in hosting
- **Storage**: ~$0.023/GB/month (S3)

---

## 🆘 Troubleshooting Deployment

### Common Issues

**Port already in use**
```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>
```

**Permission denied**
```bash
# Fix permissions
chmod +x server.js
sudo chown -R $USER:$USER /app
```

**Environment variables not loading**
```bash
# Check .env file exists
ls -la .env

# Verify dotenv is installed
npm list dotenv

# Check file encoding
file .env
```

**CORS errors**
```javascript
// Update CORS config
app.use(cors({
  origin: ['https://yourdomain.com'],
  credentials: true
}));
```

---

## 📞 Support Resources

- **Documentation**: See README.md
- **Issues**: GitHub Issues
- **Community**: Discord/Slack
- **Email**: support@example.com

---

**Remember**: Start simple (static hosting), then scale as needed. Most projects don't need complex infrastructure initially.