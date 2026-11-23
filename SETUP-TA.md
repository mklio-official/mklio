# MKLIO CINEMA — GitHub Pages + Google Drive அமைப்பு

## இந்த ZIP-இன் கோப்பு அமைப்பு

இந்த ZIP-ஐ Extract செய்தவுடன் `index.html` நேரடியாக முதல் நிலையில் இருக்கும். முழு உள்ளடக்கத்தையும் GitHub repository-யின் root-க்கு upload செய்யவும்.

- `index.html` — முழு இணையதளம்
- `assets/logo.png` — MKLIO logo
- `firestore.rules` — வீடியோ விவரங்கள், likes மற்றும் comments பாதுகாப்பு விதிகள்
- `404.html` — தவறான URL-களுக்கான பக்கம்
- `google32029a416e878ef8.html` — முன்பிருந்த Google site verification கோப்பு
- `README.md` — சுருக்கமான வழிகாட்டி

**Cloudinary இல்லை. Firebase Storage இல்லை.** வீடியோ கோப்புகள் உங்கள் Google Drive-லேயே இருக்கும். Firebase Firestore-ல் வீடியோ இணைப்பு மற்றும் விவரங்கள் மட்டுமே சேமிக்கப்படும்.

## 1. Firebase Authentication

1. Firebase Console-ல் `mk-pedia-16dbd` project-ஐத் திறக்கவும்.
2. Authentication → Sign-in method → Email/Password-ஐ Enable செய்யவும்.
3. Users பகுதியில் `khalidfairooz4321@gmail.com` என்ற Admin பயனரை உருவாக்கவும் (ஏற்கனவே இருந்தால் மீண்டும் உருவாக்க வேண்டாம்).
4. வலுவான கடவுச்சொல் அமைத்து email verification-ஐ முடிக்கவும்.
5. Admin கடவுச்சொல்லை HTML அல்லது GitHub-ல் ஒருபோதும் எழுத வேண்டாம்.

## 2. Firestore Database

1. Firebase Console → Firestore Database → Create database (ஏற்கனவே இருந்தால் தவிர்க்கவும்).
2. Rules tab-ஐத் திறக்கவும்.
3. இந்த ZIP-இல் உள்ள `firestore.rules` முழுவதையும் ஒட்டி Publish செய்யவும்.

Firestore-ன் இலவச Spark திட்டத்தில் quota/limits உண்டு. Traffic மற்றும் reads/writes அதிகரித்தால் சேவை throttling அல்லது quota முடிவை சந்திக்கலாம். Firebase Console-ல் தற்போதைய வரம்புகளைப் பார்க்கவும்.

## 3. Google Drive வீடியோ இணைப்பைத் தயார் செய்தல்

1. Google Drive-ல் வீடியோவைச் சேமிக்கவும்.
2. அந்த வீடியோவின் Share அமைப்பைத் திறக்கவும்.
3. General access-ஐ `Anyone with the link` ஆகவும் Role-ஐ `Viewer` ஆகவும் மாற்றவும்.
4. Copy link அழுத்தவும்.
5. Admin பகுதியில் அந்த link-ஐ ஒட்டவும்.

உதாரண இணைப்பு: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`

**கவனம்:** Anyone with the link அமைத்தால் அந்த இணைப்பைப் பெறும் எவரும் வீடியோவை அணுக முடியும். Google Drive storage quota, playback bandwidth/traffic limits மற்றும் Google விதிமுறைகள் பொருந்தும். எல்லையற்ற இலவச ஹோஸ்டிங் அல்ல.

## 4. GitHub Pages வெளியீடு

1. ZIP-ஐ Extract செய்யவும்.
2. Extract செய்யப்பட்ட folder-ஐத் திறக்கவும். `index.html` அதற்குள் நேரடியாக இருக்க வேண்டும்.
3. GitHub repository-யின் Code பகுதியில் Add file → Upload files தேர்வு செய்யவும்.
4. `index.html`, `firestore.rules`, `404.html`, `README.md`, verification HTML மற்றும் `assets` folder ஆகியவற்றை upload செய்யவும். ZIP file-ஐ மட்டும் upload செய்ய வேண்டாம்.
5. Commit changes செய்யவும்.
6. Repository → Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save.
7. Pages வெளியீடு முடிந்ததும் `https://YOUR-USERNAME.github.io/` அல்லது உங்கள் repository project URL-ஐத் திறக்கவும்.

## 5. வீடியோவை Admin ஆகச் சேர்ப்பது

1. Website-ல் Admin பொத்தானை அழுத்தவும்.
2. Admin email மற்றும் Firebase Authentication password மூலம் Sign in செய்யவும்.
3. Google Drive video link, Video title, Actor/actress name ஆகியவற்றை உள்ளிடவும்.
4. Actor photo URL, poster image URL, description ஆகியவை விருப்பமானவை.
5. Add video to website அழுத்தவும்.
6. புதிய வீடியோ அனைவருக்கும் பட்டியலில் தோன்றும். Admin பட்டியலில் Delete மூலம் இணையதளப் பதிவை நீக்கலாம். இது Google Drive-ல் உள்ள அசல் கோப்பை நீக்காது.

## 6. Player வரம்புகள்

இந்த பதிப்பு Google Drive-ன் Embed Player-ஐப் பயன்படுத்துகிறது. ஆகவே Drive Player-ன் சொந்த controls மற்றும் playback அனுபவமே கிடைக்கும். Website-இலிருந்து தனிப்பட்ட brightness, volume, seek controls-ஐ கட்டுப்படுத்த முடியாது. Google Drive preview-ஐ embed செய்வதால் சில வீடியோக்களுக்கு Google-ன் preview/streaming வரம்புகள் பொருந்தலாம்.

வீடியோ பதிவிறக்கத்தை முழுமையாகத் தடுக்க முடியாது. `Anyone with the link` வீடியோவைப் பார்க்கும் நபர்கள் Drive-ல் கிடைக்கும் அனுமதிகளுக்கு உட்பட்டு அணுகலாம்.

## Troubleshooting

- வீடியோ play ஆகவில்லை: Drive link சரியா, Share = Anyone with the link / Viewer தானா எனச் சரிபார்க்கவும்.
- Admin login ஆகவில்லை: Email/Password provider enabled, சரியான user/password, email verified ஆகியவற்றைச் சரிபார்க்கவும்.
- Video list வரவில்லை: Firestore database உருவாக்கப்பட்டதா, `firestore.rules` publish செய்யப்பட்டதா, project config சரியா எனப் பார்க்கவும்.
- 404 வருகிறது: `index.html` repository root-ல் உள்ளதா, Pages source `main` + `/(root)` தானா எனச் சரிபார்க்கவும். Repository project URL என்றால் `/repository-name/` path உட்பட சரியான முகவரியைப் பயன்படுத்தவும்.
