# MKLIO CINEMA — புதிய SEO + Google Drive பதிப்பு

## கோப்பு அமைப்பு
ZIP-ஐ Extract செய்த பிறகு உள்ளடக்கங்களை GitHub repository-யின் Root-ல் upload செய்யவும். ZIP-ஐ அப்படியே repository-ல் போட வேண்டாம்.

- `index.html` — முகப்புப் பக்கம், நடிகர் தேடல், Admin மற்றும் catalogue
- `watch.html` — ஒவ்வொரு திரைப்படம்/வீடியோ/விமர்சனத்திற்குமான பகிரக்கூடிய விவரப் பக்கம்
- `about.html`, `contact.html`, `privacy.html`, `terms.html`, `copyright.html` — தகவல் மற்றும் கொள்கைப் பக்கங்கள்
- `assets/logo.png` — தற்போதைய MKLIO logo
- `assets/favicon.svg`, `assets/favicon-32.png`, `assets/apple-touch-icon.png` — favicon icons
- `sitemap.xml`, `robots.txt` — தேடுபொறி வழிகாட்டிகள்
- `site.webmanifest` — install metadata
- `about.html`, `contact.html`, `privacy.html`, `terms.html`, `copyright.html` — தகவல் பக்கங்கள்
- `firestore.rules` — Firestore பாதுகாப்பு விதிகள்
- `404.html` — தவறான முகவரிக்கான பக்கம்
- `google32029a416e878ef8.html` — முன்பிருந்த Google verification கோப்பு

## 1. GitHub Pages upload
1. ZIP-ஐ Download செய்து Extract செய்யவும்.
2. Extract செய்யப்பட்ட உள்ளடக்கங்களை repository-யின் Root-ல் upload செய்யவும். `index.html` நேரடியாக Root-ல் இருக்க வேண்டும்.
3. ஏற்கெனவே உள்ள கோப்புகள் கேட்கப்பட்டால் புதிய பதிப்பால் Replace செய்யவும். `assets` folder முழுவதையும் upload செய்யவும்.
4. Commit changes செய்யவும்.
5. Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save.
6. தளம்: https://mklio-official.github.io/mklio/

## 2. Firebase — முக்கியமான புதுப்பிப்பு
இந்தப் பதிப்பு அதே Firebase project `mk-pedia-16dbd`-ஐப் பயன்படுத்துகிறது. Authentication → Sign-in method → Email/Password Enable செய்யப்பட்டிருக்க வேண்டும். Admin account `khalidfairooz4321@gmail.com` verified ஆக இருக்க வேண்டும்.

**முக்கியம்:** இந்த ZIP-இல் உள்ள `firestore.rules`-ஐ Firebase Console → Firestore Database → Rules-ல் முழுமையாக paste செய்து Publish செய்யவும். புதிய விதி Admin வீடியோ சேர்க்கும்போது `rightsConfirmed: true` கட்டாயப்படுத்துகிறது. பழைய வீடியோ பதிவுகள் அழிக்கப்படாது. புதிய வீடியோ சேர்க்கும்போது Admin தமக்கு உரிமை உண்டு அல்லது பகிர அனுமதி பெற்றுள்ளார் என்பதை checkbox மூலம் உறுதிப்படுத்த வேண்டும்.

## 3. Google Drive வீடியோ
1. வீடியோவை உங்கள் Google Drive-ல் வைத்திருக்கவும்.
2. Share → General access → `Anyone with the link` → `Viewer` என்பதைத் தேர்ந்தெடுக்கவும்.
3. அந்த Drive link-ஐ Admin பகுதியில் சேர்க்கவும்.
4. Content type தேர்ந்தெடுக்கவும்: Licensed Movie, Official Trailer, Movie Review அல்லது Behind the Scenes.
5. Title, actor, description, release year, genre, director, poster ஆகியவற்றை இயன்றவரை நிரப்பவும். Poster URL பொதுவாக அணுகக்கூடிய image URL ஆக இருக்க வேண்டும். Movie Review தேர்ந்தெடுத்தால் Google Drive link இல்லாமலும் written review text கட்டாயமாகவும் இருக்கும். மற்ற வகைகளுக்கு Google Drive link தேவை.
6. உரிமை/அனுமதி checkbox-ஐ உறுதிப்படுத்தி Add video அழுத்தவும்.

