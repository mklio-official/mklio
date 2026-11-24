# MKLIO SHOP — Global Search + Admin Product Collection

இந்தப் பதிப்பில் இரண்டு வகையான தேடல் முடிவுகள் உள்ளன:

1. **Global Search:** Google Programmable Search Engine மூலம் இணையத்தில் உள்ள பொருள் பக்கங்களைத் தேடும். Alibaba, AliExpress, Daraz Sri Lanka போன்றவற்றைத் தனித்தனியாக filter செய்யலாம்.
2. **MKLIO product collection:** Admin சேர்க்கும் பொருட்கள் Firestore-இல் சேமிக்கப்பட்டு பொதுமக்களின் தேடலிலும் காட்டப்படும்.

பொதுமக்களுக்கு Login தேவையில்லை. Admin-க்கு மட்டும் Google Login.

## 1. GitHub Pages-ல் வெளியிடுதல்

1. ZIP-ஐ Extract செய்யவும்.
2. Extract செய்யப்பட்ட கோப்புகளை GitHub repository `mklio`-வின் Root-ல் upload செய்து பழைய கோப்புகளை Replace செய்யவும். `index.html` Root-ல் இருக்க வேண்டும்.
3. GitHub Pages ஏற்கெனவே `main` branch / root பயன்படுத்தினால் மாற்றம் தேவையில்லை.
4. தளம்: https://mklio-official.github.io/mklio/

## 2. Global Search அமைத்தல் — கட்டாயம்

Global Search வேலை செய்ய Google Programmable Search Engine ID (cx) தேவை. இந்த ID இல்லாமல் Google முடிவுகள் தோன்றாது.

1. https://programmablesearchengine.google.com/ திறக்கவும்.
2. **Add** / புதிய Search Engine உருவாக்கு என்பதைத் தேர்ந்தெடுக்கவும்.
3. Search engine settings-ல் **Search the entire web** என்பதைத் தேர்ந்தெடுக்கவும். Alibaba, AliExpress, Daraz மட்டும் வேண்டுமெனில் மட்டும் தளங்களைச் சேர்க்கும் அமைப்பைத் தேர்ந்தெடுக்க வேண்டாம்.
4. Search Engine உருவாக்கிய பிறகு அதன் **Search engine ID** / `cx`-ஐ Copy செய்யவும்.
5. ZIP-இல் உள்ள `index.html` திறந்து இந்த வரியைத் தேடவும்:

   `https://cse.google.com/cse.js?cx=YOUR_GOOGLE_CSE_ID`

6. `1566d06937dff4242` (ஏற்கெனவே அமைக்கப்பட்டுள்ளது) என்பதற்குப் பதிலாக உங்கள் உண்மையான Search Engine ID-ஐ இடவும். உதாரணமாக `cx=abcd1234...`.
7. இந்த ZIP-இல் CX ID ஏற்கெனவே சேர்க்கப்பட்டுள்ளது. புதிய கோப்புகளை GitHub-ல் upload செய்து Commit செய்யவும்.
8. Google Programmable Search Engine Control Panel-ல் image search விருப்பம் இருந்தால் Enable செய்யலாம். Global search result-களில் படங்கள் காட்டப்படுவது Google முடிவுகள் மற்றும் அந்த அமைப்பைப் பொறுத்தது.

**குறிப்பு:** இது Google இணையத் தேடல். எல்லா பொருட்களும், விலைகளும், கையிருப்பும் கிடைக்கும் என்று உத்தரவாதமில்லை. தேடல் முடிவை அழுத்தினால் அந்த விற்பனையாளர் / இணையதளத்தின் அசல் பக்கத்திற்குச் செல்லும். Google CSE பயன்பாட்டிற்கு Google விதிமுறைகள் மற்றும் quota பொருந்தும்.

## 3. Firebase Google Admin Login

இதே Firebase project (`mk-pedia-16dbd`) பயன்படுத்தப்படுகிறது.

1. https://console.firebase.google.com/ திறந்து `mk-pedia-16dbd` project-ஐத் தேர்ந்தெடுக்கவும்.
2. **Authentication → Sign-in method** பகுதியில் **Google** provider-ஐ Enable செய்து Save செய்யவும்.
3. Authentication → Settings → Authorized domains பகுதியில் `mklio-official.github.io` இருப்பதை உறுதிப்படுத்தவும். இல்லையெனில் Add domain செய்யவும்.
4. Admin Google கணக்கு `khalidfairooz4321@gmail.com` ஆக இருக்க வேண்டும்; அந்தக் கணக்கு Google-ல் verified ஆக இருக்க வேண்டும்.
5. Admin button → Continue with Google மூலம் உள்நுழையலாம். வேறு Google கணக்குகள் Admin பகுதிக்குள் அனுமதிக்கப்படாது.

