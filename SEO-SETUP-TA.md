MK PEDIA – Automatic SEO deployment notes
=========================================

இந்த package-ல் தற்போதைய index.html, logo, Google verification file ஆகியவற்றுடன்
Netlify Functions மூலம் dynamic Paper pages மற்றும் sitemap சேர்க்கப்பட்டுள்ளன.

முக்கியம்
--------
- தற்போதைய Firestore Security Rules-ஐ மாற்ற வேண்டாம்.
- Firebase service-account JSON key-ஐ ZIP-ல் சேர்க்க வேண்டாம்; யாரிடமும் பகிர வேண்டாம்.
- Function-க்கு `FIREBASE_SERVICE_ACCOUNT` என்ற Netlify environment variable அவசியம்.
- Service account-க்கு Firestore-ஐ வாசிக்கத் தேவையான குறைந்தபட்ச `Cloud Datastore User`
  (roles/datastore.user) permission மட்டும் வழங்குவது சிறந்தது.

Netlify அமைப்பு
--------------
1. ZIP-ஐ extract செய்து அதன் உள்ளடக்கங்களை Netlify site-ன் publish/root folder-க்கு deploy செய்யவும்.
2. Netlify Dashboard → Site configuration → Environment variables → Add variable.
3. Name: FIREBASE_SERVICE_ACCOUNT
4. Value: Firebase project mk-pedia-16dbd-க்கான dedicated service-account JSON-ன் முழு உள்ளடக்கம்.
   Value-ஐ ஒரு வரி JSON-ஆக paste செய்யலாம். Scope-ல் Functions இருக்க வேண்டும்.
5. Save செய்த பிறகு புதிய deploy செய்யவும்.

Service account key உருவாக்கும் போது:
- Google Cloud Console → IAM & Admin → Service Accounts.
- Dedicated service account உருவாக்கவும்.
- அதற்கு Cloud Datastore User role மட்டும் வழங்கவும்.
- Key → Add key → Create new key → JSON.
- அந்த JSON-ஐ Netlify environment variable-ல் மட்டும் வைக்கவும்.
- JSON file-ஐ website folder, ZIP, Git repository அல்லது public chat-ல் வைக்க வேண்டாம்.

வெளியீட்டுக்குப் பின் சோதனை
--------------------------
- https://mk-pedia.netlify.app/ திறக்கவும்.
- https://mk-pedia.netlify.app/sitemap.xml திறக்கவும்.
- Admin approve செய்த ஒரு Paper ID-ஐப் பயன்படுத்தி
  https://mk-pedia.netlify.app/paper/PAPER_DOCUMENT_ID திறக்கவும்.
- Pending / rejected document ID-ஐத் திறந்தால் 404 வர வேண்டும்.
- Google Search Console-ல் sitemap.xml submit செய்யவும்.

URL வடிவம்
----------
/paper/<Firestore document ID>

ஒவ்வொரு approved Paper-க்கும் page HTML, title, description, canonical URL,
Open Graph tags, JSON-LD LearningResource schema கிடைக்கும். Sitemap ஒவ்வொரு
request-லும் Firestore-ல் approved resources-ஐ வாசித்து உருவாக்கப்படும்.

கவனிக்க:
- Google index செய்வதற்கு காலம் எடுக்கலாம்; sitemap சமர்ப்பித்தாலும் index உத்தரவாதமில்லை.
- Firestore Admin SDK server-side-ல் Security Rules-ஐ bypass செய்கிறது. எனவே function-ல்
  approved status சரிபார்ப்பு கட்டாயமாக உள்ளது; pending/rejected content வெளியிடப்படாது.
- Service account secret அமைக்காமல் deploy செய்தால் SEO functions 503 தரும்; site-ன்
  சாதாரண static pages இயங்கினாலும் SEO pages/sitemap இயங்காது.

Deployment method note
----------------------
Netlify Functions-ஐ deploy செய்ய Git-connected deployment அல்லது Netlify CLI/API
மூலம் functions-ஐ உள்ளடக்கிய deploy பயன்படுத்தவும். சாதாரண static HTML-only upload-ல்
functions இயங்காமல் போகலாம். Netlify CLI deploy static files, functions மற்றும்
netlify.toml redirects ஆகியவற்றை upload/process செய்கிறது.
