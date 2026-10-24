# BÁO CÁO AUDIT SƠ BỘ — 3 DỰ ÁN SKIIPLI (BACKEND + DASHBOARD + MOBILE)
## Dành cho AI Agents dựng CV & Portfolio — Chủ sở hữu: Phuc "Dylan Clarke" Nam <dylanclarke.engineer@gmail.com>

> Ngày audit: 2026-10-07 | Workspace: /Volumes/DATA/Code/ | Người audit: Cline AI
> Phạm vi: `skipli-external-backend` + `skipli-merchant-dashboard` + `skipli-dashboard-mobile-v3`
> HEAD hiện tại: backend=`phucUpdatePkg/e6928f8`, dashboard=`phucNewCreateAccount/107716a8`, mobile=`phucFixSP700/e7fd239`
> Base chung: `development`. Hầu hết việc của Phuc nằm trên nhánh `phuc*` CHƯA merge vào development — đây là điểm cần nhấn khi viết CV.

### 0. TL;DR cho AI Agents (copy-paste làm context)

- Hệ sinh thái **Skipli/BUTI — Restaurant SaaS end-to-end cho thị trường Mỹ**: Backend monolith Node.js + Firebase RTDB phục vụ 3 client (Merchant Dashboard Web, Dashboard Mobile cho nhân viên, Customer storefront/website builder). ~344 REST endpoints, realtime Socket.io, thanh toán Stripe Connect + marketplace, in bếp (Epson/Star/SP700/QZ), giao vận DoorDash/Postmates, SMS Twilio, mail AWS SES/Nodemailer, Social hub đa nền tảng (FB/IG/TikTok/Google), AI tạo nội dung (OpenAI GPT-4o-mini + Gemini).
- Quy mô: Backend 202 file src ~59.472 LOC JS; Dashboard Web 2.244 file ~246.196 LOC (1059 jsx + 610 scss); Mobile RN 324 file ~25.209 LOC. Test backend: 308 tests Jest (Social module, 1 fail DST pre-existing).
- Vai trò của Phuc Nam: **Full-stack feature owner** trên 3 repo — Backend (Google Business integrations, SEO/GEO infra, order cutoff), Frontend Web (ListingsHub, Google Reviews/FoodMenus UI, SEO/GEO templates, Auth/OTP refactor, React18+Vite8+pnpm migration), Mobile (printer SP700/Epson/Star, responsive modals, SafeArea, Android/iOS build).
- Tổng commits đứng tên Phuc: backend ~207, dashboard ~252, mobile ~21 (git shortlog --all). Cần diễn giải thành impact, không chỉ đếm commits.

### 1. Tổng quan hệ sinh thái (để AI hiểu domain)

| Mảng | Mô tả | Evidence |
|---|---|---|
| Domain | Quản lý nhà hàng: menu/modifier, orders (dine-in/online/marketplace), personnel/PIN, payouts, coupons/promotions, guest reviews, website builder 14 templates, social marketing, printer bếp | `src/views/*` dashboard 44 views; mobile `src/screens/*`; backend `BUTI/Customers/Merchants/Social` |
| Backend | Express 5.2.1, Node>=22, Firebase RTDB (`defaultDB`), Firebase-Admin 14.5, Socket.io 4.8.4, Stripe 7.12, Twilio 6.1.2, OpenAI 7.28, AWS SDK + SESv2, ExcelJS/PDFKit, jose/JWT, express-rate-limit, Webpack 5 build | `skipli-external-backend/package.json` |
| Dashboard Web | React 16.11 (đang migrate 18 trên nhánh phuc), react-router-dom 5.1.2 (migrate 6), Vite 6.1 (migrate 8), Sass, styled-components 4.4, TanStack Table 8.21, Recharts 2.7, Stripe.js, Socket.io-client, hCaptcha, Algolia | `skipli-merchant-dashboard/package.json` v10.1.0 |
| Mobile | React-Native 0.77 + React 18.3.1, React-Navigation 6 (stack/drawer/bottom+top tabs), CodePush OTA, Sentry Replay, BLE (`ble-plx`), TCP socket, thermal printers (`star-io10`, `thermal-printer`, `thermal-receipt-printer`), FastImage, Paper 5.14 | `skipli-dashboard-mobile-v3/package.json`, `App.js` |
| Infra chéo | AWS S3 + CloudFront (canonical redirect, edge routing), Firebase RTDB paths `restaurants/{shopID}/...`, QZ Tray certs, ngrok dev, Heroku deploy cũ | `src/constants/aws.js`, `src/certs/*`, `server-dev.js` |