## 4. Firestore Rules — கட்டாயம்

1. Firebase Console → Firestore Database → Rules திறக்கவும்.
2. ZIP-இல் உள்ள `firestore.rules` முழுவதையும் Rules பகுதியில் paste செய்யவும்.
3. Publish அழுத்தவும்.

`shopProducts` collection-ஐ பொதுமக்கள் படிக்கலாம். சேர்த்தல், மாற்றம், நீக்கம் ஆகியவை நிர்வாகி Google கணக்கிற்கே அனுமதி. பழைய `cinemaVideos` collection விதிகளும் கோப்பில் தக்கவைக்கப்பட்டுள்ளன; பழைய தரவு அழிக்கப்படாது.

## 5. Admin மூலம் பொருள் சேர்ப்பது

1. Website-ல் Admin அழுத்தி Google மூலம் உள்நுழையவும்.
2. Product name, Image URL, Description நிரப்பவும்.
3. Alibaba, AliExpress, Daraz ஆகியவற்றில் பொருளுக்குரிய நேரடி listing URL-களை இடவும். குறைந்தது ஒரு marketplace URL அவசியம்.
4. Add product to website அழுத்தவும்.
5. சேர்க்கப்பட்ட பொருள் பொதுமக்களின் MKLIO product collection-ல் தோன்றும். Search பெட்டியில் பொருள் பெயரைத் தட்டச்சு செய்தால் பொருந்தும் Admin பதிவுகளும் வடிகட்டப்படும்.
6. Admin பட்டியலில் Delete அழுத்தி பதிவை நீக்கலாம். இது அந்த marketplace-இல் உள்ள பொருளை நீக்காது; MKLIO-வில் உள்ள listing மட்டும் நீங்கும்.

**படம்:** இந்த பதிப்பில் Admin பொதுவாக அணுகக்கூடிய HTTPS Image URL-ஐ வழங்க வேண்டும். நேரடியாக கோப்பைப் பதிவேற்றும் வசதி Firebase Storage அமைக்கப்படாததால் இதில் இல்லை.

## 6. பாதுகாப்பு மற்றும் வரம்புகள்

- பொதுமக்கள் Login செய்ய வேண்டியதில்லை.
- Admin உரிமை Firestore Security Rules மூலம் சரிபார்க்கப்படுகிறது; இணையப் பக்கத்தில் பொத்தானை மறைப்பது மட்டும் பாதுகாப்பு அல்ல.
- Firebase Web API config பொதுவாக browser-ல் காணப்படும். உண்மையான பாதுகாப்பு Authentication மற்றும் Firestore Rules-ல் உள்ளது.
- Global Search Google வழங்கும் முடிவுகளை மட்டும் காட்டும்; ஒவ்வொரு முடிவும் Alibaba / AliExpress / Daraz listing ஆக இருக்க வேண்டிய அவசியமில்லை. மேலுள்ள marketplace filter-களைப் பயன்படுத்தலாம்.
- Marketplace இணைப்புகள் Admin கொடுக்கும் நேரடி URL-கள். விலை, stock, shipping போன்றவை விற்பனையாளர் பக்கத்தில் மாறலாம்.
- Affiliate tracking / commission தானாக சேர்க்கப்படவில்லை. அதற்கு ஒவ்வொரு marketplace-ன் affiliate திட்டத்தில் பதிவு செய்து வழங்கப்படும் tracking link-ஐ Admin URL புலத்தில் இட வேண்டும்.

## 7. விரைவுச் சோதனை

- முகப்பு: https://mklio-official.github.io/mklio/
- Search: முதலில் Google CSE `cx` அமைத்து, `iPhone 18 Pro Max` என்று தேடவும்.
- Admin: Admin → Continue with Google.
- Product: ஒரு பொருளைச் சேர்த்து பொதுப் பக்கத்தில் அதன் பெயரைத் தேடவும்.
- Rules: Firebase Firestore Rules-ல் புதிய விதிகள் Publish செய்யப்பட்டுள்ளனவா என உறுதிப்படுத்தவும்.