**வரம்புகள்:** Google Drive இலவச வரம்பற்ற streaming service அல்ல. Storage quota, playback/traffic limits, sharing restrictions மற்றும் Google விதிமுறைகள் பொருந்தும். Anyone with the link அமைத்தால் இணைப்பைப் பெறும் எவரும் அணுகலாம். Embed Player-ன் controls மட்டுமே கிடைக்கும்; தளத்திலிருந்து தனி brightness/volume controls வழங்க முடியாது. வீடியோ download அல்லது screen capture-ஐ முழுமையாகத் தடுக்க முடியாது.

## 4. SEO அம்சங்கள் மற்றும் வரம்புகள்
- முகப்புப் பக்கத்தில் Title, Description, Canonical, Open Graph, Twitter metadata மற்றும் WebSite/Organization JSON-LD உள்ளது.
- `sitemap.xml` நிலையான பொது பக்கங்களைப் பட்டியலிடுகிறது. `robots.txt` sitemap-ஐ அறிவிக்கிறது.
- திரைப்பட/வீடியோ/விமர்சன கார்டுகள் `watch.html?id=...` என்ற பகிரக்கூடிய பக்கத்துடன் இணைக்கப்பட்டுள்ளன. Movie Review வகையில் எழுத்து விமர்சனம் காட்டப்படும்; Drive Player தேவையில்லை. அந்தப் பக்கம் Firestore-இல் இருந்து விவரங்களைப் பெற்று title, description, canonical மற்றும் VideoObject JSON-LD-ஐ உருவாக்குகிறது.
- GitHub Pages static hosting என்பதால் Firestore-ல் புதிய வீடியோ சேர்க்கும் ஒவ்வொரு முறையும் sitemap-ஐ server-side-ல் தானாக மாற்ற முடியாது. Google JavaScript-rendering-ஐச் செய்யலாம்; இருந்தாலும் ஒவ்வொரு dynamic watch page-மும் index ஆகும் என்று உத்தரவாதமில்லை. Poster, தனித்துவமான description, சரியான title, ஆண்டு, genre, director மற்றும் actor தகவல்கள் உதவும். VideoObject structured data, Drive video, poster மற்றும் upload date உள்ள பதிவுகளுக்கு மட்டும் உருவாக்கப்படும்.
- SEO keywords மட்டும் சேர்ப்பதால் Google-ல் முதல் இடம் அல்லது எல்லா search சொற்களுக்கும் தோன்றும் உத்தரவாதம் இல்லை. பயனுள்ள, தனித்துவமான, உண்மையான உள்ளடக்கம் தேவை.

## 5. Google Search Console
1. https://search.google.com/search-console/ திறக்கவும்.
2. `https://mklio-official.github.io/mklio/` URL-prefix property-ஐச் சேர்க்கவும்.
3. ஏற்கெனவே உள்ள `google32029a416e878ef8.html` verification கோப்பை Root-ல் வைத்திருக்கவும்; Search Console வழங்கும் verification முறையையே பின்பற்றவும்.
4. Verify ஆன பிறகு Sitemaps பகுதியில் `sitemap.xml` submit செய்யவும்.
5. URL Inspection மூலம் முகப்புப் பக்கத்தைச் சோதித்து Request indexing செய்யலாம்.

Indexing சில நாட்கள் அல்லது வாரங்கள் ஆகலாம்; Google crawl/index/ranking-ஐ உறுதி செய்யாது.

## 6. Copyright மற்றும் உரிமைகள்
முழு திரைப்படம் அல்லது பிற பாதுகாக்கப்பட்ட உள்ளடக்கத்தை upload/embed/share செய்யும் முன் உரிமை அல்லது வெளிப்படையான அனுமதி அவசியம். Publicly available link என்பது copyright permission என்று அர்த்தமல்ல. Admin checkbox உரிமையை நிரூபிப்பதில்லை; அது நிர்வாகியின் உறுதிப்படுத்தல் மட்டுமே. Copyright புகார்களுக்கு `copyright.html` மற்றும் `contact.html` பக்கங்களில் உள்ள மின்னஞ்சலைப் பயன்படுத்தலாம்.

## 7. சோதனை
- முகப்பு: https://mklio-official.github.io/mklio/
- Sitemap: https://mklio-official.github.io/mklio/sitemap.xml
- Robots: https://mklio-official.github.io/mklio/robots.txt
- Favicon: https://mklio-official.github.io/mklio/assets/favicon.svg
- Watch page template: https://mklio-official.github.io/mklio/watch.html?id=YOUR_FIRESTORE_DOCUMENT_ID

Admin login அல்லது video list பிரச்சினை ஏற்பட்டால் Firebase Authentication provider, verified admin email, Firestore database மற்றும் புதுப்பிக்கப்பட்ட rules ஆகியவற்றைச் சரிபார்க்கவும்.