### 2. BACKEND — `skipli-external-backend` (alias `buti-diners-back-end`)

- Entry: `src/server/server-dev.js` + `server-prod.js` (~62KB mỗi file, ~114 GET + ~234 POST ≈ 344 routes). `src/server/social-runtime.js` khởi động `SchedulerService.Start({db, socketIO})`.
- Cấu trúc: `src/constants/*` (aws, stripe, twilio, open-ai, firebase, doordash/postmates/woflow/parseur/canva, social/*, qzPrinting certs) + `src/lib/Functions/{BUTI,Customers,Merchants}` mỗi domain có `Get/Post/HelperFunctions` + `Merchants/Social/*` (13 sub-domains) + `src/middlewares/rate_limiter.js`.
- Social module (lớn nhất, có README riêng + 308 Jest tests): `handlers/` (22 files: account/approval/bulk/calendar/canva/content/delivery/execution/insights/media/post/schedule...), `scheduling/` (19 files: ScheduleGroup/Delivery/Execution lifecycle, Materialization, Rules, Readiness...), `publishing/` (SchedulerRunner/Queue/Publisher/GroupPublisher), `bulk/` (Worker/Retry/Progress/Store), `approval/` (StateMachine/Policy/Transitions/Requests... 14 files), `content/` (Draft/PostCreation/Hydration/Validation...), `accounts/` (+meta/), `Platforms/` (Base+Factory+FB/IG/Google/TikTok adapters), `AI/` (ProviderFactory + OpenAI/Gemini text+image providers + PromptRegistry/UsageService), `media/` (S3/MediaLibrary/CanvaConnect), `insights/` (Account/Content/PrimeTime), `infrastructure/` (FirebaseRepository/TokenCrypto), `shared/`, `webhooks/` (TikTok, Google RISC).
- Nhóm endpoint chính (trích từ server-dev.js): orders (`/shopOrders`, `/orderDetails`, `/moveActiveOrderToPastOrders`, `/combineThirdPartyOrdersInfo`, `/managerMarketplaceOrders`), menu (`/allMenus`, `/allItems`, `/allModifierGroups`, `/exportMenuToExcel|PDF`, `/menuFromWoflow`), payouts/Stripe (`/stripeWebhook` raw-body verify, `/createStripeConnectAccount`, `/payoutTransactions`, `/payoutReportSummary`, `/saveMerchantStripeAccountID`, `/initializeStripeCheckout`), auth/personnel (`/CreateAccount`, `/LoginByEmail`, `/SendCodeVerification`, `/verifyPersonnelPin`, `/getUserInfoByEmail|Id`, TOTP `jose`+`qrcode` — note: qrcode chỉ thấy ở worktree cũ, cần verify), printers (`/activePrinters`, `/activeMobileAppPrinters`, `/qzSignature`, `/qzDigitalCertificate`), customers (`/customerCart`, `/customerPastOrdersAtShop`, `/GetEmailByPaymentIntentID`, `/checkCustomer`), comms (`/sendEmail` SES/Nodemailer, `/sendTextMessage` Twilio, `/SendPhoneCode`), website/S3 (`/uploadWebFilesToS3`, `/saveWebsite`, `/websiteInfo`, `/verifyDomainOwnership`, `/resolveDomainDeploymentStatus`), delivery (`/doordashDeliveryDetails`, `/postmatesQuote|Delivery`, `/saveChangedDeliverInfo`), social (~80 routes `/social*`: accounts/groups/calendar/composer/bulk/approval/insights/settings/notifications/canva/AI).
- Realtime: Socket.io emit theo shop scope (`${shopID}-social_bulk_complete`, queue notification) — backend truyền `socketIO` xuyên suốt BulkRetry/TaskResults/TaskStore/Scheduler.
- Tích hợp ngoài: Firebase RTDB + Admin SDK, Stripe Connect + webhook, DoorDash/Postmates/Woflow/Parseur, Twilio SMS, AWS S3/CloudFront/SESv2, OpenAI `gpt-4o-mini` + `gpt-image-2` và Gemini dual-provider, Meta/TikTok/Google OAuth + webhooks (TikTok raw 256KB, Google RISC text, Meta signed-request + data-deletion), Canva Connect OAuth.

### 3. DASHBOARD WEB — skipli-merchant-dashboard v10.1.0

- Entry: src/index.jsx + src/main/Admin/index.jsx + src/views/index.jsx. 44 views bao gom AdminLogin, AllStores, Analytics (SalesReport/SalesDataDisplay 270 LOC), AuthShowcase, CombineThirdPartyOrders, Contacts, Dashboard, DemoAuth/Login/Signup, GoogleFoodMenus, GuestReviews, Marketing, Marketplace, MenusManagement, NewAccount/NewMerchant, PaymentInfo, PayoutsForConnectedAccount, PersonnelProfile, Preparation, PromotionManagement, Settings, ShopInfo, ShopOrders, Social, Website, UserProfile...
- 49 component domains: Orders, MenusManagement, WebsiteBuilder (BasicTemplate + Template1-13 + shared/seoGeo.js + templateRegistry/lifecycle), SocialModules (PostComposer, PostManagement, SocialCalendar, SocialAccounts, SocialInsights, SocialApproval, SocialSettings, SocialNotifications, Library/CaptionTemplates/MediaAssets, ScheduleManagement/GroupDetails, PostsQueueNotification), Printer, ShopOrdersToolbar, PayoutTransactions, PreparationSections, WebsiteViewModules/SEO, DemoAuth/LoginForm/SignupForm/InputOTP/VerifyEmail.
- Design system: 50 fields (Button, Input, Modal/ResponsiveModal/FullPageModal, DataTable/Table, Tabs, Dropdown, DateRangePicker, TimePicker, DaySelector, ToggleSwitch, SearchBar, Pagination, Notification, LoadingSpinner...). 1059 jsx + 610 scss + 182 svg.
- Services: src/lib/Services/API_Paths.jsx + Merchants/GetRequests/PostRequests + BUTI, src/lib/Constants/NavbarItems.jsx (menu/collapsible groups), src/context (MerchantInterfaceConsumer/withContext, socket truyen vao SocialModulesProvider).
### 4. MOBILE — skipli-dashboard-mobile-v3 (dashboardMobile 0.0.1)

- Entry App.js (Sentry Replay + CodePush OTA ON_APP_START + PaperProvider) -> src/navigations (RootStack -> Authentication / Main Header+SideBar -> CodePushManager).
- 10 screens: AppInfo, Home, MenuManagement (AllItems+TabBarMenu), PersonnelLogin, Settings, ShopOrders, SupportScreen/Form, Tutorial, YourStore. 17 component dirs + 22 fields dirs.
- Orders: ShopOrders (Kanban/KarbanCard, ShopOrderList, ShopOrdersPill voi Buttons/OrderDetails/PriviewInfo), Receipt (epsonStyle/starStyle/index). 12 modals (AppInfo, ConfirmClose/Refund/OwnerPin, EditPrinter, RegisterPrinter, OrderDetail, SelectEstimatePrepTime, Warning, Loading, SP700PreviewModal moi).
- Lib: Constants (NavbarItems, RegEx, FoodPreferences, TestReceipt.json), Functions (Printer.js, ReceiptContent.js, OrdersManagement.js, SP700TestHelper.js moi ~200 LOC), Services API_Paths.js + BUTI/Merchants Get/PostRequests.
- Native: BLE (ble-plx) + TCP socket + LAN scanner cho printer discovery, foreground-service keep-awake, NetInfo/NetworkInfo, SecureStore/SensitiveInfo/AsyncStorage, DeviceInfo, Permissions, Sound bao don moi, ViewShot, FS/DocumentPicker, SVG, Localize+FormatJS, CodePush+Sentry tagging.
### 5. DONG GOP CUA PHUC NAM (VERIFIED BANG GIT)

Backend 207 commits: Google Reviews AI auto-reply (OAuth, reply, Gemini->OpenAI, AutoReplyWorker + backfill), FoodMenus 655 LOC + 4 endpoints, ListingsHub GoogleListings 1349 LOC + LocationProfile 986 LOC, Search Console+Yelp, E.164 phone, CloudFront canonical + edge routing + S3 prefix delete, order cutoff 0/15/30/45, Stripe axios migration + pnpm.

Dashboard 252 commits: Reviews UI tabs + batch AI + draft rieng + auto-reply 687 dong, ListingsHub 964 LOC + scss 555 (1831 dong), FoodMenus 1282 LOC + PublishModal 340 (4033 dong), SEO canonical + JSON-LD + seoGeo.js 182 LOC + Template5 editable, Auth moi Demo/Login/Signup + OTP + VerifyEmail 6304 dong (39 files), React18/Router6/Vite8/pnpm migration, Docs center TOC + video + EN dich, BusinessHours redesign.

### 6. SO LIEU CHO AI AGENTS

- Backend: 202 files ~59.5k LOC, ~344 routes (114 GET + 234 POST), 308 Jest tests, 13 sub-modules Social.
- Dashboard: 2244 files ~246k LOC, 44 views, 49 component domains, 14 templates, 50 fields.
- Mobile: 324 files ~25.2k LOC, 10 screens, 12 modals, 3 printer families, CodePush + Sentry.
- Phuc: backend 207 + dashboard 252 + mobile 21 commits; lon nhat ListingsHub 1831+, FoodMenus 4033+, Auth 6304+, Mobile 3195+.
- Trung thuc: file Google*.js + views ListingsHub/GoogleReviews chi co tren nhanh phuc*, chua merge development; checkout HEAD dashboard thieu GoogleFoodMenus/index.jsx.

#### 5C. Mobile 21 commits (diff 57 files 3195+/1951-): SP700PreviewModal moi + SP700TestHelper 200 LOC + Printer.js + epson/star styles, ShopOrdersPill 167 LOC + Toolbar responsive + Modal fitContent adaptive, SafeArea notch, Android 37/Gradle 8.13 + iOS build, BLE iOS + battery cross-platform, CodePush/Sentry.

### 7. GOI Y CV (AI DUNG TRUC TIEP)

Title: Full-Stack Engineer — Restaurant SaaS (Node.js + React + React Native) | Skipli/BUTI.
Backend: (a) Owned Google Business integrations (OAuth, reviews reply, Gemini->OpenAI auto-reply worker + backfill); (b) Built FoodMenus publish + ListingsHub profile (E.164, Search Console/Yelp); (c) Hardened S3/CloudFront (canonical, edge routing, prefix delete, SEO files); (d) Order cutoff + Stripe axios + pnpm.
Frontend: (a) Shipped ListingsHub/FoodMenus/Reviews UI; (b) SEO/GEO canonical + JSON-LD + Template5 editable + AI-visibility docs; (c) Rebuilt auth/onboarding + OTP; (d) Led React18/Router6/Vite8/pnpm migration + docs center.
Mobile: (a) Printer SP700/Epson/Star BLE/TCP/LAN + preview + test helper; (b) Responsive orders/modals + SafeArea; (c) Android 37/Gradle 8.13 + iOS + CodePush/Sentry OTA.
Skills: Node 22, Express 5, Firebase RTDB/Admin, Socket.io, Stripe Connect, Twilio, AWS S3/CloudFront/SES, OpenAI/Gemini, OAuth2 Google/Meta/TikTok/Canva, React 18, Router 6, Vite 8, pnpm, Sass, TanStack Table, Recharts, RN 0.77, Navigation 6, BLE/TCP printing, CodePush, Sentry, Jest 308 tests, Webpack.

### 8. CHECKLIST VERIFY (AI TU CHAY)

- Mo tung nhanh phuc* 3 repo, chup diff stat + show commit muc 5.
- Dem endpoints: grep app.get/post server-dev.js; dem views ls src/views; dem screens ls src/screens.
- Chay test: node node_modules/jest/bin/jest.js --runInBand (308 pass, 1 fail DST cu).
- Ghi ro tren nhanh phuc* chua merge development de trung thuc.
- File nay: /Volumes/DATA/Code/skipli-external-backend/PHUC_PORTFOLIO_AUDIT_REPORT_VI.md — paste vao AI Agents.